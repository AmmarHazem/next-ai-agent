import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getMessages } from "../../../../../convex/chat";
import ChatInterface from "@/components/ChatInterface";

export default async function ChatPage(props: { params: Promise<{ id: string }> }) {
  const chatId = (await props.params).id;

  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const messages = getMessages({ chatId: chatId });

  return (
    <div className="flex-1 overflow-hidden">
      <ChatInterface chatId={chatId} initialMessages={messages ?? []} />
    </div>
  );
}
