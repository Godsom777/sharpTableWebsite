import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getAppSupabaseClient, isAppSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isConfigured: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  sendPasswordRecovery: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const client = getAppSupabaseClient();
    if (!client) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    client.auth.getSession().then(({ data }) => {
      if (!isMounted) {
        return;
      }

      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
      setUser(nextSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    const client = getAppSupabaseClient();
    if (!client) {
      return { error: 'Authentication is not configured.' };
    }

    const { error } = await client.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    const client = getAppSupabaseClient();
    if (!client) {
      return;
    }

    await client.auth.signOut();
  }, []);

  const sendPasswordRecovery = useCallback(async (email: string) => {
    const client = getAppSupabaseClient();
    if (!client) {
      return { error: 'Authentication is not configured.' };
    }

    const redirectTo = `${window.location.origin}/account/reset-password`;
    const { error } = await client.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo,
    });

    return { error: error?.message ?? null };
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      session,
      user,
      isLoading,
      isConfigured: isAppSupabaseConfigured(),
      signInWithPassword,
      signOut,
      sendPasswordRecovery,
    }),
    [isLoading, sendPasswordRecovery, session, signInWithPassword, signOut, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
