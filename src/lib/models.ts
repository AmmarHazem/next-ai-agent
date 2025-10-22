export type Role = "user" | "assistant";

export interface ChatRequestMessageBody {
  role: Role;
  content: string;
}

export interface ChatRequestBody {
  chatId: string;
  newMessage: string;
  messages: ChatRequestMessageBody[];
}
