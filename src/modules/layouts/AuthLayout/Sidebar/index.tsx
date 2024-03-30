"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside
      className="absolute left-0 top-0 z-9999 flex h-screen w-4/12 flex-col overflow-y-hidden bg-black lg:static"
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
      <div className="text-white flex flex-col justify-between items-center pl-14 py-20 h-[90%]">
        <div>
          <h1 className="text-5xl font-semibold mb-10 w-[80%] lg:text-3xl">
            Automate your recharges with ease.
          </h1>
          <p className="font-thin">
            This is a block of subtext giving a little more information about Biya NG
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="h-20 w-[90%] mb-5 bg-slate-600 rounded">

          </div>
          <div className="h-20 w-[90%] bg-slate-600 rounded">

          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar;
