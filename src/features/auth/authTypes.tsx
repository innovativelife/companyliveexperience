import { User } from "firebase/auth";

export interface AuthType {
  user: User | null; // Firebase User object or null if logged out
  employeeUID: string | null;
  tenantId: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserType {
  employeeUID: string | null;
  tenantId: string | null;
  isLoading: boolean;
  error: string | null;
}
