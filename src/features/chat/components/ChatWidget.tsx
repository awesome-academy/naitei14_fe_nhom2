import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import {
  Message,
  ChatUser,
  MessageType,
  MessagePayload,
  MessageResponse,
} from "../types/chat";
import { User } from "@/types/user";
import { ChatBubble } from "./ChatBubble";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { UserSidebar } from "./UserSidebar";
import { cn } from "@/lib/utils";

interface ChatWidgetProps {
  user: User | null;
  serverUrl?: string;
}

const socketServerURL =
  import.meta.env.VITE_SOCKET_IO_SERVER_URL || "http://localhost:4000";

export default function ChatWidget({
  user,
  serverUrl = socketServerURL,
}: ChatWidgetProps) {
  const isAdmin = user?.role === "admin";

  // States
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Record<string, Message[]>>(
    {}
  );
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});
  const [isConnected, setIsConnected] = useState(false);
  const [usersOnline, setUsersOnline] = useState<ChatUser[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [selectedUserId, setSelectedUserId] = useState<string>();
  const [activeChatUsers, setActiveChatUsers] = useState<Set<string>>(
    new Set()
  );

  // Refs
  const socketRef = useRef<Socket | null>(null);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Kết nối Socket.io
  useEffect(() => {
    if (!user) return;

    const socket = io(serverUrl, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    // Khi kết nối thành công
    socket.on("connect", () => {
      console.log("Connected to chat server");
      setIsConnected(true);

      // Gửi thông tin user để join
      socket.emit("user join", {
        userId: user.id,
        username: user.fullName,
        role: user.role,
      });
    });

    // Khi mất kết nối
    socket.on("disconnect", () => {
      console.log("Disconnected from chat server");
      setIsConnected(false);
    });

    // Nhận chat history đã được filter từ server
    socket.on("chat history", (history: Message[]) => {
      console.log("Received chat history:", history.length, "messages");

      if (isAdmin) {
        // Admin: Tổ chức messages theo conversation với từng user
        const organizedConversations: Record<string, Message[]> = {};

        history.forEach((message) => {
          let conversationKey: string;

          // Message từ admin
          if (message.userId === user.id) {
            conversationKey = (message as any).targetUserId || "unknown";
          }
          // Message từ user gửi cho admin
          else {
            conversationKey = message.userId;
          }

          if (!organizedConversations[conversationKey]) {
            organizedConversations[conversationKey] = [];
          }
          organizedConversations[conversationKey].push(message);

          // Track users đã chat
          if (message.userId !== user.id && message.userId !== "admin") {
            setActiveChatUsers((prev) => new Set([...prev, message.userId]));
          }
        });

        setConversations(organizedConversations);
      } else {
        setConversations({ admin: history });
      }
    });

    // Nhận message mới
    socket.on("new message", (message: Message) => {
      console.log("New message received:", message);

      // Track user đã gửi message
      if (message.userId !== user.id && message.userId !== "admin") {
        setActiveChatUsers((prev) => new Set([...prev, message.userId]));
      }

      // Xác định conversation key
      let conversationKey: string;

      if (isAdmin) {
        // Admin: Phân loại theo userId hoặc targetUserId
        conversationKey =
          message.userId === user.id
            ? (message as any).targetUserId || "unknown"
            : message.userId;
      } else {
        // User: Tất cả vào conversation "admin"
        conversationKey = "admin";
      }

      // Thêm message vào conversation
      setConversations((prev) => ({
        ...prev,
        [conversationKey]: [...(prev[conversationKey] || []), message],
      }));

      // Tăng unread count nếu cần
      if (
        !isOpenRef.current ||
        (isAdmin && selectedUserId && conversationKey !== selectedUserId)
      ) {
        setUnreadCounts((prev) => ({
          ...prev,
          [conversationKey]: (prev[conversationKey] || 0) + 1,
        }));
      }
    });

    // Nhận danh sách users online
    socket.on("users online", (users: ChatUser[]) => {
      setUsersOnline(users);
    });

    // Nhận typing status
    socket.on(
      "user typing",
      ({
        userId,
        isTyping,
        targetUserId,
      }: {
        userId: string;
        isTyping: boolean;
        targetUserId?: string;
      }) => {
        let typingKey: string;

        if (isAdmin) {
          // Admin nhận typing từ user
          typingKey = userId;
        } else {
          // User chỉ nhận typing từ admin gửi cho mình
          if (targetUserId === user.id || !targetUserId) {
            typingKey = "admin";
          } else {
            return; // Ignore typing không dành cho user này
          }
        }

        // Cập nhật typing status
        setTypingUsers((prev) => ({
          ...prev,
          [typingKey]: isTyping,
        }));

        // Auto clear typing sau 3s
        if (isTyping) {
          setTimeout(() => {
            setTypingUsers((prev) => ({
              ...prev,
              [typingKey]: false,
            }));
          }, 3000);
        }
      }
    );

    socket.on("error", (error: { message: string }) => {
      console.error("Socket error:", error.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [user, serverUrl, isAdmin]);

  // Gửi message
  const handleSendMessage = (content: string) => {
    if (!socketRef.current || !user) return;

    const payload: MessagePayload & { targetUserId?: string } = {
      content,
      type: MessageType.TEXT,
    };

    if (isAdmin && selectedUserId) {
      payload.targetUserId = selectedUserId;
    }

    // Emit message
    socketRef.current.emit(
      "send message",
      payload,
      (response: MessageResponse) => {
        if (response.status === "error") {
          console.error("Failed to send message:", response.message);
        }
      }
    );

    const newMessage: Message = {
      id: `temp-${Date.now()}`,
      socketId: socketRef.current?.id || "",
      userId: user.id,
      content,
      type: MessageType.TEXT,
      status: "sending" as any,
      timestamp: new Date().toISOString(),
      targetUserId: isAdmin && selectedUserId ? selectedUserId : undefined,
    } as Message;

    setConversations((prev) => {
      const conversationKey =
        isAdmin && selectedUserId ? selectedUserId : "admin";
      return {
        ...prev,
        [conversationKey]: [...(prev[conversationKey] || []), newMessage],
      };
    });
  };

  // Gửi typing status
  const handleTyping = (isTyping: boolean) => {
    if (!socketRef.current) return;

    const payload: any = { isTyping };

    // Admin cần chỉ định target user
    if (isAdmin && selectedUserId) {
      payload.targetUserId = selectedUserId;
    }

    socketRef.current.emit("typing", payload);
  };

  // Chọn user để chat (admin)
  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);

    // Reset unread count cho conversation này
    setUnreadCounts((prev) => ({
      ...prev,
      [userId]: 0,
    }));
  };

  // Mở chat widget
  const handleOpenChat = () => {
    setIsOpen(true);

    if (isAdmin && chatUsers.length > 0) {
      // Admin: Auto-select user đầu tiên nếu chưa chọn
      const firstUserId = selectedUserId || chatUsers[0].userId;
      if (!selectedUserId) {
        setSelectedUserId(firstUserId);
      }

      // Reset unread count
      setUnreadCounts((prev) => ({
        ...prev,
        [firstUserId]: 0,
      }));
    } else if (!isAdmin) {
      // User: Reset unread count của admin
      setUnreadCounts((prev) => ({
        ...prev,
        admin: 0,
      }));
    }
  };

  // Lấy messages của conversation hiện tại
  const filteredMessages =
    isAdmin && selectedUserId
      ? conversations[selectedUserId] || []
      : conversations["admin"] || [];

  // Filter users đã chat
  const chatUsers = usersOnline.filter((user) =>
    activeChatUsers.has(user.userId)
  );

  // Tìm tên user đang được chọn
  const selectedUser = chatUsers.find((u) => u.userId === selectedUserId);
  const selectedUserName = selectedUser?.username;

  if (!user) {
    return null;
  }

  // Tính tổng unread count
  const totalUnreadCount = Object.values(unreadCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  // Lấy typing status của conversation hiện tại
  const currentConversationKey =
    isAdmin && selectedUserId ? selectedUserId : "admin";
  const isCurrentConversationTyping =
    typingUsers[currentConversationKey] || false;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat bubble khi đóng */}
      {!isOpen && (
        <ChatBubble onClick={handleOpenChat} unreadCount={totalUnreadCount} />
      )}

      {/* Chat window khi mở */}
      {isOpen && (
        <div
          className={cn(
            "bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden",
            isAdmin ? "w-[800px] h-[600px]" : "w-[400px] h-[600px]"
          )}
        >
          <div className="flex h-full">
            {/* Sidebar cho admin */}
            {isAdmin && (
              <UserSidebar
                users={chatUsers}
                selectedUserId={selectedUserId}
                onSelectUser={handleSelectUser}
                unreadCounts={unreadCounts}
              />
            )}

            {/* Main chat area */}
            <div className="flex-1 flex flex-col">
              <ChatHeader
                isConnected={isConnected}
                onClose={() => setIsOpen(false)}
                isAdmin={isAdmin}
                selectedUserName={selectedUserName}
              />

              <MessageList
                messages={filteredMessages}
                currentUserId={user.id}
                currentUserName={user.fullName}
                isTyping={isCurrentConversationTyping}
                userRole={user.role}
              />

              <ChatInput
                isConnected={isConnected}
                onSendMessage={handleSendMessage}
                onTyping={handleTyping}
                disabled={isAdmin && !selectedUserId}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
