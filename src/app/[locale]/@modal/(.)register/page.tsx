import React from 'react';
import { AuthModalWrapper } from '@/components/shared/AuthModalWrapper';
import { RegisterCard } from '@/components/auth/RegisterCard';

export default function RegisterModal() {
  return (
    <AuthModalWrapper>
      <RegisterCard inModal={true} />
    </AuthModalWrapper>
  );
}
