export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

export interface ChatApiRequest {
  messages: { role: ChatRole; content: string }[];
}

export interface ChatApiResponse {
  reply: string;
}
