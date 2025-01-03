'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Relyy</h3>
            <p className="mb-4">Your AI companion for mental wellness.</p>
            <div className="flex space-x-4">
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="hover:text-purple-400"><Facebook /></motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="hover:text-purple-400"><Twitter /></motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="hover:text-purple-400"><Instagram /></motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="hover:text-purple-400"><Linkedin /></motion.a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-purple-400">Home</Link></li>
              <li><Link href="#" className="hover:text-purple-400">About</Link></li>
              <li><Link href="#" className="hover:text-purple-400">Features</Link></li>
              <li><Link href="#" className="hover:text-purple-400">Pricing</Link></li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-purple-400">FAQ</Link></li>
              <li><Link href="#" className="hover:text-purple-400">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-purple-400">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-purple-400">Terms of Service</Link></li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="mb-4">Stay updated with our latest news and offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white rounded-l-lg px-4 py-2 w-full focus:outline-none"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 text-white rounded-r-lg px-4 py-2 hover:bg-purple-700 transition duration-300"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p>&copy; {new Date().getFullYear()} Relyy. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

