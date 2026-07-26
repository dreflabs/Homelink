"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, User as UserIcon } from "lucide-react";
import { sendMessage, getConversations } from "@/actions/messages";
import { toast } from "sonner";
import Image from "next/image";

interface ChatUser {
  id: string;
  name: string;
  image: string | null;
}

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  senderId: string;
  receiverId: string;
  sender: ChatUser;
  receiver: ChatUser;
}

export function ChatInterface({ initialMessages, currentUserId }: { initialMessages: any[], currentUserId: string }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic polling for new messages every 5 seconds
    const interval = setInterval(async () => {
      try {
        const fresh = await getConversations();
        setMessages(fresh as any[]);
      } catch (e) {}
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeContactId]);

  // Extract unique contacts from messages
  const contactsMap = new Map<string, ChatUser>();
  messages.forEach(m => {
    if (m.senderId !== currentUserId) contactsMap.set(m.senderId, m.sender);
    if (m.receiverId !== currentUserId) contactsMap.set(m.receiverId, m.receiver);
  });
  const contacts = Array.from(contactsMap.values()).filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If no contact selected but we have contacts, auto-select the first one
  useEffect(() => {
    if (!activeContactId && contacts.length > 0) {
      setActiveContactId(contacts[0].id);
    }
  }, [contacts, activeContactId]);

  const activeMessages = messages.filter(m => 
    (m.senderId === currentUserId && m.receiverId === activeContactId) ||
    (m.receiverId === currentUserId && m.senderId === activeContactId)
  );
  
  const activeContact = contacts.find(c => c.id === activeContactId);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeContactId) return;

    const tempMsg = inputText;
    setInputText("");

    const res = await sendMessage(activeContactId, tempMsg);
    if (res.success && res.message) {
      setMessages(prev => [...prev, res.message as unknown as Message]);
    } else {
      toast.error(res.error || "Gagal mengirim pesan");
      setInputText(tempMsg); // restore
    }
  };

  return (
    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50/50">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 " />
            <Input 
              placeholder="Cari pesan..." 
              className="pl-9 bg-white" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              Belum ada percakapan.
            </div>
          ) : (
            contacts.map(contact => {
              const lastMsg = messages.filter(m => m.senderId === contact.id || m.receiverId === contact.id).pop();
              return (
                <div 
                  key={contact.id}
                  onClick={() => setActiveContactId(contact.id)}
                  className={`p-4 border-b border-gray-100 bg-white cursor-pointer hover:bg-gray-50 transition-colors ${activeContactId === contact.id ? 'border-l-4 border-l-blue-600 bg-blue-50/50 hover:bg-blue-50/50' : 'border-l-4 border-l-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-gray-900 truncate pr-2">{contact.name}</h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{lastMsg?.content}</p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {activeContact ? (
          <>
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center relative">
                {activeContact.image ? (
                  <Image src={activeContact.image} alt={activeContact.name} fill className="object-cover" />
                ) : (
                  <UserIcon className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <h3 className="font-semibold text-lg">{activeContact.name}</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {activeMessages.map((msg, i) => {
                const isMe = msg.senderId === currentUserId;
                return (
                  <div key={msg.id || i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-2xl px-4 py-2 max-w-[80%] ${isMe ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-gray-100 text-gray-900 rounded-tl-sm'}`}>
                      <p>{msg.content}</p>
                      <span className={`text-[10px] mt-1 block ${isMe ? 'text-blue-100 text-right' : 'text-gray-500'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-gray-50/50">
              <div className="flex gap-2">
                <Input 
                  placeholder="Ketik pesan..." 
                  className="flex-1 bg-white" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <Button type="submit" size="icon" disabled={!inputText.trim()}><Send className="w-4 h-4" /></Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Pilih kontak untuk mulai berkirim pesan
          </div>
        )}
      </div>
    </div>
  );
}
