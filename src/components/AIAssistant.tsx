import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Send, Plus } from 'lucide-react'

interface AIAssistantProps {
  isExpanded: boolean
  toggleExpanded: () => void
}

export default function AIAssistant({ isExpanded, toggleExpanded }: AIAssistantProps) {
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const [input, setInput] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // ... (keep the message sending logic)
  }

  const handleNewChat = () => {
    // ... (keep the new chat logic)
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="w-96 bg-gray-100 overflow-hidden border-l-2 border-black flex flex-col"
        initial={{ width: "60px" }}
        animate={{ width: isExpanded ? "384px" : "60px" }}
        transition={{ duration: 0.3 }}
        style={{ position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 50 }}
      >
        {/* Toggle button */}
        <Button 
          variant="ghost" 
          className="absolute top-20 -left-3 transform bg-[#39FF14] text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 z-10"
          onClick={toggleExpanded}
        >
          {isExpanded ? <ChevronRight /> : <ChevronLeft />}
        </Button>
        
        {/* AI Assistant content */}
        {/* ... (keep the AI assistant content, including chat messages and input form) */}
      </motion.div>
    </AnimatePresence>
  )
}