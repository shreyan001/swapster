"use client";
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useAccount, useWalletClient, useConfig } from "wagmi";
import { disconnect } from "@wagmi/core";
import FloatingInbox from './FloatingInbox-hooks';
import ConnectButton from '@/components/ui/WalletButton';

const Main = dynamic(() => import('@/components/Main'), { ssr: true });
const Chat = dynamic(() => import('@/components/ChatView'), { ssr: false });

export default function Home() {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  const [loggingOut, setLoggingOut] = useState(false);
  const config = useConfig();

  const handleLogout = async () => {
    setLoggingOut(true);
    await disconnect(config);
    console.log("Logging out...");
    setLoggingOut(false);
  };

  return (
    <>
      {/* {!isConnected ? (
        <ConnectButton />
      ) : (
        <FloatingInbox wallet={walletClient} onLogout={handleLogout} isPWA={true} />
      )} */}
      <Main />
    </>
  );
}