"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Halo! Saya adalah AI Assistant HOMELINK. Ada yang bisa saya bantu terkait properti, investasi, atau analisis pasar hari ini?\n\nCoba tanyakan:\n- `Bagaimana tren harga rumah di Jakarta Selatan?`\n- `Hitung estimasi KPR untuk rumah 1.5 M`\n- `Apa saja faktor penentu nilai properti?`"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `**Analisis Cepat Selesai!** 🚀\n\nBerdasarkan pertanyaan Anda, berikut adalah poin-poin utamanya:\n\n1. **Tren Pasar:** Saat ini menunjukkan tren positif dengan kenaikan stabil.\n2. **Rekomendasi:** Sangat disarankan untuk memantau suku bunga KPR.\n\nContoh perhitungan sederhana:\n\`\`\`javascript\nconst hargaRumah = 1500000000;\nconst dp = hargaRumah * 0.2;\nconsole.log("DP yang disiapkan:", dp);\n\`\`\`\n\nAda hal spesifik lain yang ingin dieksplorasi?`
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMarkdown = (text: string) => {
    let html = text
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-zinc-950 p-4 rounded-lg my-3 overflow-x-auto text-sm border border-zinc-800 shadow-inner text-zinc-300"><code>$2</code></pre>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="text-zinc-300 italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-md text-sm border border-indigo-500/20">$1</code>')
      .replace(/\n/g, '<br />');

    return <div dangerouslySetInnerHTML={{ __html: html }} className="leading-relaxed" />;
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto border-x border-zinc-800/50 bg-black/40 backdrop-blur-sm relative z-10">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <Bot className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="font-semibold text-zinc-100">Smart Assistant</h1>
            <p className="text-xs text-indigo-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              Online & Ready
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 max-w-[85%] ${
              msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
              msg.role === "user" 
                ? "bg-zinc-800 border-zinc-700 text-zinc-300" 
                : "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
            }`}>
              {msg.role === "user" ? <User className="w-5 h-5" /> : <Sparkles className="w-4 h-4" />}
            </div>
            
            <div className={`p-4 rounded-2xl ${
              msg.role === "user"
                ? "bg-indigo-600 text-white rounded-tr-sm shadow-md"
                : "bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 text-zinc-300 rounded-tl-sm shadow-xl"
            }`}>
              {msg.role === "user" ? (
                <div className="whitespace-pre-wrap">{msg.content}</div>
              ) : (
                renderMarkdown(msg.content)
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-4 max-w-[85%] mr-auto">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-tl-sm flex items-center gap-1.5 w-20">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-950/80 backdrop-blur-md border-t border-zinc-800/50">
        <div className="relative max-w-4xl mx-auto flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanyakan sesuatu pada AI..."
            className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-full py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-500"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="absolute right-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white w-10 h-10 transition-all disabled:opacity-50 disabled:bg-zinc-800 flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-center text-[10px] text-zinc-600 mt-3 font-medium">
          AI dapat membuat kesalahan. Harap verifikasi informasi penting.
        </p>
      </div>
    </div>
  );
}
