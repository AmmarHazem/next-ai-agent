// import { v } from "convex/values";
// import { mutation } from "./_generated/server";

// export const createChat = mutation({
//   args: {
//     title: v.string(),
//   },
//   async handler(ctx, args_0) {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("No identity");
//     }
//     const chat = await ctx.db.insert("chats", {
//       title: args_0.title,
//       userId: identity.subject,
//       createAt: new Date().valueOf(),
//     });
//     return chat;
//   },
// });

export interface ChatModel {
  title: string;
  id: string;
  messages: MessageModel[];
}

export interface MessageModel {
  chatId: string;
  text: string;
  id: string;
  userId: string;
  createdAt: number;
  role: "user" | "assistant";
}

let chats: ChatModel[] = [
  {
    id: "1",
    title: "Test",
    messages: [
      { chatId: "1", text: "Hello", id: "1", userId: "1", createdAt: Date.now(), role: "user" },
      { chatId: "1", text: "Hi there", id: "2", userId: "2", createdAt: Date.now(), role: "assistant" },
      { chatId: "1", text: "How are you ?", id: "3", userId: "1", createdAt: Date.now(), role: "user" },
      { chatId: "1", text: "I'm fine thank you", id: "4", userId: "2", createdAt: Date.now(), role: "assistant" },
    ],
  },
  { id: "2", title: "Chatting", messages: [] },
];

export const createChat = ({ title }: { title: string }) => {
  const id = new Date().valueOf().toString();
  chats.push({ title, id, messages: [] });
  return id;
};

export const deleteChat = ({ chatId }: { chatId: string }) => {
  chats = chats.filter((item) => item.id !== chatId);
};

export const listChats = () => {
  return chats;
};

export const getMessages = ({ chatId }: { chatId: string }) => {
  return chats.find((chat) => chat.id === chatId)?.messages;
};

export const sendMessage = ({ userId, chatId, content }: { chatId: string; content: string; userId: string }) => {
  const message: MessageModel = {
    id: new Date().toISOString(),
    text: content,
    chatId: chatId,
    userId: userId,
    createdAt: Date.now(),
    role: "user",
  };
  const chat = chats.find((item) => item.id === chatId);
  if (!chat) {
    chats.push({
      id: new Date().toISOString(),
      messages: [message],
      title: "New chat",
    });
  } else {
    chat.messages.push(message);
  }
  return message;
};

export const getLastMessage = ({ chatId }: { chatId: string }) => {
  const chat = chats.find((item) => item.id === chatId);
  if (!chat) return null;
  return chat.messages[chat.messages.length - 1];
};
