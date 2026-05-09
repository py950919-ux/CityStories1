import { useLocation } from "wouter";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919352076138";

export function WhatsAppFab() {
  const [location] = useLocation();
  const message = `Hi! I'm exploring CityStories.in and would love to know more.`;
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  if (location.startsWith("/admin") || location.startsWith("/login")) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with CityStories on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-black/20 transition-all hover:scale-105 hover:bg-[#20bd5a] sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden text-sm font-semibold sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
