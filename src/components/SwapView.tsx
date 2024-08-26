import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown } from 'lucide-react'

export default function SwapView() {
  return  (
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
}