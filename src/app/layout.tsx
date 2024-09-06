import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { config } from '@/lib/siwe';
import Web3ModalProvider from "@/lib/WalletConnect";



export const metadata: Metadata = {
  title: "Swapster",
  description: "Swap assets effortlessly with just a message."
};


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang="en">
      <Web3ModalProvider initialState={initialState}>
    
      <body className={inter.className}>{children}</body>
     
      </Web3ModalProvider>
    </html>
  );
}
