import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Bot, Send, X, ChevronDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type ChatMessage, streamChatResponse } from "@/services/chatService";

let idCounter = 0;
const uid = () => `msg_${++idCounter}_${Date.now()}`;

const SUGGESTED_QUESTIONS = [
  "What are signs of dehydration?",
  "How can I lower blood pressure naturally?",
  "When should I see a doctor for a fever?",
  "What foods boost the immune system?",
];

const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user";
  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser && (
        <div className="flex-shrink-0 size-7 rounded-full bg-primary flex items-center justify-center mt-0.5">
          <Bot className="size-4 text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-primary text-white rounded-tr-sm"
            : "bg-muted text-foreground rounded-tl-sm"
        }`}
      >
        {message.content || (
          <span className="flex gap-1 items-center text-muted-foreground text-xs">
            <span className="animate-bounce [animation-delay:0ms]">●</span>
            <span className="animate-bounce [animation-delay:150ms]">●</span>
            <span className="animate-bounce [animation-delay:300ms]">●</span>
          </span>
        )}
      </div>
    </div>
  );
};

const HealthChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    setError(null);
    const userMsg: ChatMessage = { id: uid(), role: "user", content: trimmed };
    const assistantMsg: ChatMessage = { id: uid(), role: "assistant", content: "" };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setIsStreaming(true);

    const historyForApi = [...messages, userMsg];

    await streamChatResponse(
      historyForApi,
      (delta) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: m.content + delta }
              : m
          )
        );
        if (!isOpen) setHasUnread(true);
      },
      () => setIsStreaming(false),
      (err) => {
        setIsStreaming(false);
        setError(err);
        setMessages((prev) => prev.filter((m) => m.id !== assistantMsg.id));
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open health assistant"
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full border-1 bg-primary shadow-lg hover:bg-primary/90 active:scale-95 duration-150 flex items-center justify-center group"
      >
        {isOpen ? (
          <ChevronDown className="size-6 text-white" />
        ) : (
          <>
            <Icon
              icon="healthicons:health-worker"
              className="size-7 text-white"
            />
            {hasUnread && (
              <span className="absolute top-0.5 right-0.5 size-3 bg-red-500 rounded-full border-2 border-white" />
            )}
          </>
        )}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[22rem] sm:w-[24rem] flex flex-col bg-background border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ maxHeight: "min(600px, calc(100dvh - 8rem))" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-primary px-4 py-3 flex-shrink-0">
          <div className="size-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="size-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight">
              HuzaCare Assistant
            </p>
            <p className="text-white/70 text-xs">AI Health Q&amp;A</p>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="text-white/60 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 duration-100"
                title="Clear chat"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded hover:bg-white/10 duration-100"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {messages.length === 0 ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center text-center pt-2 pb-1 gap-2">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon
                    icon="healthicons:health-worker"
                    className="size-7 text-primary"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">Hi, I'm your health assistant!</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-4">
                    Ask me any health question. I'll always recommend seeing a doctor for serious concerns.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">
                  Suggested questions:
                </p>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="w-full text-left text-xs border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg px-3 py-2 duration-100"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m) => <MessageBubble key={m.id} message={m} />)
          )}

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
              <AlertCircle className="size-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Disclaimer */}
        <div className="px-4 py-1.5 bg-yellow-50 border-t border-yellow-100 flex-shrink-0">
          <p className="text-[10px] text-yellow-700 text-center leading-tight">
            For informational purposes only — not a substitute for professional medical advice.
          </p>
        </div>

        {/* Input area */}
        <div className="flex items-center gap-2 px-3 py-3 border-t bg-background flex-shrink-0">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a health question…"
            disabled={isStreaming}
            className="flex-1 h-9 text-sm !ring-0 border-muted-foreground/30 focus-visible:border-primary rounded-full px-4"
          />
          <Button
            size="sm"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isStreaming}
            className="h-9 w-9 p-0 rounded-full flex-shrink-0"
          >
            {isStreaming ? (
              <span className="size-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default HealthChatBot;
