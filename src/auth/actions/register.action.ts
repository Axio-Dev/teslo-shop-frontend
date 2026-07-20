import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse } from '../interfaces/auth.response';

export interface UserRegister {
  email: string;
  password: string;
  first_name: string;
  last_name: string | null;
}

export const registerAction = async ({
  email,
  password,
  first_name,
  last_name,
}: UserRegister): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register/', {
      password,
      email,
      first_name,
      last_name,
    });

    console.log({ data });

    return data;
  } catch (error) {
    throw error;
  }
};
