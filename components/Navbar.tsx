'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from 'next/navigation'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { userId } = useAuth();
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Client Page', href: '/client' },
    { name: 'Chatbot', href: '/chatbot' },
  ];

  if (pathname === '/chatbot') {
    return null
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full bg-white/90 backdrop-blur-sm shadow-lg z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-3xl font-bold text-[#2E5A88]"
          >
            <Link href="/">Relyy</Link>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href={item.href} className="text-gray-600 hover:text-[#2E5A88]">
                  {item.name}
                </Link>
              </motion.div>
            ))}
            
            <div className="flex items-center space-x-4">
              {!userId ? (
                <>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link href="/sign-in" className="text-[#4A5568] hover:text-[#2E5A88] transition-all duration-300">
                      Login
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link href="/sign-up" className="bg-[#2E5A88] text-white px-4 py-2 rounded-full hover:bg-[#1d3b5a] transition duration-300">
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link href="/profile" className="text-[#4A5568] hover:text-[#2E5A88] transition-all duration-300">
                      Profile
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <UserButton afterSignOutUrl="/" />
                  </motion.div>
                </>
              )}
            </div>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? 
                <X className="text-[#2E5A88]" /> : 
                <Menu className="text-[#2E5A88]" />
              }
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4"
            >
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={item.href}
                      className="block text-gray-300 hover:text-purple-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                {!userId ? (
                  <div className="flex flex-col space-y-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/sign-in"
                        className="block text-gray-300 hover:text-purple-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/sign-up"
                        className="block bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300 text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </motion.div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/profile"
                        className="block text-gray-300 hover:text-purple-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <UserButton afterSignOutUrl="/" />
                    </motion.div>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header

