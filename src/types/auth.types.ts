// src/types/auth.types.ts

// What we store inside JWT token
export interface IAuthTokenPayload {
  id: string;
  email: string;
}

// Standard API response format
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
}
