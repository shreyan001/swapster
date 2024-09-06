'use client'
import React, { useEffect, useState } from 'react';
import { Client, useClient, useConversations, useMessages,useCanMessage } from "@xmtp/react-sdk";
import { useAccount, useWalletClient } from 'wagmi';
import ConnectButton from '../ui/WalletButton';


const PEER_ADDRESS = '0x78160b2c45b0A7FAC6857DC3FED965c4aD55803F';

export default function ChatView() {
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const { client, initialize } = useClient();
    const { address } = useAccount();
    const { data: walletClient } = useWalletClient();
    const { conversations } = useConversations();
    const [peerConversation, setPeerConversation] = useState<any>('');
    const canMessage = useCanMessage();
    const initXmtpWithKeys = async () => {
        if (!address || !walletClient) return;

        try {
            setLoading(true);
            const options = {
                env: 'production' as const,
            };

            let keys = loadKeys(address);
            console.log('Loaded keys:', keys ? 'Found' : 'Not found');

            if (!keys) {
                keys = await generateAndStoreKeys(address, walletClient, options);
            }

            try {
                console.log('Initializing XMTP client...');
                await initialize({ keys: JSON.parse(keys), options });
                console.log('XMTP client initialized successfully');
                setIsConnected(true);
            } catch (error) {
                console.error('Error initializing XMTP with stored keys:', error);
                console.log('Clearing stored keys and regenerating...');
                clearKeys(address);
                keys = await generateAndStoreKeys(address, walletClient, options);
                await initialize({ keys: JSON.parse(keys), options });
                console.log('XMTP client initialized successfully with new keys');
                setIsConnected(true);
            }
        } catch (error) {
            console.error('Error initializing XMTP:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateAndStoreKeys = async (address: string, walletClient: any, options: any) => {
        console.log('Requesting signature for XMTP keys...');
        const keyBundle = await Client.getKeys(walletClient, {
            ...options,
            skipContactPublishing: true,
        });
        console.log('Signature received, key bundle created');
        const keys = JSON.stringify(keyBundle);
        storeKeys(address, keys);
        console.log('New keys stored locally');
        return keys;
    };

    function clearKeys(address: string) {
        localStorage.removeItem(`xmtp-keys-${address}`);
    }

    useEffect(() => {
        if (isConnected && client && conversations.length > 0) {
            const filteredConversations = conversations.filter(
                (conversation) =>
                    conversation?.peerAddress
                        .toLowerCase()
                        .includes(PEER_ADDRESS?.toLowerCase()) &&
                    conversation?.peerAddress !== client?.address
            );
            setPeerConversation(filteredConversations[0] || null);
        }
    }, [isConnected, client, conversations]);

    const [messageHistory, setMessageHistory] = useState<any[]>([]);
    const { messages  } = useMessages(peerConversation ?? null);

    useEffect(() => {
        if (messages.length > 0) {
            setMessageHistory(messages);
            console.log('Chat history loaded:', messages);
        }
    }, [messages]);

    return (
        <div>
            {!address && <ConnectButton />}
            {address && !isConnected && (
                <button onClick={initXmtpWithKeys} disabled={loading}>
                    {loading ? 'Connecting...' : 'Connect to XMTP'}
                </button>
            )}
            {isConnected && <h2>it is connected</h2>}
            {isConnected && peerConversation && (
                <>
                    <h2>Messages with {PEER_ADDRESS}</h2>
                    <ul>
                        {messageHistory.map((msg, index) => (
                            <li key={index}>
                                <strong>{msg.senderAddress === address ? 'You' : 'Peer'}:</strong> {msg.content}
                                <span style={{fontSize: '12px', color: '#999', marginLeft: '10px'}}>
                                    {getRelativeTimeLabel(msg.sent)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {isConnected && !canMessage && (
                <p>Unable to message. Make sure both addresses are on the XMTP network.</p>
            )}
            {isConnected && canMessage && peerConversation && (
                <div>
                    {/* Add your conversation rendering logic here */}
                </div>
            )}
        </div>
    );
}

const getRelativeTimeLabel = (dateString: string) => {
    const diff = new Date().getTime() - new Date(dateString).getTime();
    const diffMinutes = Math.floor(diff / 1000 / 60);
    const diffHours = Math.floor(diff / 1000 / 60 / 60);
    const diffDays = Math.floor(diff / 1000 / 60 / 60 / 24);
    const diffWeeks = Math.floor(diff / 1000 / 60 / 60 / 24 / 7);

    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
};

// Helper functions (implement these based on your storage method)
function loadKeys(address: string): string | null {
    const storedKeys = localStorage.getItem(`xmtp-keys-${address}`);
    return storedKeys ? JSON.parse(storedKeys) : null;
}

function storeKeys(address: string, keys: any) {
    localStorage.setItem(`xmtp-keys-${address}`, JSON.stringify(keys));
}
