'use client'

import React from 'react'
import { GraduationCap } from 'lucide-react'
import { Button } from "@/components/ui/button"

const VoiceChatPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="h-16 border-b border-blue-100 bg-white/80 backdrop-blur-sm flex items-center px-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Relyy Therapist</h1>
            <p className="text-sm text-gray-500">AI Voice Assistant</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden p-6">
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="text-center space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">Voice Chat Currently Unavailable</h2>
            <p className="text-gray-600">This feature has been temporarily disabled. Please try our text-based chat instead.</p>
            <Button 
              onClick={() => window.history.back()}
              className="mt-4"
            >
              Go Back
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default VoiceChatPage 