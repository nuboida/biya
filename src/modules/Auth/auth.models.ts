import {string, object, ObjectSchema} from 'yup';

export interface LoginRequest {
  email: string;
  password: string;
}

export const LoginSchema = object().shape({
  email: string().email('Please enter a valid email').required('Email is required.'),
  password: string().required('Password is required.')
});



export interface UserData {
  id: string;
  email: string;
  name: string;
  phone: string;
  verifyEmail: boolean;
  authToken: string;
}
export interface LoginResponse {
  status: string;
  message: string;
  code: number;
  data: UserData
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

export const signUpSchema = object().shape({
  firstName: string().required('First name is required.'),
  lastName: string().required('Last name is required.'),
  businessName: string().required('Business name is required.'),
  email: string().email('Please enter a valid email').required('Email is required.'),
  phone: string().matches(/^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/, 'Please enter a valid nigerian phone number'),
  password: string()
    .required('Password is required.')
    .min(8, 'Password should have at lease 8 characters.')
    .matches(
    /^(?=.*?\d)(?=.*?[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|} \\~])/,
      'Password must include at least one digit and one special character'
    )
})


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
