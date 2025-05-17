"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { redirect, usePathname } from "next/navigation";
import { logout } from "@/action";
import { Icons } from "./ui/Icons";

interface NavigationProps {
  role: string;
  merchant: {
    businessName: string;
    merchantId: string;
    logoUrl: string;
    isMerchantVerified: boolean;
  };
}

type NavigationItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

const navigationalItems = (role: string): NavigationItem[] => {
  if (role === "Owner" || role === "Admin") {
    return [
      {
        title: "Dashboard",
        href: "/dashboard",
      },
      {
        title: "Wallet",
        href: "/wallet",
      },
      {
        title: "User Management",
        href: "/user-management",
      },
      {
        title: "Order Management",
        href: "/order-management",
      },
      {
        title: "Settings",
        href: "/settings",
      },
    ];
  } else {
    return [
      {
        title: "Dashboard",
        href: "/dashboard",
      },
      {
        title: "Order Management",
        href: "/order-management",
      },
    ];
  }
};

export const MainHeader = ({ role, merchant }: NavigationProps) => {
  const path = usePathname();
  return (
    <>
      <header className="fixed overflow-hidden z-20 w-full">
        {!merchant.isMerchantVerified && (
          <div className="relative">
            <div className="flex items-center justify-center bg-red-600 px-[1rem] z-20 gap-3">
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 18C14.1944 18 18 14.1944 18 9.5C18 4.80558 14.1944 1 9.5 1C4.80558 1 1 4.80558 1 9.5C1 14.1944 4.80558 18 9.5 18Z"
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 6.1001V9.5001"
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 12.8999H9.5085"
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl text-white font-bold">
                  Merchant has not been approved. You can send us an email at <span className="text-accent">merchant@biya.com.ng</span>
                </h1>
              </div>
            </div>
          </div>
        )}
        <nav className="border-b-2 bg-white/50 backdrop-blur-2xl flex items-center py-6 px-10 mr-auto">
          <div className="w-full flex items-center justify-between lg:w-auto mr-20">
            <Link href="/">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={150}
                height={30}
                priority
                className="w-[150px] h-[30px]"
              />
            </Link>
          </div>
          <div className="w-full group-data-[state=active]:hfit h-0 lg:w-fit flex-wrap justify-end items-center space-y-8 lg:space-y-0 lg:flex lg:h-fit md:flex-nowrap">
            <div className="mt-6 dark:text-body md:-ml-4 lg:pr-4 lg:mt-0">
              <ul className="space-y-6 tracking-wide text-base lg:text-lg lg:flex lg:space-y-0">
                {navigationalItems(role)?.map((item, i) => (
                  <Link
                    key={i}
                    href={item.disabled ? "/" : item.href}
                    className={clsx(
                      "md:px-4 block",
                      !path.includes(item.href) &&
                        "hover:bg-slate-100 hover:font-semibold"
                    )}
                  >
                    <span
                      className={clsx(
                        path.includes(item.href)
                          ? "bg-primary-200 text-white py-2 px-6 font-semibold"
                          : "transparent",
                        item.disabled && "cursor-not-allowed opacity-50"
                      )}
                    >
                      {item.title}
                    </span>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="border border-slate-400 flex  gap-5 px-6 py-2">
              <div className="border flex justify-center items-center rounded-full w-[30px] h-[30px]">
                {merchant.logoUrl ? (
                  <Image
                    src={merchant.logoUrl || ""}
                    alt="merchant logo"
                    width={100}
                    height={100}
                    className="w-full h-full"
                  />
                ) : (
                  <Icons.briefCase className="w-[20px] h-[20px]" />
                )}
              </div>
              {`${merchant.businessName} - ${merchant.merchantId}`}
            </div>
            <div className="text-accent">
              <button
                className="font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  redirect("/login");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
