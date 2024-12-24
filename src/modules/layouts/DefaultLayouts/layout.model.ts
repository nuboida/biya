export interface ErrorResponse {
  error: string;
}

export interface UserResponse {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  merchants: [];
}
