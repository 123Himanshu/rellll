'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Plus, Settings, HelpCircle, Clock, Gem, ChevronDown, Mic, ImagePlus, Send } from 'lucide-react'

interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello, how can I help you today?',
      role: 'assistant'
    }
  ])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [input, setInput] = useState('')

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        content: input,
        role: 'user'
      }])
      setInput('')
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-80 border-r border-border bg-card"
          >
            <div className="flex flex-col h-full">
              <div className="p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => setMessages([])}
                >
                  <Plus size={16} />
                  New chat
                </Button>
              </div>

              <div className="px-4 py-2">
                <h2 className="text-sm font-semibold text-muted-foreground">Recent</h2>
              </div>

              <div className="flex-1 overflow-auto px-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  {['A Simple Greeting', 'Image Generation', 'Code Help'].map((chat) => (
                    <Button
                      key={chat}
                      variant="ghost"
                      className="w-full justify-start text-left font-normal"
                    >
                      {chat}
                    </Button>
                  ))}
                </motion.div>
              </div>

              <div className="p-4 border-t border-border space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Gem size={16} />
                  Relyy manager
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <HelpCircle size={16} />
                  Help
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Clock size={16} />
                  Activity
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings size={16} />
                  Settings
                </Button>
              </div>

              <div className="p-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Your location • Update location
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  Relyy
                  <span className="text-xs text-muted-foreground">1.5 Flash</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Relyy Pro</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Plus size={16} />
              Try Relyy Advanced
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-4 mb-6 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>R</AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-lg p-4 max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </main>

        <footer className="p-4 border-t border-border">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Relyy..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            <Button variant="ghost" size="icon">
              <ImagePlus size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Mic size={20} />
            </Button>
            <Button onClick={handleSend}>
              <Send size={20} />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}

