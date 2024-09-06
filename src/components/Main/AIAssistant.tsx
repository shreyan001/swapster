import React, { useState, useEffect } from 'react'
import { useAccount, useWalletClient } from 'wagmi'
import { Client } from '@xmtp/xmtp-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Send, Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Buffer } from "buffer";

interface AIAssistantProps {
  isExpanded: boolean
  toggleExpanded: () => void
}

export default function AIAssistant({ isExpanded, toggleExpanded }: AIAssistantProps) {
  const { address } = useAccount()
  const { data: signer } = useWalletClient()
  const [isXmtpConnected, setIsXmtpConnected] = useState(false)
  const [client, setClient] = useState<Client | null>(null)
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const [input, setInput] = useState('')
  const [chatHistory, setChatHistory] = useState<{ id: number, title: string }[]>([
    { id: 1, title: "Previous Chat 1" },
    { id: 2, title: "Previous Chat 2" },
    { id: 3, title: "Previous Chat 3" },
  ])
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.Buffer = window.Buffer || Buffer;
    }
  }, []);

  const initXmtpWithKeys = async () => {
    if (!signer) return
    const options = { env: getEnv() }
    let keys = loadKeys(address!)
    if (!keys) {
      const keysArray = await Client.getKeys(signer, {
        ...options,
        skipContactPublishing: true,
        persistConversations: false,
      })
      keys = Buffer.from(keysArray)
      storeKeys(address!, keys)
    }
    // Add a null check before creating the client
    if (keys) {
      const xmtp = await Client.create(null, { ...options, privateKeyOverride: keys })
      setClient(xmtp)
      setIsXmtpConnected(true)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setChatMessages([...chatMessages, { role: 'user', content: input }])
      setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'assistant', content: `Here's a suggestion based on your query: ${input}` }])
      }, 500)
      setInput('')
    }
  }

  const handleNewChat = () => {
    setSelectedChat(null)
    setChatMessages([])
  }

  return (
    <AnimatePresence>
      <motion.div
        className="w-96 bg-gray-200 overflow-hidden border-l-2 border-t-2 border-b-2 border-black flex flex-col"
        initial={{ width: "70px" }}
        animate={{ width: isExpanded ? "484px" : "70px" }}
        transition={{ duration: 0.3 }}
        style={{ position: 'fixed', right: 0, top: '9%', height: '85%', zIndex:  10 }}
      >
        <Button 
              variant="ghost" 
              className={`absolute top-1/4 -left-4 transform bg-[#39FF14] text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 z-10 ${!signer ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={signer ? toggleExpanded : undefined}
              disabled={!signer}
            >
              {isExpanded ? <ChevronRight /> : <ChevronLeft />}
            </Button>

        {!isExpanded && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-sm font-bold">
            AI Trading Assistant
          </div>
        )}

        {isExpanded && address && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col h-full"
          >
            {!isXmtpConnected ? (
              <div className="flex justify-center items-center h-full">
                <Button onClick={initXmtpWithKeys}>
                  Connect to XMTP
                </Button>
              </div>
            ) : (
              <>
                <div className="p-6 border-b-2 border-black">
                  <h2 className="text-xl font-bold mb-4">AI Trading Assistant</h2>
                  <div className="flex justify-between mb-4">
                    <Button
                      variant="outline"
                      className="border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1"
                      onClick={handleNewChat}
                    >
                      New Chat
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1"
                        >
                          Chat History
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white border-2 border-black shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                        <DialogHeader>
                          <DialogTitle>Chat History</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 space-y-2">
                          {chatHistory.map((chat) => (
                            <Button
                              key={chat.id}
                              variant="outline"
                              className="w-full justify-start border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1"
                              onClick={() => setSelectedChat(chat.id)}
                            >
                              {chat.title}
                            </Button>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`p-2 ${msg.role === 'user' ? 'bg-[#39FF14] text-black ml-8' : 'bg-gray-200 text-black mr-8'} border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)]`}>
                      {msg.content}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="p-4 border-t-2 border-black">
                  <div className="flex space-x-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      className="flex-grow bg-white border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] focus:shadow-[0_0_0_2px_#39FF14]"
                    />
                    <Button type="submit" className="bg-[#39FF14] text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1">
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNewChat}
                      className="bg-white text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

// Add these functions at the end of the file
const ENCODING = 'binary'
const getEnv = (): "production" | "local" | "dev" => 
  (process.env.NEXT_PUBLIC_XMTP_ENV as "production" | "local" | "dev") || "production"
const buildLocalStorageKey = (walletAddress: string) => `xmtp:${getEnv()}:keys:${walletAddress}`
const loadKeys = (walletAddress: string) => {
  if (typeof window !== 'undefined') {
    const val = localStorage.getItem(buildLocalStorageKey(walletAddress))
    return val ? Buffer.from(val, ENCODING) : null
  }
  return null
}
const storeKeys = (walletAddress: string, keys: Buffer) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(
      buildLocalStorageKey(walletAddress),
      Buffer.from(keys).toString(ENCODING)
    )
  }
}
