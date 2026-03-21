"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { getSupportMessages, sendSupportMessage } from "./support";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { SupportRole } from "@prisma/client";

interface Message {
  id: string;
  role: SupportRole;
  text: string;
  createdAt: string;
}

export const SupportChatClient = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const userAvatar = session?.user?.avatarUrl;

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await getSupportMessages();
        setMessages(data);
      } catch {
        toast.error("Не удалось загрузить сообщения");
      }
    };

    loadMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSend = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const data = await sendSupportMessage(text);

      setMessages((prev) => [...prev, data.userMessage, data.botMessage]);
      setText("");
    } catch {
      toast.error("Ошибка при отправке");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white border rounded-2xl 
      p-4 sm:p-6 
      space-y-4"
    >
      <div className="h-[300px] sm:h-[400px] md:h-[500px] 
        overflow-y-auto space-y-3 border rounded-xl p-3 sm:p-4 bg-gray-50"
      >
        {messages.length === 0 ? (
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            Пока сообщений нет. Напишите в поддержку 👇
          </p>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === "USER";

            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 sm:gap-3 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-white flex items-center justify-center text-xs sm:text-sm font-bold">
                    🤖
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[70%] px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm whitespace-pre-line ${
                    isUser
                      ? "bg-black text-white"
                      : "bg-white border"
                  }`}
                >
                  {msg.text}
                </div>

                {isUser && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border">
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        alt="user avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs sm:text-sm font-bold">
                        U
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}

        <div ref={bottomRef} />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Input
          placeholder="Введите сообщение..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />

        <Button
          className="w-full sm:w-auto"
          onClick={onSend}
          disabled={loading}
        >
          {loading ? "..." : "Отправить"}
        </Button>
      </div>
    </div>
  );
};