"use client";

import auth from "@/helpers/auth.helper";
import { ErrorResponse } from "@/modules/Auth/auth.models";
import { getEmployee } from "@/modules/Dashboard/dashboard.api";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState, createContext } from "react";


interface AuthContextModel {
  userId: string;
  merchantId: string;
}

interface UserToken {
  _id: string;
  merchantId: string;
}

const AuthContext = createContext<AuthContextModel>({
  userId: '',
  merchantId: '',
})

interface Props {
  children: ReactNode
}

const AuthGuard = ({children}: Props) => {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const token = auth.isAuthenticated();

  useEffect(() => {
    if(!token) {
      router.push("/auth/login");
    }

      if(token) {
        if(jwtDecode(token).exp! < Date.now() / 1000) {
          sessionStorage.clear()
          router.push("/auth/login");
        } else {
          setUserId(jwtDecode<UserToken>(token)._id);
          setMerchantId(jwtDecode<UserToken>(token).merchantId)
        }
      } else {
        router.push('/auth/login')
      }
  }, [token]);


  return (
    <AuthContext.Provider value={{
      userId: userId,
      merchantId: merchantId,
    }}>
      <>
        {userId ? children : <></>}
      </>
    </AuthContext.Provider>
  )
}

export {AuthGuard}
export default AuthContext;
