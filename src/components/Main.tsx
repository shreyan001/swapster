'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Wallet, ChevronDown, Settings, ArrowLeft, Plus, Minus, MessageSquare, ChevronRight, ChevronLeft, Send, BarChart2, DollarSign } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Main() {
  const [activeView, setActiveView] = useState<'swap' | 'liquidity' | 'dashboard'>('swap')
  const [selectedPair, setSelectedPair] = useState({ token1: '', token2: '' })
  const [showLiquidityDetails, setShowLiquidityDetails] = useState(false)
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const [input, setInput] = useState('')
  const [chatHistory, setChatHistory] = useState<{ id: number, title: string }[]>([
    { id: 1, title: "Previous Chat 1" },
    { id: 2, title: "Previous Chat 2" },
    { id: 3, title: "Previous Chat 3" },
  ])
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  const toggleAssistant = () => setIsAssistantExpanded(!isAssistantExpanded)

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

  const portfolioData = [
    { name: 'Jan', value: 10000 },
    { name: 'Feb', value: 15000 },
    { name: 'Mar', value: 30000 },
    { name: 'Apr', value: 25000 },
    { name: 'May', value: 18000 },
    { name: 'Jun', value: 22000 },
  ]

  const cryptoTokens = [
    { name: 'Bitcoin', symbol: 'BTC', balance: 0.5, price: 50000 },
    { name: 'Ethereum', symbol: 'ETH', balance: 5, price: 3000 },
    { name: 'Cardano', symbol: 'ADA', balance: 1000, price: 1.5 },
    { name: 'Polkadot', symbol: 'DOT', balance: 100, price: 20 },
  ]

  const scheduledOperations = [
    { id: 1, type: 'DCA', description: 'Buy 0.1 ETH every week', nextExecution: '2023-06-15 10:00 UTC' },
    { id: 2, type: 'Take Profit', description: 'Sell 50% of LINK when price reaches $30', condition: 'LINK >= $30' },
    { id: 3, type: 'Rebalance', description: 'Rebalance portfolio to 60% ETH, 30% BTC, 10% USDT', nextExecution: '2023-06-20 00:00 UTC' },
  ]

  const SwapView = () => (
    <Card className="bg-white border-2 border-black shadow-[0_10px_20px_rgba(0,0,0,0.1)] max-w-md mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Swap</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between">
              <span className="text-gray-600">Sell</span>
              <span>0</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="relative w-1/2">
                <Input 
                  className="bg-white border-2 border-black text-2xl w-full pl-3 pr-10 py-2 shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] focus:shadow-[inset_0_6px_8px_rgba(0,0,0,0.2)] transition-all duration-200" 
                  placeholder="0" 
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-400">MAX</span>
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-[120px] bg-white border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1">
                  <SelectValue placeholder="ETH" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eth">ETH</SelectItem>
                  <SelectItem value="btc">BTC</SelectItem>
                  <SelectItem value="usdt">USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="bg-gray-100 p-4 border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between">
              <span className="text-gray-600">Buy</span>
              <span>0</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="relative w-1/2">
                <Input 
                  className="bg-white border-2 border-black text-2xl w-full pl-3 pr-10 py-2 shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] focus:shadow-[inset_0_6px_8px_rgba(0,0,0,0.2)] transition-all duration-200" 
                  placeholder="0" 
                />
              </div>
              <Button className="bg-[#39FF14] text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1">
                Select token <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <Button className="w-full mt-4 bg-[#39FF14] text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1">
          Swap
        </Button>
      </CardContent>
    </Card>
  )

  const LiquidityView = () => (
    <Card className="bg-white border-2 border-black shadow-[0_10px_20px_rgba(0,0,0,0.1)] max-w-md mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Add Liquidity</h2>
        {!showLiquidityDetails ? (
          <>
            <div className="space-y-4 mb-4">
              <Select onValueChange={(value) => setSelectedPair(prev => ({ ...prev, token1: value }))}>
                <SelectTrigger className="w-full bg-white border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200">
                  <SelectValue placeholder="Select first token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setSelectedPair(prev => ({ ...prev, token2: value }))}>
                <SelectTrigger className="w-full bg-white border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200">
                  <SelectValue placeholder="Select second token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full bg-[#39FF14] text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1"
              onClick={() => setShowLiquidityDetails(true)}
              disabled={!selectedPair.token1 || !selectedPair.token2}
            >
              Add Liquidity
            </Button>
          </>
        ) : (
          <>
            <div className="bg-gray-100 p-4 border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] mb-4">
              <span className="font-bold">Selected Pair:</span> {selectedPair.token1}/{selectedPair.token2}
            </div>
            <div className="space-y-4 mb-4">
              <div className="bg-gray-100 p-4 border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                <Label htmlFor="amount1">Amount {selectedPair.token1}</Label>
                <Input id="amount1" className="mt-2 bg-white border-2 border-black" placeholder="0" />
              </div>
              <div className="bg-gray-100 p-4 border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                <Label htmlFor="amount2">Amount {selectedPair.token2}</Label>
                <Input id="amount2" className="mt-2 bg-white border-2 border-black" placeholder="0" />
              </div>
              <div className="bg-gray-100 p-4 border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                <Label>Fee Tier</Label>
                <Select>
                  <SelectTrigger className="w-full mt-2 bg-white border-2 border-black">
                    <SelectValue placeholder="Select fee tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.01">0.01%</SelectItem>
                    <SelectItem value="0.05">0.05%</SelectItem>
                    <SelectItem value="0.3">0.3%</SelectItem>
                    <SelectItem value="1">1%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-gray-100 p-4 border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                <Label>Price Range</Label>
                <div className="flex space-x-4 mt-2">
                  <Input className="bg-white border-2 border-black" placeholder="Min Price" />
                  <Input className="bg-white border-2 border-black" placeholder="Max Price" />
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button 
                className="flex-1 bg-gray-200 text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1"
                onClick={() => setShowLiquidityDetails(false)}
              >
                Back
              </Button>
              <Button 
                className="flex-1 bg-[#39FF14] text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1"
              >
                Confirm
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )

  const DashboardView = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        <Card className="col-span-2 bg-white border-2 border-black shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Portfolio Value</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#39FF14" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-2 border-black shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Crypto Tokens</h3>
            <div className="space-y-4">
              {cryptoTokens.map((token) => (
                <div key={token.symbol} className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{token.name} ({token.symbol})</p>
                    <p className="text-sm text-gray-600">Balance: {token.balance}</p>
                  </div>
                  <p className="font-bold">${token.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-2 border-black shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Scheduled Operations</h3>
            <div className="space-y-4">
              {scheduledOperations.map((operation) => (
                <div key={operation.id} className="bg-gray-100 p-4 border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                  <p className="font-bold">{operation.type}</p>
                  <p className="text-sm">{operation.description}</p>
                  {operation.nextExecution && (
                    <p className="text-sm text-gray-600">Next: {operation.nextExecution}</p>
                  )}
                  {operation.condition && (
                    <p className="text-sm text-gray-600">Condition: {operation.condition}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-100 border-b-2 border-black">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-[#39FF14] rounded-full shadow-[0_0_10px_#39FF14] flex items-center justify-center">
            <span className="font-bold text-black text-xl">SD</span>
          </div>
          <span className="font-bold text-2xl">SkeuoDEX</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            className={`bg-white text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1 ${activeView === 'swap' || activeView === 'liquidity' ? 'bg-[#39FF14]' : ''}`}
            onClick={() => setActiveView('swap')}
          >
            Trade
          </Button>
          <Button 
            className={`bg-white text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1 ${activeView === 'dashboard' ? 'bg-[#39FF14]' : ''}`}
            onClick={() => setActiveView('dashboard')}
          >
            Dashboard
          </Button>
          <Button className="bg-[#39FF14] text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1">
            <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
          </Button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          {activeView === 'dashboard' ? (
            <DashboardView />
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Swap/Liquidity Switch */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-200 p-1 rounded-full">
                  <Button
                    variant={activeView === 'swap' ? 'default' : 'ghost'}
                    onClick={() => setActiveView('swap')}
                    className={`rounded-full px-6 py-2 ${activeView === 'swap' ? 'bg-[#39FF14] text-black shadow-[0_4px_0_rgba(0,0,0,1)]' : 'text-gray-600'}`}
                  >
                    Swap
                  </Button>
                  <Button
                    variant={activeView === 'liquidity' ? 'default' : 'ghost'}
                    onClick={() => setActiveView('liquidity')}
                    className={`rounded-full px-6 py-2 ${activeView === 'liquidity' ? 'bg-[#39FF14] text-black shadow-[0_4px_0_rgba(0,0,0,1)]' : 'text-gray-600'}`}
                  >
                    Liquidity
                  </Button>
                </div>
              </div>

              {/* Render active view */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeView === 'swap' ? <SwapView /> : <LiquidityView />}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* AI Assistant Panel */}
        <AnimatePresence>
          <motion.div 
            className="w-96 bg-gray-100 overflow-hidden border-l-2 border-black flex flex-col"
            initial={{ width: "60px" }}
            animate={{ width: isAssistantExpanded ? "384px" : "60px" }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 50 }}
          >
            <Button 
              variant="ghost" 
              className="absolute top-20 -left-3 transform bg-[#39FF14] text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 z-10"
              onClick={toggleAssistant}
            >
              {isAssistantExpanded ? <ChevronRight /> : <ChevronLeft />}
            </Button>
            
            {!isAssistantExpanded && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-sm font-bold">
                AI Trading Assistant
              </div>
            )}
            
            {isAssistantExpanded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col h-full"
              >
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
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}