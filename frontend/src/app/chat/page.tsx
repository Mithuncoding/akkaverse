import type { Metadata } from "next";

import { ChatView } from "@/components/chat/chat-view";

export const metadata: Metadata = {
  title: "Kannada AI Assistant",
  description:
    "Ask anything about Karnataka's history, temples, festivals, food, and the " +
    "Kannada language — in English or Kannada, with voice input and read-aloud.",
};

export default function ChatPage() {
  return <ChatView />;
}
