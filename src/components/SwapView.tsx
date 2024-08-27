import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Settings } from 'lucide-react';
import ConfigModal from './ui/configModal';
import Image from 'next/image';

export const swapTokens = [
  {
    image: '/usdc.png',
    name: 'USDC',
    symbol: 'USDC',
    contractAddress: '0x6aF43d3a396F82AFe4A92Af3C3cd29fD8175A9b5'
  },
  {
    image: '/vercel.svg',
    name: 'WETH',
    symbol: 'WETH',
    contractAddress: '0x8C06764aAc796b73F565174E9aedCf3Bb069637e'
  },
  {
    image: '/usdt.png',
    name: 'Tether',
    symbol: 'USDT',
    contractAddress: '0x370d193b6dAdef06E522680aa0063E66e104Fe49'
  },
  {
    image: '/wbtc.png',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    contractAddress: '0xE6131D4d41F77F642e5c95ebC7026f62D04Fa9B7'
  },
];

export default function SwapView() {
  const [slippageAmount, setSlippageAmount] = useState('1.0');
  const [deadlineMinutes, setDeadlineMinutes] = useState('10');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [token0, setToken0] = useState(null);
  const [token1, setToken1] = useState(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsConfigModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToken0Select = (value:any) => {
    setToken0(value);
  };

  const handleToken1Select = (value:any) => {
    setToken1(value);
  };

  return (
    <Card className="bg-white border-2 border-black shadow-[0_10px_20px_rgba(0,0,0,0.1)] max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Swap</h2>
          <div className="relative" ref={modalRef}>
            <button className="text-gray-600 hover:text-black"
              onClick={() => setIsConfigModalOpen(!isConfigModalOpen)}
            >
              <Settings className="h-5 w-5" />
            </button>

            <ConfigModal isOpen={isConfigModalOpen} />
          </div>
        </div>
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
              <Select onValueChange={handleToken0Select}>
                <SelectTrigger className="w-[120px] bg-white border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  {swapTokens.map((token) => (
                    <SelectItem key={token.contractAddress} value={token.symbol}>
                      <div className="flex items-center">
                        <Image src={token.image} alt={token.name} width={16} height={16} className="mr-2" />
                        {token.symbol}
                      </div>
                    </SelectItem>
                  ))}
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
              <Select onValueChange={handleToken1Select}>
                <SelectTrigger className="w-[120px] bg-white border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  {swapTokens.map((token) => (
                    <SelectItem key={token.contractAddress} value={token.symbol} disabled={token.symbol === token0}>
                      <div className="flex items-center">
                        <Image src={token.image} alt={token.name} width={16} height={16} className="mr-2" />
                        {token.symbol}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Button className="w-full mt-4 bg-[#39FF14] text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1">
          Swap
        </Button>
      </CardContent>
    </Card>
  );
}
