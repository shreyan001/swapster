import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { portfolioData, cryptoTokens, scheduledOperations } from '@/utils/tradingUtils'




export default function DashboardView() {
  return (
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
}