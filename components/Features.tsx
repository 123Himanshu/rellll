'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MessageCircle, Brain, Lock, Clock } from 'lucide-react'

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Features that set us apart
          </h2>
          <p className="text-xl text-gray-300">
            Experience mental wellness support like never before
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Image
              src="/_00E81E84-5E12-4D52-AD3B-74CF31C8B62A_-removebg-preview.png"
              alt="AI Mental Health Support"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl"
            />
            
            {/* Stats overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-6 -right-6 bg-purple-600/90 backdrop-blur-sm p-4 rounded-lg shadow-lg"
            >
              <p className="text-2xl font-bold text-white">85.5%</p>
              <p className="text-sm text-gray-200">User Satisfaction</p>
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                AI-Powered Mental Wellness Support
              </h3>
              <p className="text-gray-300 text-lg">
                Experience personalized mental health support through our advanced AI chatbot, designed to understand and assist you 24/7.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm"
              >
                <MessageCircle className="text-purple-400 w-6 h-6 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-white">Intelligent Conversations</h4>
                  <p className="text-gray-300">Natural dialogue with contextual understanding and empathetic responses.</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm"
              >
                <Brain className="text-purple-400 w-6 h-6 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-white">Personalized Support</h4>
                  <p className="text-gray-300">Adaptive responses based on your unique needs and conversation history.</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm"
              >
                <Lock className="text-purple-400 w-6 h-6 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-white">Private & Secure</h4>
                  <p className="text-gray-300">End-to-end encryption ensuring your conversations remain completely confidential.</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm"
              >
                <Clock className="text-purple-400 w-6 h-6 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-white">24/7 Availability</h4>
                  <p className="text-gray-300">Access support anytime, anywhere - we are always here when you need us.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

