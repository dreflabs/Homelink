import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthModal } from "@/components/auth/AuthModal";

export default function RegisterModalPage() {
  return (
    <AuthModal>
      <RegisterForm />
    </AuthModal>
  );
}
