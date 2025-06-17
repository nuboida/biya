"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { AddVendorAccButton } from "./addVendorAccountButton";
import { useState } from "react";
import fallback from "../../../public/bank-building.svg";

interface VendorBankComponentProps {
  bankAccount: {
    accountNumber: string;
    bankCode: string;
    _id: string;
    recipientCode: string;
  } | null;
  token: string;
  banks: { code: string; name: string; slug: string; longCode: string }[];
  vendorId: string;
}

const VendorBankComponent = ({
  bankAccount,
  token,
  banks,
  vendorId,
}: VendorBankComponentProps) => {
  const [imageError, setImageError] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center px-8">
        <h4 className="font-semibold">Account:</h4>
        {!bankAccount ? (
          <AddVendorAccButton token={String(token)} vendorId={vendorId} />
        ) : (
          <div
            className={cn(
              "text-black mb-4 flex items-center border border-blue-500 gap-4 py-4 pl-8 pr-2",
              bankAccount.recipientCode === "" && "border-blue-200"
            )}
          >
            <div className="w-[30px] h-[30px] border relative">
              {banks.map((bank, i) => {
                if (bank.code === bankAccount.bankCode) {
                  return (
                    <div
                      key={bank.longCode + i}
                      className={cn(
                        bankAccount.recipientCode === "" && "opacity-40"
                      )}
                    >
                      <Image
                        src={imageError ? fallback : `/bank-logos/${bank.slug}.png`}
                        alt="bank logo"
                        width={50}
                        height={50}
                        className="w-full h-full"
                        onError={() => {
                          setImageError(true);
                        }}
                      />
                    </div>
                  );
                } else {
                }
              })}
            </div>
            <h1
              className={cn(
                bankAccount.recipientCode === "" && "opacity-40",
                "mr-auto text-lg"
              )}
            >
              {banks.map(
                (bank: {
                  code: string;
                  name: string;
                  slug: string;
                  longCode: string;
                }) => {
                  if (bank.code === bankAccount.bankCode) {
                    return `${bank.name}: ${bankAccount.accountNumber}`;
                  } else {
                    return "";
                  }
                }
              )}
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default VendorBankComponent;
