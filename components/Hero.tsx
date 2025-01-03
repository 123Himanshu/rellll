'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

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
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between pt-32 pb-16">
          <div className="lg:w-1/2 relative z-10">
            <motion.h1 
              className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your AI Companion for Mental Wellness
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Relyy is here to listen, support, and guide you on your journey to better mental health. 
              Chat with our AI anytime, anywhere.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-purple-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-purple-700 transition duration-300"
            >
              Start Chatting Now
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:w-1/2 mt-16 lg:mt-0"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
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
                        ? 'bg-purple-600 text-white rounded-tl-none' 
                        : 'bg-gray-700 text-gray-200 rounded-tr-none'
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
                  className="flex-grow bg-gray-700/50 text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button 
                  type="submit" 
                  className="bg-purple-600 text-white rounded-full p-3 hover:bg-purple-700 transition duration-300"
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

