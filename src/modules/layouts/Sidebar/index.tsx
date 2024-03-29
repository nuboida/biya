"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BiyaIcon } from "@/components/Icon";

 const menuItems = [
  {
      title: 'Dashboard',
      icon: 'dashboard',
      url: '/dashboard'
  },
  {
      title: 'Wallet',
      icon: 'wallet',
      url: '/wallet'
  },
  {
      title: 'Batches',
      icon: 'transactions',
      url: '/batches'
  },
  {
      title: 'Transactions',
      icon: 'transactions',
      url: '/transactions'
  },
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
  return (
    <aside
      className="absolute left-0 top-0 z-9999 flex h-screen w-80 flex-col overflow-y-hidden bg-black lg:static"
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
        <Link href="/">
          <Image
            src={"/images/logo-light.svg"}
            alt="Biya Payments"
            height={28}
            width={100}
            priority
          />
        </Link>
      </div>
      <div className="">
        <ul className="">
          {
            menuItems.map((menuItem, index) => (

              <Link
              href={menuItem.url}
              key={index}
              className="text-white group relative flex items-center gap-2 rounded-sm py-2 font-medium hover:bg-slate-700 pl-12 my-4"
              >
                <BiyaIcon name={menuItem.icon} />
                {menuItem.title}
              </Link>
            ))
          }
        </ul>
      </div>

    </aside>
  )
}

export default Sidebar;
