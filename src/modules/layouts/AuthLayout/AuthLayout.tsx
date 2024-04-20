import React from "react";
import Sidebar from "./Sidebar";
import { Toast } from "@/components/Toast";

const AuthLayout = ({
  children,
}:{
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen overflow-hidden max-lg:flex-col">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <main>
          <div className=" relative mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Toast />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AuthLayout;
