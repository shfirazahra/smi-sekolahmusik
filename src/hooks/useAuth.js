import { useCallback, useState } from "react";
import { getSession, logout } from "../services/auth";

export function useAuth() {
  const [session, setSession] = useState(getSession);

  const signIn = useCallback((newSession) => setSession(newSession), []);
  const signOut = useCallback(() => {
    logout();
    setSession(null);
  }, []);

  return { session, signIn, signOut };
}
