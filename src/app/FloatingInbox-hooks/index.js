import Home from "./Home";
import { XMTPProvider } from "@xmtp/react-sdk";

export default function FloatingInbox({
  isPWA = false,
  wallet,
  onLogout,
  isContained = true,
  isConsent = false,
}) {
  return (
    <XMTPProvider>
      <Home
        isPWA={isPWA}
        wallet={wallet}
        onLogout={onLogout}
        isConsent={isConsent}
        isContained={isContained}
      />
    </XMTPProvider>
  );
}
