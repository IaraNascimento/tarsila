"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../auth/firebase";

interface AuthContextType {
  isAuthenticated: boolean;
  finished: boolean;
  currentUser: User | null;
  currentChatId: string | null;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const provider = new GoogleAuthProvider();

type AuthProviderProps = {
  children: ReactNode;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [finished, setFinished] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  useEffect(() => {
    setFinished(false);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setCurrentChatId(
        String(new Date().getTime())
      );
      setFinished(true);
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    setFinished(false);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {}
  };

  const logOut = async () => {
    setFinished(false);
    try {
      await signOut(auth);
    } catch (error) {}
  };

  const value = {
    isAuthenticated: !!currentUser?.email,
    finished,
    currentUser,
    currentChatId,
    signIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
