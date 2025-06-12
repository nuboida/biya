"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { VendorWithdrawalModal } from "./vendor-withdrawal-modal";
import { Vendor } from "@/app/(main)/wallet/models";
import { Icons } from "../ui/Icons";


interface VendorWithdrawalButtonProps {
  vendors: Vendor[];
  merchantId: string;
  token: string;
}

export const VendorWithdrawalButton = ({ vendors, token, merchantId }: VendorWithdrawalButtonProps) => {
  const [vendorWithdrawModal, setVendorWithdrawModal] = useState(false);
  return (
    <>
    { vendorWithdrawModal && <VendorWithdrawalModal onClose={() => setVendorWithdrawModal(false)} vendors={vendors} token={token} merchantId={merchantId} /> }
      <div>
        <Button
          size="default"
          className="bg-accent flex items-center gap-1 text-white hover:bg-accent/70"
          onClick={() => {
            setVendorWithdrawModal(true)
          }}
        >
          <span className="inline-block">Pay vendor</span>
          <Icons.arrowRight />
        </Button>
      </div>
    </>
  );
};
