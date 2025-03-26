import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().or(z.number()),
  password: z.string()
});

const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  businessName: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
});

const recoverAccountSchema = z.object({
  email: z.string().email()
});

export async function register(prevState: unknown, formData: FormData) {
  const registerData = registerSchema.safeParse(Object.fromEntries(formData));

  if (!registerData.success) {
    return {
      errors: registerData.error.flatten().fieldErrors
    }
  }

  const { firstName, lastName, email, businessName, phone, password } = registerData.data;

  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ firstName, lastName, businessName, email, password, phone })
  });
  if (!response.ok) {
    const { error } = await response.json()
    return error;
  }
  redirect("/register/verify-register")
}

export async function login(prevState: unknown, formData: FormData) {
  const loginData = loginSchema.safeParse(Object.fromEntries(formData));

  if (!loginData.success) {
    return {
      errors: loginData.error.flatten().fieldErrors
    }
  }

  const { email, password } = loginData.data;


  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    const { error } = await response.json()
    return error;
  }
  const { token } = await response.json();
  await createSession(token);
  redirect("/dashboard")
}

export async function recoverAcccount(prevState: unknown, formData: FormData) {
  const recoverAcctData = recoverAccountSchema.safeParse(Object.fromEntries(formData));

  if (!recoverAcctData.success) {
    return {
      errors: recoverAcctData.error.flatten().fieldErrors
    }
  }

  const { email } = recoverAcctData.data;

  const response = await fetch("/api/auth/password-reset-verification", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    const { error } = await response.json();
    return error;
  }

  redirect("/login/forgot-password/recover")
}


export async function logout() {
  await deleteSession();
  redirect("/login")
}
