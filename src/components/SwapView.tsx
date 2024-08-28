import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from 'lucide-react';
import ConfigModal from './ui/configModal';
import Image from 'next/image';
import { formatUnits, parseUnits } from 'viem';
import { useAccount, useBalance, usePublicClient } from 'wagmi';
import { swapTokens } from '@/utils/tradingUtils';

export default function SwapView() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();

  const [slippageAmount, setSlippageAmount] = useState('1.0');
  const [deadlineMinutes, setDeadlineMinutes] = useState('10');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [token0, setToken0] = useState('');
  const [token1, setToken1] = useState('');
  const [token0Amount, setToken0Amount] = useState('');
  const [token1Amount, setToken1Amount] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const formatBalance = (balance: bigint, decimals: number) => {
    return Number(formatUnits(balance, decimals)).toFixed(2);
  };

  const { data: token0Balance } = useBalance({
    address,
    token: token0 === 'ETH' ? undefined : swapTokens.find(t => t.symbol === token0)?.contractAddress as `0x${string}`,
  });

  const { data: token1Balance } = useBalance({
    address,
    token: token1 ? swapTokens.find(t => t.symbol === token1)?.contractAddress as `0x${string}` : undefined,
  });

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

  const handleToken0Select = (value: string) => {
    console.log('Token 0 selected:', value);
    setToken0(value);
  };

  const handleToken1Select = (value: string) => {
    console.log('Token 1 selected:', value);
    setToken1(value);
  };

  const handleMaxToken0 = () => {
    if (token0Balance) {
      setToken0Amount(formatUnits(token0Balance.value, token0Balance.decimals));
    }
  };

  const handleMaxToken1 = () => {
    if (token1Balance) {
      setToken1Amount(formatUnits(token1Balance.value, token1Balance.decimals));
    }
  };

  const handleSlippageChange = (value: string) => {
    setSlippageAmount(value);
  };

  const handleDeadlineChange = (value: string) => {
    setDeadlineMinutes(value);
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

            <ConfigModal 
              isOpen={isConfigModalOpen}
              slippageAmount={slippageAmount}
              deadlineMinutes={deadlineMinutes}
              onSlippageChange={handleSlippageChange}
              onDeadlineChange={handleDeadlineChange}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between">
              <span className="text-gray-600">Sell</span>
              <span>{isConnected && token0Balance ? formatBalance(token0Balance.value, token0Balance.decimals) : '0.00'} {token0 === 'WETH' ? 'ETH' : token0}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="relative w-1/2">
                <Input
                  className="bg-white border-2 border-black text-lg w-full pl-3 pr-10 py-2 shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] focus:shadow-[inset_0_6px_8px_rgba(0,0,0,0.2)] transition-all duration-200"
                  placeholder="0"
                  value={token0Amount}
                  onChange={(e) => setToken0Amount(e.target.value)}
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:text-blue-700 text-xs font-semibold"
                  onClick={handleMaxToken0}
                >
                  MAX
                </button>
              </div>
              <Select onValueChange={handleToken0Select} disabled={!isConnected}>
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
              <span>{isConnected && token1 && token1Balance ? formatBalance(token1Balance.value, token1Balance.decimals) : '0.00'} {token1}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="relative w-1/2">
                <Input
                  className="bg-white border-2 border-black text-lg w-full pl-3 pr-10 py-2 shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] focus:shadow-[inset_0_6px_8px_rgba(0,0,0,0.2)] transition-all duration-200"
                  placeholder="0"
                  value={token1Amount}
                  onChange={(e) => setToken1Amount(e.target.value)}
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:text-blue-700 text-xs font-semibold"
                  onClick={handleMaxToken1}
                >
                  MAX
                </button>
              </div>
              <Select onValueChange={handleToken1Select} disabled={!isConnected}>
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
        <Button 
          className="w-full mt-4 bg-[#39FF14] text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 transform active:translate-y-1"
          disabled={!isConnected}
        >
          {isConnected ? 'Swap' : 'Connect Wallet'}
        </Button>
      </CardContent>
    </Card>
  );
}
