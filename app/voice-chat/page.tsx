'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, PhoneOff, Loader2, GraduationCap, PhoneCall, Settings, FileText, X, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function VoiceChatPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [messages, setMessages] = useState<Array<{role: string, content: string, id: string}>>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected'>('idle')
  const [callDuration, setCallDuration] = useState(0)
  const timerRef = useRef<NodeJS.Timeout>()
  const silenceTimeoutRef = useRef<NodeJS.Timeout>()
  const audioContextRef = useRef<AudioContext>()
  const analyserRef = useRef<AnalyserNode>()
  const silenceThreshold = 15 // Adjust this value based on testing
  const silenceDuration = 1500 // 1.5 seconds of silence before stopping
  const [voiceSettings, setVoiceSettings] = useState({
    volume: 1,
    rate: 1,
    pitch: 1
  });
  const [showSettings, setShowSettings] = useState(false);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 3;
  const [micLevel, setMicLevel] = useState(0);
  const [sessionContext, setSessionContext] = useState<{
    userName: string;
    mainConcern: string;
    sessionNumber: number;
    mood: string;
    previousInsights: string[];
  }>({
    userName: '',
    mainConcern: '',
    sessionNumber: 1,
    mood: '',
    previousInsights: []
  });
  const [showCrisisResources, setShowCrisisResources] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const detectSilence = useCallback((dataArray: Uint8Array) => {
    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length
    return average < silenceThreshold
  }, [])

  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  };

  const startRecording = useCallback(async () => {
    vibrate();
    try {
      setCallStatus('calling')
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Set up audio analysis
      audioContextRef.current = new AudioContext()
      const microphone = audioContextRef.current.createMediaStreamSource(stream)
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 512
      microphone.connect(analyserRef.current)

      const options = { mimeType: 'audio/webm' }
      mediaRecorderRef.current = new MediaRecorder(stream, options)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        await handleAudioUpload(audioBlob)
      }

      // Start voice activity detection
      const checkSilence = () => {
        if (!analyserRef.current || !mediaRecorderRef.current) return

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
        analyserRef.current.getByteFrequencyData(dataArray)

        if (detectSilence(dataArray)) {
          // If silence is detected, start the silence timeout
          if (!silenceTimeoutRef.current) {
            silenceTimeoutRef.current = setTimeout(() => {
              if (mediaRecorderRef.current?.state === 'recording') {
                stopRecording()
              }
            }, silenceDuration)
          }
        } else {
          // If voice is detected, clear the silence timeout
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current)
            silenceTimeoutRef.current = undefined
          }
        }

        // Continue checking if still recording
        if (mediaRecorderRef.current?.state === 'recording') {
          requestAnimationFrame(checkSilence)
        }
      }

      mediaRecorderRef.current.start(200)
      setIsRecording(true)
      setCallStatus('connected')
      
      // Start silence detection
      checkSilence()

    } catch (err) {
      console.error('Error starting recording:', err)
      alert('Could not access microphone. Please ensure it is connected and permissions are granted.')
      setCallStatus('idle')
    }
  }, []);

  const stopRecording = () => {
    // Stop media recorder and tracks
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }

    // Stop any ongoing speech synthesis
    window.speechSynthesis.cancel()

    // Clean up audio context and analyser
    if (audioContextRef.current) {
      audioContextRef.current.close()
    }
    
    // Clear any existing silence timeout
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current)
      silenceTimeoutRef.current = undefined
    }

    // Reset all states
    setIsRecording(false)
    setCallStatus('idle')
    setIsSpeaking(false)
    setIsProcessing(false)
    
    // Clear messages if you want to start fresh next time
    setMessages([])
  }

  const handleAudioUpload = async (audioBlob: Blob) => {
    // Only process if not already processing
    if (isProcessing) return
    
    setIsProcessing(true)
    try {
      // Create form data with the audio blob
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.webm')

      // Send to transcription API
      const transcriptionResponse = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })

      if (!transcriptionResponse.ok) {
        throw new Error(`Transcription failed: ${transcriptionResponse.statusText}`)
      }

      const { text } = await transcriptionResponse.json()

      if (text) {
        // Add user message
        setMessages(prev => [...prev, {
          role: 'user',
          content: text,
          id: Date.now().toString()
        }])

        // Get AI response
        const aiResponse = await fetch('/api/voice-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              { 
                role: 'system', 
                content: getSystemMessage() 
              },
              { role: 'user', content: text }
            ]
          }),
        })

        if (!aiResponse.ok) {
          throw new Error('Failed to get AI response')
        }

        const data = await aiResponse.json()
        
        // Add AI response
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message,
          id: Date.now().toString()
        }])

        // Speak the response - will automatically start listening again when done
        speakResponse(data.message)
      }
    } catch (error) {
      console.error('Error processing audio:', error)
      alert('Failed to process audio. Please try again.')
      // Try to start recording again even if there was an error
      startRecording()
    } finally {
      setIsProcessing(false)
    }
  }

  const speakResponse = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = voiceSettings.volume;
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => {
      setIsSpeaking(false)
      // Only auto-start if still in connected status
      if (callStatus === 'connected') {
        startRecording()
      }
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
      // Only auto-start if still in connected status
      if (callStatus === 'connected') {
        startRecording()
      }
    }
    
    window.speechSynthesis.speak(utterance)
  }

  // Format duration to mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (callStatus === 'idle') {
          startRecording();
        } else if (callStatus === 'connected') {
          stopRecording();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [callStatus, startRecording]);

  const handleError = async (error: Error) => {
    if (reconnectAttempts.current < maxReconnectAttempts) {
      reconnectAttempts.current++;
      await new Promise(resolve => setTimeout(resolve, 1000));
      startRecording();
    } else {
      stopRecording();
      alert('Connection failed. Please try again.');
    }
  };

  const exportConversation = () => {
    const text = messages
      .map(m => `${m.role}: ${m.content}`)
      .join('\n\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'conversation.txt';
    a.click();
  };

  const updateMicLevel = () => {
    if (!analyserRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
    setMicLevel(average);
  };

  const announce = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  const getSystemMessage = () => `
You are Relyy, an empathetic AI therapist. 
Current Session: ${sessionContext.sessionNumber}
User's Main Concern: ${sessionContext.mainConcern}
Previous Session Insights: ${sessionContext.previousInsights.join(', ')}
Current Mood: ${sessionContext.mood}

Respond with compassion and maintain continuity from previous discussions.
Ask thoughtful follow-up questions based on previous insights.
`;

  const startSession = async () => {
    setCallStatus('calling');
    // Initial mood check
    speakResponse("Hello, before we begin, how are you feeling today? This helps me better understand your current state.");
    // Wait for user response and update sessionContext.mood
  };

  const analyzeMood = (text: string) => {
    // Simple mood analysis from user's response
    const moodKeywords = {
      positive: ['good', 'happy', 'great', 'better'],
      negative: ['bad', 'sad', 'anxious', 'stressed'],
      neutral: ['okay', 'fine', 'alright']
    };
    // Update session context with detected mood
  };

  const endSession = async () => {
    // Before stopping recording, get session summary
    const summary = await fetch('/api/session-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    const { insights, recommendations } = await summary.json();
    
    // Update session context
    setSessionContext(prev => ({
      ...prev,
      previousInsights: [...prev.previousInsights, ...insights],
      sessionNumber: prev.sessionNumber + 1
    }));

    // Provide closing summary to user
    speakResponse(`
      Thank you for sharing today. Here's what we discussed:
      ${insights.join('. ')}
      For next time, consider: ${recommendations}
    `);

    stopRecording();
  };

  const therapeuticExercises = {
    breathing: "Let's try a breathing exercise. Breathe in for 4 counts, hold for 4, out for 4...",
    grounding: "Let's do a quick grounding exercise. Name 5 things you can see right now...",
    reflection: "Take a moment to reflect on what we discussed. What stands out to you most?"
  };

  const suggestExercise = (userContent: string) => {
    // Analyze content and suggest relevant exercise
    if (userContent.includes('anxious') || userContent.includes('stressed')) {
      return therapeuticExercises.breathing;
    }
    // Add more conditions and exercises
  };

  const checkForCrisis = (text: string) => {
    const crisisKeywords = ['suicide', 'hurt myself', 'give up', 'end it all'];
    const isCrisis = crisisKeywords.some(keyword => text.toLowerCase().includes(keyword));

    if (isCrisis) {
      // Immediate response with crisis resources
      speakResponse(`
        I hear that you're in pain. Please know that help is available 24/7.
        The National Crisis Helpline is available at 988.
        Would you like me to provide more crisis resources?
      `);
      // Show emergency contact UI
      setShowCrisisResources(true);
    }
  };

  const ProgressIndicator = () => {
    return (
      <div className="absolute top-4 right-4 p-4 bg-white rounded-lg shadow-lg">
        <h3>Session Progress</h3>
        <div className="space-y-2">
          <div>Sessions: {sessionContext.sessionNumber}</div>
          <div>Mood Trend: {/* Add mood trend visualization */}</div>
          <div>Key Insights: {sessionContext.previousInsights.length}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="h-16 border-b border-blue-100 bg-white/80 backdrop-blur-sm flex items-center px-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Relyy Therapist</h1>
            <p className="text-sm text-gray-500">AI Voice Assistant</p>
          </div>
        </div>
        <div className="ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTranscript(true)}
            className="flex items-center gap-2 text-blue-600 border-blue-200"
          >
            <FileText size={16} />
            View Transcript
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden p-6">
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="relative">
            {/* Ripple effect for connected state */}
            {callStatus === 'connected' && (
              <>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-4 border-blue-500/30"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </>
            )}

            {/* Calling animation */}
            {callStatus === 'calling' && (
              <motion.div
                className="absolute -inset-4"
                initial={false}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent" />
              </motion.div>
            )}

            <Avatar className={`w-40 h-40 transition-all duration-300 ${
              callStatus === 'connected' ? 'ring-4 ring-offset-8 ring-offset-blue-50 ring-blue-500 shadow-lg' :
              callStatus === 'calling' ? 'ring-4 ring-offset-8 ring-offset-blue-50 ring-blue-500 shadow-lg' : 'shadow-md'
            }`}>
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-700 text-white text-5xl">RT</AvatarFallback>
            </Avatar>
          </div>

          <div className="text-center space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={callStatus}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                <h2 className="text-2xl font-semibold text-gray-800">Relyy Therapist</h2>
                <p className="text-gray-600">
                  {callStatus === 'idle' && (
                    <span className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      Tap to start call
                    </span>
                  )}
                  {callStatus === 'calling' && (
                    <span className="flex items-center justify-center gap-2">
                      <PhoneCall className="w-4 h-4 text-blue-600 animate-pulse" />
                      Connecting...
                    </span>
                  )}
                  {callStatus === 'connected' && (
                    <span className="flex items-center justify-center gap-2">
                      <PhoneCall className="w-4 h-4 text-blue-600" />
                    </span>
                  )}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {callStatus === 'connected' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-32"
            >
              <Button
                onClick={stopRecording}
                variant="destructive"
                size="sm"
                className="rounded-full px-6 bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-200/50 flex items-center gap-2"
              >
                <PhoneOff size={16} />
                End Call
              </Button>
            </motion.div>
          )}
        </div>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white p-4 rounded-full shadow-lg border border-blue-100"
          >
            <p className="text-gray-700 flex items-center gap-2">
              <Loader2 className="animate-spin text-blue-600" size={16} />
              Processing...
            </p>
          </motion.div>
        )}
      </main>

      <footer className="p-6 border-t border-blue-100 bg-white/80 backdrop-blur-sm">
        {callStatus !== 'connected' && (
          <div className="max-w-2xl mx-auto flex gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={startRecording}
                disabled={isProcessing}
                size="lg"
                className="rounded-full w-20 h-20 transition-all duration-300 shadow-lg bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                aria-label={isRecording ? "Stop recording" : "Start recording"}
                role="button"
                aria-pressed={isRecording}
              >
                <Phone size={28} />
              </Button>
            </motion.div>
          </div>
        )}
      </footer>

      {showTranscript && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Session Transcript</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTranscript(false)}
              >
                <X size={20} />
              </Button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {messages.map((message, index) => (
                <div key={message.id} className={`mb-6 ${
                  message.role === 'user' ? 'pl-4' : 'pl-8'
                }`}>
                  <p className="text-sm text-gray-500 mb-1">
                    {message.role === 'user' ? 'You' : 'Therapist'}:
                  </p>
                  <p className="text-gray-800 leading-relaxed">
                    {message.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={exportConversation}
                className="flex items-center gap-2"
              >
                <Download size={16} />
                Download Transcript
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
} 