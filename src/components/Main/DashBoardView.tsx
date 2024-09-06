"use client"
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { portfolioData, cryptoTokens, scheduledOperations } from '@/utils/tradingUtils'
import Image from 'next/image'

export default function DashboardView() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">DeFi Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-2 md:col-span-1 bg-white border-2 border-black shadow-[0_10px_20px_rgba(0,0,0,0.1)] rounded-lg p-6">
          <CardContent className="p-6 bg-[#39FF14] text-black rounded-lg shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-bold mb-4">User Balance</h3>
            <p className="text-3xl font-bold mb-2">100 ETH</p>
            <p className="text-gray-600 mb-2">Rise: +5%</p>
            <p className="text-gray-600 mb-2">Growth: +10%</p>
            <p className="text-gray-600">Portfolio Value: $200,000</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1 bg-white border-2 border-black shadow-[0_10px_20px_rgba(0,0,0,0.1)] rounded-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Portfolio Value</h3>
            <div className="h-48">
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
        <Card className="col-span-2 md:col-span-1 bg-white border-2 border-black shadow-[0_10px_20px_rgba(0,0,0,0.1)] rounded-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Crypto Tokens</h3>
            <div className="space-y-4">
              {cryptoTokens.map((token) => (
                <div key={token.symbol} className="flex justify-between items-center bg-gray-100 p-4 border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] rounded-lg w-full">
                  <div className="flex items-center">
                    <div className="border-2 border-[#39FF14] rounded-full p-1">
                      <Image height={32} width={32} src={token.image} alt={token.name} className="w-8 h-8" />
                    </div>
                    <div className="ml-4">
                      <p className="font-bold">{token.name} ({token.symbol})</p>
                      <p className="text-sm text-gray-600">Balance: {token.balance}</p>
                    </div>
                  </div>
                  <p className="font-bold text-[#39FF14]">${token.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1 bg-white border-2 border-black shadow-[0_10px_20px_rgba(0,0,0,0.1)] rounded-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Scheduled Operations</h3>
            <div className="space-y-4">
              {scheduledOperations.map((operation) => (
                <div key={operation.id} className="bg-gray-100 p-4 border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] rounded-lg w-full">
                  <p className="font-bold text-[#39FF14]">{operation.type}</p>
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
}
