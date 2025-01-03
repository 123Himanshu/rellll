'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Brain, Heart } from 'lucide-react'

const steps = [
  {
    icon: <MessageSquare size={40} />,
    title: 'Start a Conversation',
    description: 'Begin chatting with Relyy about your thoughts and feelings.',
  },
  {
    icon: <Brain size={40} />,
    title: 'AI Analysis',
    description: 'Our AI processes your input to understand your needs.',
  },
  {
    icon: <Heart size={40} />,
    title: 'Personalized Support',
    description: 'Receive tailored advice, exercises, and coping strategies.',
  },
]

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-purple-300 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How Relyy Works
        </motion.h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(124, 58, 237)" }}
              className="bg-gray-800 p-6 rounded-lg shadow-md text-center max-w-xs w-full"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-purple-400 mb-4 inline-block"
              >
                {step.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

