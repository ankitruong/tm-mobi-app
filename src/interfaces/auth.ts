export type AuthError = {
  message: string;
  code?: number;
  status?: number;
};

export type AuthResponse<T> = {
  data: T | null;
  error: AuthError | null;
};

export type ChangePasswordRequest = {
  password: string;
  otp: string;
};
