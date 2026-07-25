import { LoginForm } from "@/components/auth/LoginForm";
import { AuthModal } from "@/components/auth/AuthModal";

export default function LoginModalPage() {
  return (
    <AuthModal>
      <LoginForm />
    </AuthModal>
  );
}
