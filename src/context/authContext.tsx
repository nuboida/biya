"use client";

import auth from "@/helpers/auth.helper";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState, createContext } from "react";


const AuthContext = createContext({
  user: null,
  userToken: ''
})

interface Props {
  children: ReactNode
}

const AuthGuard = ({children}: Props) => {
  const router = useRouter();
  const [userToken, setUserToken] = useState('')
  const user = auth.isAuthenticated();

  useEffect(() => {
    if(!user) {
      router.push("/auth/login");
    }

    if(user) {
      const token = user.data['authToken'];
      if(token) {
        if(jwtDecode(token).exp! < Date.now() / 1000) {
          sessionStorage.clear()
          router.push("/auth/login");
        } else {
          setUserToken(token);
        }
      } else {
        router.push('/auth/login')
      }
    }
  }, [user, router]);


  return (
    <AuthContext.Provider value={{
      user,
      userToken
    }}>
      <>
        { children }
      </>
    </AuthContext.Provider>
  )
}

export {AuthGuard}
export default AuthContext;
