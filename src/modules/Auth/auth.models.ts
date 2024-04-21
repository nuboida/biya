export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  code: number;
  data: {
    id: string;
    email: string;
    name: string;
    phone: string;
    verifyEmail: boolean;
    authToken: string;
  }
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
