import type { ChatMessage } from "@/types/chatbot";

interface ChatbotMessageProps {
  message: ChatMessage;
}

export function ChatbotMessage({ message }: ChatbotMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-indigo-500 text-white rounded-br-sm"
            : "bg-ink-100 dark:bg-ink-700 text-ink-900 dark:text-ink-50 rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
