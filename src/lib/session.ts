"use server"

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

interface UserSession {
  _id: string;
  merchantId: string;
  role: string;
  set: boolean;
  sub: string;
  iat: number;
  exp: number;
}

export async function createSession(token: string) {
  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: true
  })
}

export async function deleteSession() {
  (await cookies()).delete("session")
}

export async function decrypt(session: string | undefined = '') {
  try {
    const payload = jwtDecode<UserSession>(session);
    return payload;
  } catch (error) {
    if (error instanceof Error) {
      redirect('/login')
    }
  }
}
