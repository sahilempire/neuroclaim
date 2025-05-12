import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider: Initializing...');
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      console.log('AuthProvider: Initial session check:', initialSession ? 'Session exists' : 'No session');
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('AuthProvider: Auth state changed:', event, session ? 'Session exists' : 'No session');
      
      if (event === 'SIGNED_IN') {
        // Get the stored redirect URL
        const redirectUrl = localStorage.getItem('redirectAfterAuth');
        if (redirectUrl) {
          localStorage.removeItem('redirectAfterAuth');
          window.location.href = redirectUrl;
        }
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log('AuthProvider: Cleaning up...');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('AuthProvider: Attempting sign in...');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('AuthProvider: Sign in error:', error);
      throw error;
    }
    console.log('AuthProvider: Sign in successful');
  };

  const signUp = async (email: string, password: string) => {
    console.log('AuthProvider: Attempting sign up...');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('AuthProvider: Sign up error:', error);
      throw error;
    }
    console.log('AuthProvider: Sign up successful');
  };

  const signInWithGoogle = async () => {
    console.log('AuthProvider: Attempting Google sign in...');
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/signin`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('AuthProvider: Google sign in error:', error);
        throw error;
      }

      if (data?.url) {
        // Store the current URL to redirect back after auth
        const currentUrl = window.location.href;
        localStorage.setItem('redirectAfterAuth', currentUrl);
        
        // Redirect to Google OAuth
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('AuthProvider: Google sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    console.log('AuthProvider: Attempting sign out...');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local state
      setUser(null);
      setSession(null);
      console.log('AuthProvider: Sign out successful');
    } catch (error) {
      console.error('AuthProvider: Sign out error:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut
  };

  console.log('AuthProvider: Current state:', {
    user: user ? 'Logged in' : 'Not logged in',
    session: session ? 'Active' : 'No session',
    loading
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 