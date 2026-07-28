import { getConversations } from "@/actions/messages";
import { ChatInterface } from "@/components/dashboard/chat-interface";
import { auth } from "@/lib/auth";
import { getTranslations } from "next-intl/server";

export default async function MessagesPage() {
  const session = await auth();
  const currentUserId = session?.user?.id || "";
  const initialMessages = await getConversations();
  const t = await getTranslations("BuyerDashboard.messages");

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t("title")}</h1>
      </div>

      <ChatInterface initialMessages={initialMessages as any} currentUserId={currentUserId} />
    </div>
  );
}
