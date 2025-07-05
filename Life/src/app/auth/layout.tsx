'use client';

import React from 'react';
import { AuthProvider } from '../../frontend/context/AuthContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
} 