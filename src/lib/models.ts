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

export enum StreamMessageType {
  token = "token",
  error = "error",
  connected = "connected",
  done = "done",
  toolStart = "tool-start",
  toolEnd = "tool-end",
}

export interface BaseStreamMessage {
  type: StreamMessageType;
}

export interface TokenMessage extends BaseStreamMessage {
  type: StreamMessageType.token;
  token: string;
}

export interface ErrorMessage extends BaseStreamMessage {
  type: StreamMessageType.error;
  error: string;
}

export interface ConnectedMessage extends BaseStreamMessage {
  type: StreamMessageType.connected;
  // error: string;
}

export interface DoneMessage extends BaseStreamMessage {
  type: StreamMessageType.done;
}

export interface ToolStartMessage extends BaseStreamMessage {
  type: StreamMessageType.toolStart;
  tool: string;
  input: unknown;
}

export interface ToolEndMessage extends BaseStreamMessage {
  type: StreamMessageType.toolEnd;
  tool: string;
  input: unknown;
}

export type StreamMessage = TokenMessage | ErrorMessage | ConnectedMessage | DoneMessage | ToolStartMessage | ToolEndMessage;

export const SSE_DATA_PREFIX = "data:";
export const SSE_LINE_DELIMETER = "\n\n";
export const SSE_DONE_MESSAGE = "[DONE]";
