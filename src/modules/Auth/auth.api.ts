import { ErrorResponse, LoginRequest, LoginResponse, SignupRequest, SignupResponse } from "./auth.models";

const login = async (request: LoginRequest): Promise<LoginResponse | ErrorResponse> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    const data: LoginResponse | ErrorResponse | null = await response.json()
    if (!data) throw new Error('Something went wrong');
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
    throw new Error('Something went wrong');
  }
}

const signup = async (request: SignupRequest): Promise<SignupResponse | ErrorResponse> => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    const data: SignupResponse | ErrorResponse | null = await response.json();
    if (!data) throw new Error("Something went wrong");
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('Something went wrong');
  }
}

export {
  login,
  signup
};
