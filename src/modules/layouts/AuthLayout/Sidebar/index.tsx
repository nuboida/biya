"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="lg:static w-4/12 max-lg:w-[100vw] max-lg:flex max-lg:justify-center max-lg:items-center">
      <aside
        className="relative left-0 top-0 z-9999 flex h-[93vh] w-full flex-col overflow-y-hidden bg-primary lg:my-7 lg:mx-5 rounded-md max-lg:h-[25vh] max-lg:w-[90vw] max-lg:mt-4"
      >
        <div className="relative h-full">
          <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
            <Link href="/">
              <Image
                src={"/images/logo-light.svg"}
                alt="Biya Payments"
                height={0}
                width={0}
                priority
                className="w-[100px] h-[30px] max-lg:h-[25px] max-lg:w-[70px]"
              />
            </Link>
          </div>
          <div className="text-white flex flex-col py-10 lg:gap-10 lg:pl-10 lg:py-4 2xl:gap-32 2xl:pl-14 2xl:py-10 max-lg:px-10 max-lg:py-2">
            <div>
              <h1 className="font-semibold lg:mb-10 lg:text-4xl 2xl:text-5xl w-[90%] md:text-3xl max-md:mb-6 leading-5">
                Easy Recharges. Anytime. Everywhere.
              </h1>
              <p className="font-thin lg:w-[70%] 2xl:w-[60%] max-md:w-[100%]">
                Biya helps businesses automate airtime and data recharges with ease.
              </p>
            </div>
            <div className="top-[50%] left-10 z-10 flex flex-col h-30 justify-between 2xl:gap-14 lg:gap-10 max-lg:hidden">
              <div className="bg-white text-black rounded p-2 flex items-center text-lg  z-10 lg:w-64 shadow-md">
                <div className="mr-1 h-8 w-8 rounded-full border border-primary flex justify-center items-center shadow-[8px_12px_25px_rgba(0,0,0,0.1)] bg-[rgba(53,61,74,0.1)]">
                  <Image src="/icons/phone-incoming-outgoing.svg" alt="phone" width={16} height={16} className="shadow-[6px_8px_34px_rgba(0,0,0,0.1)]"/>
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    Recharge Data & Airtime Easily
                  </p>
                </div>
              </div>
              <div className="bg-white text-black rounded p-2 flex items-center text-lg z-10 lg:w-56 2xl:w-56 shadow-md">
                <div className="mr-1 h-8 w-8 rounded-full border border-primary flex justify-center items-center shadow-[8px_12px_25px_rgba(0,0,0,0.1)] bg-[rgba(53,61,74,0.1)]">
                  <Image src="/icons/schedule.svg" alt="phone" width={16} height={16} className="shadow-[6px_8px_34px_rgba(0,0,0,0.1)]"/>
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    Schedule Bulk Recharges
                  </p>
                </div>
              </div>
            </div>

        </div>

          <div className="absolute right-0 bottom-0 max-lg:hidden">
            <Image
              src={"/images/woman-looking-up.png"}
              alt="woman looking up"
              width={450}
              height={450}
              sizes="(max-width: 1200px) 450px 450px (max-width: 768px) 300px 300px"
              className="absolute lg:w-[300px] lg:h-[300px] 2xl:w-[450px] 2xl:h-[450px]"
            />
            <Image
              src={"/images/white-washed-background.png"}
              alt="woman looking up"
              width={450}
              height={450}
              className="lg:w-[300px] lg:h-[300px] 2xl:w-[450px] 2xl:h-[450px]"
            />
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar;
