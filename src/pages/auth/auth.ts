import { signIn, signOut, useSession } from 'next-auth/react';

interface Auth {
  user: any | null; // Adjust the type of 'user' according to your user model
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export function useAuth(): Auth {
  const { data: session, status } = useSession();

  return {
    user: session?.user || null,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    signIn,
    signOut,
  };
}
