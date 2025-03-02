"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ 
  children,
  requireAdmin = false 
}: { 
  children: React.ReactNode,
  requireAdmin?: boolean
}) {
  const { user, appUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (requireAdmin && appUser?.role !== 'admin') {
        router.push('/dashboard'); // Redirect to student dashboard if trying to access admin area
      }
    }
  }, [user, appUser, loading, router, requireAdmin]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user || (requireAdmin && appUser?.role !== 'admin')) {
    return null;
  }

  return <>{children}</>;
}