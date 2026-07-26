import { getNotificationTemplates } from "@/actions/notification";
import TemplateClient from "./TemplateClient";

export default async function NotificationTemplatesPage() {
  const templates = await getNotificationTemplates();
  
  return <TemplateClient initialTemplates={templates} />;
}
