'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Plus, Settings, HelpCircle, ChevronDown, Send } from 'lucide-react'

type ChatError = Error | { message: string };

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    onError: (err: Error) => {
      console.error('Chat error:', err);
    },
    onFinish: () => {
      console.log('Chat finished successfully');
    }
  }) as { messages: any[]; input: string; handleInputChange: any; handleSubmit: any; isLoading: boolean; error: ChatError | null };
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#F0F4F8]">
      {/* Sidebar */}
      <motion.div 
        initial={false}
        animate={{
          width: sidebarOpen ? 256 : 64,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        className="bg-white/80 backdrop-blur-sm border-r border-[#4A5568]/20 flex flex-col py-4"
      >
        {/* Toggle Button */}
        <motion.button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 mb-4 text-[#4A5568] hover:bg-[#4A5568]/10 flex items-center mx-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu size={28} />
        </motion.button>

        {/* New Session Button */}
        <motion.button 
          className="mx-3 p-2 rounded-lg bg-[#4A5568]/10 text-[#4A5568] hover:bg-[#4A5568]/20 transition-colors flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={24} />
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                New session
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Navigation Icons */}
        <div className="flex flex-col mt-auto">
          <motion.button 
            className="p-2 mx-3 text-[#4A5568] hover:bg-[#4A5568]/10 rounded-lg flex items-center gap-2 mb-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <HelpCircle size={24} />
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  Help
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button 
            className="p-2 mx-3 text-[#4A5568] hover:bg-[#4A5568]/10 rounded-lg flex items-center gap-2 mb-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Settings size={24} />
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-[#E6F0F8]/30 to-[#F0F4F8]/30">
        <header className="h-14 border-b border-[#4A5568]/20 bg-white/50 backdrop-blur-sm flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 text-[#4A5568] hover:bg-transparent hover:text-[#4A5568]">
                  Relyy Therapist
                  <span className="text-xs text-[#4A5568]/70 hover:text-[#4A5568]/70">Relyy Health Support</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-[#4A5568]/20">
                <DropdownMenuItem className="text-[#4A5568] hover:bg-[#4A5568]/10">
                  About RelyyAI
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#4A5568] hover:bg-[#4A5568]/10">
                  Privacy Policy
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <Button className="gap-2 bg-[#4A5568] hover:bg-[#4A5568]/90 text-white transition-colors">
              <Plus size={16} />
              Find a Human Therapist
            </Button>
            <Avatar className="h-9 w-9 bg-[#4A5568]">
              <AvatarFallback className="text-white font-medium text-sm">
                U
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 space-y-6">
          {error && (
            <div className="p-4 text-red-500 bg-red-50 rounded-md mb-4 max-w-2xl mx-auto">
              Error: {(error as ChatError).message || 'An error occurred'}
            </div>
          )}
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-4 max-w-2xl mx-auto ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8 ring-2 ring-white">
                    <AvatarFallback className="bg-gradient-to-br from-[#4A5568] to-[#2D3748] text-white text-xs font-medium">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-2xl p-4 max-w-[80%] shadow-sm ${
                    message.role === 'user'
                      ? 'bg-[#4A5568] text-white ml-auto'
                      : 'bg-white text-[#4A5568] border border-[#4A5568]/20'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap font-medium">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8 ring-2 ring-[#4A5568]">
                    <AvatarFallback className="bg-white text-[#4A5568] text-xs font-medium">
                      You
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeOut"
                }}
                className="text-center"
              >
                <motion.h1 
                  className="text-6xl font-normal"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: 0.5, 
                    duration: 1.2, 
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.8,
                      duration: 1,
                      ease: "easeOut"
                    }}
                    className="text-[#4A5568]"
                  >
                    Welcome,
                  </motion.span>
                  {" "}
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 1.2,
                      duration: 1,
                      ease: "easeOut"
                    }}
                    className="text-[#68D391]"
                  >
                    Friend
                  </motion.span>
                </motion.h1>
                <motion.p
                  className="mt-6 text-3xl font-normal text-[#4A5568]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 1.8, 
                    duration: 1,
                    ease: "easeOut"
                  }}
                >
                  I'm your personal{" "}
                  <motion.span 
                    className="font-medium text-[#4A5568]"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 2.2,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                  >
                    Relyy MindfulAI
                  </motion.span>{" "}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      delay: 2.6, 
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                    className="text-[#4A5568]"
                  >
                    therapist
                  </motion.span>
                </motion.p>
              </motion.div>
            </div>
          )}
        </main>

        <footer className="p-4 border-t border-[#4A5568]/20 bg-white/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Share your thoughts or concerns..."
              className="flex-1 bg-white border-[#4A5568]/20 focus:ring-[#4A5568] focus:border-[#4A5568] 
                placeholder-[#4A5568]/50 text-[#4A5568] font-medium"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-[#4A5568] hover:bg-[#4A5568]/90 text-white"
            >
              {isLoading ? (
                <div className="animate-spin">⌛</div>
              ) : (
                <Send size={20} />
              )}
            </Button>
          </form>
          <p className="text-xs text-center mt-2 text-[#4A5568]/70">
            For emergencies, please call your local emergency services or mental health crisis hotline.
          </p>
        </footer>
      </div>
    </div>
  );
}

