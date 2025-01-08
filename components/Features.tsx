'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MessageCircle, Brain, Lock, Clock } from 'lucide-react'

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#F0F7FF] to-[#E8F1F8]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#2E5A88] mb-4">
            Features that set us apart
          </h2>
          <p className="text-xl text-gray-600">
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
              className="absolute -top-6 -right-6 bg-[#2E5A88]/90 backdrop-blur-sm p-4 rounded-lg shadow-lg"
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
              <h3 className="text-3xl font-bold text-[#2E5A88] mb-4">
                AI-Powered Mental Wellness Support
              </h3>
              <p className="text-[#4A5568] text-lg">
                Experience personalized mental health support through our advanced AI chatbot, designed to understand and assist you 24/7.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <motion.div
                className="flex items-start gap-4 bg-white/90 p-6 rounded-xl backdrop-blur-sm hover:bg-[#F0F7FF] transition-all duration-300 shadow-md hover:shadow-lg border border-[#ADD8E6]/20"
              >
                <MessageCircle className="text-[#2E5A88] w-6 h-6 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-[#2E5A88]">Intelligent Conversations</h4>
                  <p className="text-[#4A5568]">Natural dialogue with contextual understanding and empathetic responses.</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 bg-white/90 p-6 rounded-xl backdrop-blur-sm hover:bg-[#F0F7FF] transition-all duration-300 shadow-md hover:shadow-lg border border-[#ADD8E6]/20"
              >
                <Brain className="text-[#2E5A88] w-6 h-6 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-[#2E5A88]">Personalized Support</h4>
                  <p className="text-[#4A5568]">Adaptive responses based on your unique needs and conversation history.</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 bg-white/90 p-6 rounded-xl backdrop-blur-sm hover:bg-[#F0F7FF] transition-all duration-300 shadow-md hover:shadow-lg border border-[#ADD8E6]/20"
              >
                <Lock className="text-[#2E5A88] w-6 h-6 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-[#2E5A88]">Private & Secure</h4>
                  <p className="text-[#4A5568]">End-to-end encryption ensuring your conversations remain completely confidential.</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 bg-white/90 p-6 rounded-xl backdrop-blur-sm hover:bg-[#F0F7FF] transition-all duration-300 shadow-md hover:shadow-lg border border-[#ADD8E6]/20"
              >
                <Clock className="text-[#2E5A88] w-6 h-6 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-[#2E5A88]">24/7 Availability</h4>
                  <p className="text-[#4A5568]">Access support anytime, anywhere - we are always here when you need us.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

