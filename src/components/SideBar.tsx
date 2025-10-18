"use client";
import { useNavigationProvider } from "@/context/NavigationProvider";
import { FC, useCallback, useMemo } from "react";
import { DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { createChat, listChats } from "../../convex/chat";
import { useRouter } from "next/navigation";
import ChatRow from "./ChatRow";

const SideBar: FC = () => {
  const { closeMobileNav } = useNavigationProvider();
  const router = useRouter();

  const addNewChat = useCallback(async () => {
    const chatId = createChat({ title: "New Chat" });
    router.push(`/dashboard/chats/${chatId}`);
    closeMobileNav();
  }, [closeMobileNav, router]);

  const chats = useMemo(() => {
    return listChats();
  }, []);

  return (
    <>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="w-full">
            <Button className="w-full" onClick={addNewChat}>
              New Chat <Plus />
            </Button>
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col px-4 py-4 gap-4">
          {chats.map((chat) => {
            return <ChatRow key={chat.id} chat={chat} />;
          })}
        </div>
      </DrawerContent>
    </>
  );
};

export default SideBar;
