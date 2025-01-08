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
import { Menu, Plus, Settings, HelpCircle, Clock, Heart, ChevronDown, Send } from 'lucide-react'
 
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
    <div className="flex h-screen bg-[#D8D8D8]">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-80 border-r border-[#2E5A88]/20 bg-white/80 backdrop-blur-sm"
          >
            <div className="flex flex-col h-full">
              <div className="p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-[#2E5A88] hover:bg-[#2E5A88]/10"
                  onClick={() => {}}
                >
                  <Plus size={16} />
                  New conversation
                </Button>
              </div>
 
              <div className="px-4 py-2">
                <h2 className="text-sm font-semibold text-[#2E5A88]">Recent Topics</h2>
              </div>
 
              <div className="flex-1 overflow-auto px-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  {['Stress Management', 'Anxiety Coping', 'Mood Improvement'].map((topic) => (
                    <Button
                      key={topic}
                      variant="ghost"
                      className="w-full justify-start text-left font-normal text-[#2E5A88] hover:bg-[#2E5A88]/10"
                    >
                      {topic}
                    </Button>
                  ))}
                </motion.div>
              </div>
 
              <div className="p-4 border-t border-[#2E5A88]/20 space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-2 text-[#2E5A88] hover:bg-[#2E5A88]/10">
                  <Heart size={16} />
                  Wellness Resources
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-[#2E5A88] hover:bg-[#2E5A88]/10">
                  <HelpCircle size={16} />
                  Help
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-[#2E5A88] hover:bg-[#2E5A88]/10">
                  <Clock size={16} />
                  Session History
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-[#2E5A88] hover:bg-[#2E5A88]/10">
                  <Settings size={16} />
                  Settings
                </Button>
              </div>
 
              <div className="p-4 border-t border-[#2E5A88]/20">
                <p className="text-sm text-[#2E5A88]/80">
                  Remember: This is not a substitute for professional help.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-[#ADD8E6]/30 to-[#D8D8D8]/30">
        <header className="h-14 border-b border-[#2E5A88]/20 bg-white/50 backdrop-blur-sm flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#2E5A88]"
            >
              <Menu size={20} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 text-[#2E5A88]">
                  MindfulAI
                  <span className="text-xs text-[#2E5A88]/70">Mental Health Support</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-[#2E5A88]/20">
                <DropdownMenuItem className="text-[#2E5A88] hover:bg-[#2E5A88]/10">
                  About MindfulAI
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#2E5A88] hover:bg-[#2E5A88]/10">
                  Privacy Policy
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
 
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 text-[#2E5A88] border-[#2E5A88]/20 hover:bg-[#2E5A88]/10">
              <Plus size={16} />
              Find a Therapist
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
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
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/ai-avatar.png" />
                    <AvatarFallback className="bg-[#2E5A88] text-white">AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-2xl p-4 max-w-[80%] shadow-sm ${
                    message.role === 'user'
                      ? 'bg-[#2E5A88] text-white ml-auto'
                      : 'bg-white text-[#2E5A88] border border-[#2E5A88]/20'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap font-medium">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/user-avatar.png" />
                    <AvatarFallback className="bg-[#ADD8E6]">U</AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </main>
 
        <footer className="p-4 border-t border-[#2E5A88]/20 bg-white/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about mental health..."
              className="flex-1 bg-white border-[#2E5A88]/20 focus:ring-[#2E5A88] focus:border-[#2E5A88] 
                placeholder-[#2E5A88]/50 text-[#2E5A88] font-medium"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-[#2E5A88] hover:bg-[#2E5A88]/90 text-white"
            >
              {isLoading ? (
                <div className="animate-spin">⌛</div>
              ) : (
                <Send size={20} />
              )}
            </Button>
          </form>
          <p className="text-xs text-center mt-2 text-[#2E5A88]/70">
            For emergencies, please call your local emergency services or mental health crisis hotline.
          </p>
        </footer>
      </div>
    </div>
  );
}