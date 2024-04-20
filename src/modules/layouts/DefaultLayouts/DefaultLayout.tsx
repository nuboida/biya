import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Toast } from "@/components/Toast";

const DefaultLayout = ({
  children,
}:{
  children: React.ReactNode;
}) => {
  return (
    <>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header />
            <main>
              <div className="relative mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Toast />
                {children}
              </div>
            </main>
          </div>
        </div>
    </>
  )
}

export default DefaultLayout;
