'use client'
import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import SwapView from '@/components/SwapView'
import LiquidityView from '@/components/LiquidityVIew'
import DashboardView from '@/components/DashBoardView'
import AIAssistant from '@/components/AIAssistant'


export default function Main() {
  const [activeView, setActiveView] = useState<any>('swap')
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans">
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          {activeView === 'dashboard' ? (
            <DashboardView />
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex justify-center mb-6">
                {/* Swap/Liquidity Switch */}
                {/* ... (keep the switch buttons here) */}
              </div>
              {activeView === 'swap' ? <SwapView /> : <LiquidityView />}
            </div>
          )}
        </div>

        <AIAssistant 
          isExpanded={isAssistantExpanded} 
          toggleExpanded={() => setIsAssistantExpanded(!isAssistantExpanded)} 
        />
      </div>
    </div>
  )
}