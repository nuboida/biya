"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BiyaIcon } from "@/components/Icon";
import auth from "@/helpers/auth.helper";
import { usePathname, useRouter } from "next/navigation";

 const menuItems = [
  {
      title: 'Dashboard',
      icon: 'dashboard',
      url: '/'
  },
  {
      title: 'Wallet',
      icon: 'wallet',
      url: '/wallet'
  },
  /* {
      title: 'Batches',
      icon: 'transactions',
      url: '/batches'
  },
  {
      title: 'Transactions',
      icon: 'transactions',
      url: '/transactions'
  }, */
  {
      title: 'Settings',
      icon: 'settings',
      url: '/settings'
  },
  // {
  //     title: 'Biya API',
  //     icon: 'favicon-light',
  //     url: '/api'
  // },
];

const Sidebar = () => {
  const router = useRouter();
  const currentPath = usePathname();
  return (
    <aside
      className="absolute left-0 top-0 z-9999 flex h-screen w-80 flex-col overflow-y-hidden bg-primary lg:static"
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
        <Link href="/">
          <Image
            src={"/images/logo-light.svg"}
            alt="Biya Payments"
            height={0}
            width={0}
            priority
            className="w-[100px] h-[28px]"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between h-[85%]">
        <ul>
          {
            menuItems.map((menuItem, index) => (

              <Link
              href={menuItem.url}
              key={index}
              className={`text-white group relative flex items-center gap-2 rounded-sm py-2 font-medium hover:bg-slate-700 pl-12 my-4 ${menuItem.url === currentPath ? 'bg-slate-500' : ''}`}
              >
                <BiyaIcon name={menuItem.icon} />
                {menuItem.title}
              </Link>
            ))
          }
        </ul>
      <div className="flex items-center pl-[42px]">
        <div className="w-[60px] h-[60px] rounded-full mr-[12px] overflow-hidden bg-white">
        </div>
        <div>
          <h1 className="text-white font-bold mb-2">Chisom Okechukwu</h1>
          <button className="text-white flex items-center text-xs" onClick={() => {
            auth.clearJWT(() => {
              router.push("/auth/login");
            })
          }}>
            <BiyaIcon name="logout" className="pr-3" />
            Logout
          </button>
        </div>
      </div>
      </div>
    </aside>
  )
}

export default Sidebar;
