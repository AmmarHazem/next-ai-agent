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
}

let chats: ChatModel[] = [
  { id: "1", title: "Test" },
  { id: "2", title: "Chatting" },
];

export const createChat = ({ title }: { title: string }) => {
  const id = new Date().valueOf().toString();
  chats.push({ title, id });
  return id;
};

export const deleteChat = ({ chatId }: { chatId: string }) => {
  chats = chats.filter((item) => item.id !== chatId);
};

export const listChats = () => {
  return chats;
};
