'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { text: "Hello! I'm Relyy, your AI mental health companion. How are you feeling today?", isAI: true },
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setChatMessages([...chatMessages, { text: message, isAI: false }])
      setMessage('')
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { text: "Thank you for sharing. I'm here to listen and support you. Would you like to talk more about it?", isAI: true },
        ])
      }, 1000)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#E8F1F8] via-white to-[#D8E6F3]">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between pt-32 pb-16">
          <div className="lg:w-1/2 relative z-10 lg:pr-8 lg:ml-8">
            <motion.h1 
              className="text-7xl font-bold text-[#2E5A88] mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your AI Companion for Mental Wellness
            </motion.h1>
            <motion.p 
              className="text-xl text-[#4A5568] mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Relyy is here to listen, support, and guide you on your journey to better mental health. 
              Chat with our AI anytime, anywhere.
            </motion.p>
            <div className="flex flex-col space-y-4 w-full max-w-md">
              <Link href="/chatbot" className="w-full">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="w-full bg-purple-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-purple-700 transition-all duration-200"
                >
                  Conversation with therapist
                </motion.button>
              </Link>
              <Link href="/orb" className="w-full">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="w-full bg-purple-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-purple-700 transition-all duration-200"
                >
                  Voice Conversation with therapist
                </motion.button>
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:w-1/2 mt-16 lg:mt-0 lg:pl-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 max-w-md mx-auto border border-[#ADD8E6]/30">
              <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.isAI 
                        ? 'bg-[#2E5A88] text-white rounded-tl-none' 
                        : 'bg-[#ADD8E6] text-[#2E5A88] rounded-tr-none'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow bg-white/80 text-[#4A5568] rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5A88] border border-[#ADD8E6]/30"
                />
                <button 
                  type="submit" 
                  className="bg-[#2E5A88] text-white rounded-full p-3 hover:bg-[#1E3F66] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Send size={24} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

