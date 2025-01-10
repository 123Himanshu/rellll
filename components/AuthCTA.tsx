'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from "@clerk/nextjs"

const AuthCTA = () => {
  const { userId } = useAuth()
  const pathname = usePathname()

  // If we're on the chatbot route, don't render anything
  if (pathname === '/chatbot' || pathname === '/voice-chat') {
    return null
  }

  // Hide on auth pages or when user is logged in
  if (userId || pathname === '/sign-in' || pathname === '/sign-up') return null

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 left-0 right-0 z-40"
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-xl border border-[#ADD8E6]/20">
          <div className="px-8 py-6">
            <h3 className="text-xl font-semibold text-[#2E5A88]">Ready to Start Your Journey?</h3>
            <p className="text-[#4A5568] mt-2">Join Relyy for personalized mental wellness support</p>
            
            <div className="flex items-center gap-4">
              <Link 
                href="/sign-in" 
                className="text-[#2E5A88] hover:text-[#1E3F66] px-6 py-2 rounded-full border border-[#2E5A88] hover:bg-[#F0F7FF] transition-all duration-300"
              >
                Login
              </Link>
              <Link 
                href="/sign-up" 
                className="bg-[#2E5A88] text-white px-6 py-2 rounded-full hover:bg-[#1E3F66] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AuthCTA 