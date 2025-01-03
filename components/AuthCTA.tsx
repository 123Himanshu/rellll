'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from "@clerk/nextjs"

const AuthCTA = () => {
  const { userId } = useAuth()
  const pathname = usePathname()

  // Hide on auth pages or when user is logged in
  if (userId || pathname === '/sign-in' || pathname === '/sign-up') return null

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 left-0 right-0 z-40"
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-gray-800/95 backdrop-blur-sm shadow-lg rounded-2xl">
          <div className="px-6 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold text-purple-400">Ready to Start Your Journey?</h3>
                <p className="text-gray-300 mt-1">Join Relyy for personalized mental wellness support</p>
              </div>
              <div className="flex items-center gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/sign-in" 
                    className="text-gray-300 hover:text-purple-400 px-4 py-2"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/sign-up" 
                    className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition duration-300 whitespace-nowrap text-sm font-medium"
                  >
                    Sign up
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AuthCTA 