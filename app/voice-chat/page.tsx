'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mic, StopCircle, Loader2, GraduationCap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function VoiceChatPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [messages, setMessages] = useState<Array<{role: string, content: string, id: string}>>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
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

      mediaRecorderRef.current.start(200) // Collect data every 200ms
      setIsRecording(true)
    } catch (err) {
      console.error('Error starting recording:', err)
      alert('Could not access microphone. Please ensure it is connected and permissions are granted.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
  }

  const handleAudioUpload = async (audioBlob: Blob) => {
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
                content: 'You are Relyy, an empathetic and professional AI therapist. Respond with compassion, ask thoughtful questions, and provide supportive guidance while maintaining appropriate therapeutic boundaries. Avoid giving medical advice or diagnosing conditions.' 
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

        // Optional: Speak the response
        speakResponse(data.message)
      }
    } catch (error) {
      console.error('Error processing audio:', error)
      alert('Failed to process audio. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const speakResponse = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    window.speechSynthesis.speak(utterance)
  }

  // Cleanup function
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-zinc-50 to-zinc-100">
      <header className="h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-sm flex items-center px-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-zinc-700" />
          <div>
            <h1 className="text-xl font-semibold text-zinc-900">Relyy Therapist</h1>
            <p className="text-sm text-zinc-600">Your AI Companion for Mental Wellness</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-zinc-800">
            <GraduationCap className="w-16 h-16 text-zinc-400" />
            <h2 className="text-2xl font-semibold">Welcome to Relyy Therapist</h2>
            <p className="max-w-md text-zinc-600">
              I am here to listen and support you. Tap the microphone button to start sharing your thoughts.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 max-w-2xl mx-auto ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <Avatar className={`w-10 h-10 transition-all duration-300 ${
                isSpeaking ? 'ring-2 ring-offset-2 ring-zinc-400 animate-pulse' : ''
              }`}>
                <AvatarFallback className="bg-zinc-800 text-zinc-100">RT</AvatarFallback>
              </Avatar>
            )}
            <div className={`rounded-2xl p-4 max-w-[80%] transition-all duration-300 ${
              message.role === 'user'
                ? 'bg-zinc-800 text-zinc-50'
                : `bg-white text-zinc-800 border border-zinc-200 shadow-sm ${
                    isSpeaking && message.role === 'assistant' 
                      ? 'border-zinc-400 shadow-md bg-gradient-to-r from-zinc-50 to-white' 
                      : ''
                  }`
            }`}>
              <p className="text-sm leading-relaxed">{message.content}</p>
              {isSpeaking && message.role === 'assistant' && (
                <div className="flex items-center gap-1 mt-3 h-3">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="w-0.5 bg-zinc-400 rounded-full"
                      animate={{
                        height: [4, 12, 4],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  <div className="relative w-16 h-3 ml-2">
                    {[...Array(8)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute left-0 w-16 h-3 border-t border-zinc-300 rounded-full"
                        style={{
                          borderRadius: '50%',
                        }}
                        animate={{
                          opacity: [0, 0.5, 0],
                          scale: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.25,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            {message.role === 'user' && (
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-white text-zinc-800 border-2 border-zinc-200">You</AvatarFallback>
              </Avatar>
            )}
          </motion.div>
        ))}

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white/90 p-4 rounded-full shadow-lg border border-zinc-200"
          >
            <p className="text-zinc-800 flex items-center gap-2">
              <Loader2 className="animate-spin" size={16} />
              Processing your message...
            </p>
          </motion.div>
        )}
      </main>

      <footer className="p-6 border-t border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto flex gap-2 justify-center">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            className={`rounded-full w-16 h-16 transition-all duration-200 ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-zinc-800 hover:bg-zinc-900'
            }`}
          >
            {isRecording ? <StopCircle size={24} /> : <Mic size={24} />}
          </Button>
        </div>
      </footer>
    </div>
  )
} 