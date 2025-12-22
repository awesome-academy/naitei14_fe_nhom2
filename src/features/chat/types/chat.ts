export enum MessageStatus {
  SENDING = "sending",
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
  FAILED = "failed",
}

export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
  SYSTEM = "system",
}

export interface Message {
  id: string;
  socketId: string;
  userId: string;
  username?: string;
  content: string;
  type: MessageType;
  status: MessageStatus;
  timestamp: string;
  isAdmin?: boolean;
}

export interface ChatUser {
  socketId: string;
  userId: string;
  username: string;
  role?: string;
  joinedAt: string;
}

export interface TypingIndicator {
  userId: string;
  username: string;
  isTyping: boolean;
}

export interface ChatState {
  isConnected: boolean;
  messages: Message[];
  users: ChatUser[];
  unreadCount: number;
}

// Utility types
export type MessagePayload = Pick<Message, "content" | "type">;
export type MessageResponse = {
  status: "success" | "error";
  messageId?: string;
  message?: string;
};
