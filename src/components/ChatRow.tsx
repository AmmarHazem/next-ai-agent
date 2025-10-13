import { FC, useCallback } from "react";
import { ChatModel } from "../../convex/chat";
import { useRouter } from "next/navigation";
import { useNavigationProvider } from "@/context/NavigationProvider";
import { Button } from "./ui/button";
import Link from "next/link";

const ChatRow: FC<ChatRowProps> = ({ chat }) => {
  const router = useRouter();
  const { closeMobileNav } = useNavigationProvider();

  const onClick = useCallback(() => {
    closeMobileNav();
  }, [closeMobileNav]);

  return (
    <Link href={`/dashboard/chats/${chat.id}`} className="cursor-pointer">
      <Button className="w-full justify-start" variant={"ghost"}>
        ChatRow
      </Button>
    </Link>
  );
};

interface ChatRowProps {
  chat: ChatModel;
}

export default ChatRow;
