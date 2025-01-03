'use client'

import { motion } from 'framer-motion'

const CTA = () => {
  return (
    <section className="py-16 bg-purple-600">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-6"
        >
          Ready to Start Your Journey to Better Mental Health?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-purple-100 mb-8"
        >
          Join thousands of users who have found support and guidance with Relyy.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-purple-100 transition duration-300"
        >
          Get Started for Free
        </motion.button>
      </div>
    </section>
  )
}

export default CTA

