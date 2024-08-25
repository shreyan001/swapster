import React from 'react'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'



export default function Navbar({ activeView, setActiveView } : any) {
  return (
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
  )
}