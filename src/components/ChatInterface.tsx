import { FC } from "react";
import { MessageModel } from "../../convex/chat";

const ChatInterface: FC<ChatInterfaceProps> = ({ chatId, initialMessages }) => {
  return <div>ChatInterface</div>;
};

interface ChatInterfaceProps {
  chatId: string;
  initialMessages: MessageModel[];
}

export default ChatInterface;
