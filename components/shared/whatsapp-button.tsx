"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ whatsappNumber }: { whatsappNumber: string }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const message = encodeURIComponent(
    "Hi ReemDigiTech, I'd like to learn more about your services."
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform group-hover:scale-105">
        <MessageCircle className="h-7 w-7" fill="white" />
      </span>
      <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap rounded-lg bg-ink-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
