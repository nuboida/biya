"use client";

import auth from "@/helpers/auth.helper";
import { UserData } from "@/modules/Auth/auth.models";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState, createContext } from "react";


interface AuthContextModel {
  user: UserData;
  userToken: string;
}

const AuthContext = createContext<AuthContextModel>({
  user: {
    id: "",
    email: "",
    name: "",
    phone: "",
    verifyEmail: false,
    authToken: ""
  },
  userToken: ''
})

interface Props {
  children: ReactNode
}

const AuthGuard = ({children}: Props) => {
  const router = useRouter();
  const [userToken, setUserToken] = useState('')
  const user = auth.isAuthenticated()['data'];

  useEffect(() => {
    if(!user) {
      router.push("/auth/login");
    }

    if(user) {
      const token = user['authToken'];
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
        {userToken ? children : <></>}
      </>
    </AuthContext.Provider>
  )
}

export {AuthGuard}
export default AuthContext;
