import type { User } from '@/interfaces/user.interface';

// Login, Register, CheckStatus
export interface AuthResponse {
  user: User;
  refresh: string;
  token: string;
}
