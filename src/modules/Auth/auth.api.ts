import { LoginRequest, SignupRequest } from "./auth.models";

const login = async (request: LoginRequest) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const signup = async (request: SignupRequest) => {
  try {
    const response = await fetch('/api/auth/', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export {
  login,
  signup
};
