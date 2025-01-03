'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'What is Relyy?',
    answer: 'Relyy is an AI-powered mental health chat application designed to provide support, guidance, and coping strategies for various mental health concerns.',
  },
  {
    question: 'Is Relyy a replacement for professional therapy?',
    answer: 'No, Relyy is not a replacement for professional therapy. It\'s a supportive tool that can complement professional care, but it\'s not intended to diagnose or treat mental health conditions.',
  },
  {
    question: 'How does Relyy protect my privacy?',
    answer: 'Relyy uses state-of-the-art encryption to protect your conversations. We do not store personal information, and all chats are anonymized.',
  },
  {
    question: 'Can I use Relyy for free?',
    answer: 'Yes, Relyy offers a free tier with limited features. We also have premium plans for more comprehensive support and additional features.',
  },
]

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-purple-300 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <motion.button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="flex justify-between items-center w-full text-left p-4 bg-gray-800 rounded-lg focus:outline-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-gray-100 font-semibold">{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="text-purple-400" />
                ) : (
                  <ChevronDown className="text-purple-400" />
                )}
              </motion.button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-700 p-4 rounded-b-lg"
                  >
                    <p className="text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

