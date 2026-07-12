import type { ChatMessage } from "@/types/chatbot";

interface ChatbotMessageProps {
  message: ChatMessage;
}

export function ChatbotMessage({ message }: ChatbotMessageProps) {
  const isUser = message.role === "user";

  const renderContent = (content: string) => {
    // If it's a user message, just return raw text so their URLs aren't buttons
    if (isUser) return content;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);

    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block w-full rounded-xl bg-indigo-500 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          >
            Click Here
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-indigo-500 text-white rounded-br-sm"
            : "bg-ink-100 dark:bg-ink-700 text-ink-900 dark:text-ink-50 rounded-bl-sm"
        }`}
      >
        {renderContent(message.content)}
      </div>
    </div>
  );
}
