export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  password: string;
  network: string;
}

export interface LoginState extends LoginRequest {
  error: string;
  redirectToDashboard: boolean;
}

export interface SignupState extends SignupRequest {
  error: string;
  redirectToSignin: boolean
}



export interface ErrorResponse {
  code: number;
  message: string;
}
