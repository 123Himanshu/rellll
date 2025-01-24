'use client';

import Orb from '@/components/examples/orb';
import Header from '@/components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle } from 'lucide-react';

export default function OrbPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </motion.button>
          </Link>
          <Link href="/chatbot">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <MessageCircle size={20} />
              Text Chat
            </motion.button>
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Voice Interaction</h1>
        <div className="max-w-2xl mx-auto">
          <Orb intensity={3} />
          <p className="text-gray-300 text-center mt-6">
            Click on the orb to start/stop voice interaction
          </p>
        </div>
      </div>
    </main>
  );
} 