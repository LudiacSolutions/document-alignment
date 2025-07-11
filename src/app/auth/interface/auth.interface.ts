export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface ResetPasswordData {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export interface SignInData {
  email: string;
  password: string;
}