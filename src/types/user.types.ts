// src/types/user.types.ts

// Data we store in MongoDB (user document)

// Data we return in API response
export interface IUserResponse {
  id: string;
  name: string;
  email: string;
}

// Signup request body
export interface IUserSignupRequest {
  name: string;
  email: string;
  password: string;
}

// Login request body
export interface IUserLoginRequest {
  email: string;
  password: string;
}
