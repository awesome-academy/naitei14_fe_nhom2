import { useEffect, useRef } from "react";
import { Message } from "../types/chat";
import { MessageItem } from "./MessageItem";
import { TypingIndicator } from "./TypingIndicator";
import { WelcomeMessage } from "./WelcomeMessage";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  currentUserName: string;
  isTyping: boolean;
  userRole?: string;
}

export const MessageList = ({
  messages,
  currentUserId,
  currentUserName,
  isTyping,
  userRole,
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
    >
      {messages.length === 0 && (
        <WelcomeMessage userName={currentUserName} userRole={userRole} />
      )}

      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isOwnMessage={msg.userId === currentUserId}
        />
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  );
};
