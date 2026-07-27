import { getUserProfile } from "@/actions/dashboard";
import { AgentProfileForm } from "./AgentProfileForm";

export default async function AgentProfilePage() {
  const user = await getUserProfile();

  const memberSince = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(new Date(user.createdAt));

  return (
    <AgentProfileForm
      initialName={user.name}
      initialEmail={user.email}
      memberSince={memberSince}
    />
  );
}
