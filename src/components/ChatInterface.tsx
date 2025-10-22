"use client";
import { FC, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { MessageModel } from "../../convex/chat";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronRight } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { ChatRequestBody } from "@/lib/models";

const ChatInterface: FC<ChatInterfaceProps> = ({ chatId, initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamResponse, setStreamResponse] = useState("");
  const [currentTool, setCurrentTool] = useState<{ name: string; input: unknown } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { user } = useUser();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [streamResponse, messages]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const inputValue = input.trim();
      setInput("");
      setStreamResponse("");
      setCurrentTool(null);
      setLoading(true);
      const newMessage: MessageModel = {
        chatId: chatId,
        createdAt: new Date().valueOf(),
        id: new Date().toISOString(),
        text: inputValue,
        userId: user?.id ?? "",
        role: "user",
      };
      setMessages((val) => [...val, newMessage]);
      const payload: ChatRequestBody = {
        chatId: chatId,
        newMessage: newMessage.text,
        messages: messages.map((item) => {
          return { content: item.text, role: item.role };
        }),
      };
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("error");
      }
      if (!response.body) {
        throw new Error("error");
      }
    },
    [chatId, input, messages, user?.id]
  );

  return (
    <main className="flex flex-col h-[calc(100vh-45px)]">
      <section className="flex-1">
        <div>
          {messages.map((msg) => {
            return <div key={msg.id}>{msg.text}</div>;
          })}
          <div ref={messagesEndRef} />
        </div>
      </section>
      <footer className="px-4 py-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <Input
            value={input}
            placeholder="Message AI"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button disabled={loading || !input.trim().length} type="submit">
            <ChevronRight />
          </Button>
        </form>
      </footer>
    </main>
  );
};

interface ChatInterfaceProps {
  chatId: string;
  initialMessages: MessageModel[];
}

export default ChatInterface;
