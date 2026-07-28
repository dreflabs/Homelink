import React from 'react';
import { AuthModalWrapper } from '@/components/shared/AuthModalWrapper';
import { LoginCard } from '@/components/auth/LoginCard';

export default function LoginModal() {
  return (
    <AuthModalWrapper>
      <LoginCard inModal={true} />
    </AuthModalWrapper>
  );
}
