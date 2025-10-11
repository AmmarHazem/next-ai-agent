import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createChat = mutation({
  args: {
    title: v.string(),
  },
  async handler(ctx, args_0) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("No identity");
    }
    const chat = await ctx.db.insert("chats", {
      title: args_0.title,
      userId: identity.subject,
      createAt: new Date().valueOf(),
    });
    return chat;
  },
});
