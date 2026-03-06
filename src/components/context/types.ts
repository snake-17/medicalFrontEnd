// src/components/context/types.ts
import { type ReactNode } from "react";

export interface User {
  token: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}
