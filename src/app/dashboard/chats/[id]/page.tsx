import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getMessages } from "../../../../../convex/chat";

export default async function ChatPage(props: { params: Promise<{ id: string }> }) {
  const chatId = (await props.params).id;

  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const messages = getMessages({ chatId: chatId });

  return <div>Chat Page {chatId}</div>;
}
