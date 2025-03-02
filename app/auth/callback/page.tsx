"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Process the OAuth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (!data.session) {
          throw new Error("No session found");
        }
        
        // Check user role to redirect appropriately
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.session.user.id)
          .single();
        
        if (userError) {
          console.error("Error fetching user role:", userError);
          // Default to student dashboard if can't determine role
          router.push('/dashboard/student');
          return;
        }
        
        // Redirect based on role
        if (userData?.role === 'admin') {
          router.push('/dashboard/admin');
        } else {
          router.push('/dashboard/student');
        }
      } catch (err) {
        console.error('Authentication error:', err);
        router.push('/login?error=Authentication%20failed');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="mt-4 text-lg">Completing login...</p>
      </div>
    </div>
  );
}