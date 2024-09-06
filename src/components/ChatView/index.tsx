'use client'
import { XMTPProvider } from "@xmtp/react-sdk";
import ChatView from "./main";



export default function Chat() {
    return (
        <XMTPProvider>
            <ChatView />
        </XMTPProvider>
    );
}