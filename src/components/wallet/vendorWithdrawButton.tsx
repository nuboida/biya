"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { VendorWithdrawalModal } from "./vendor-withdrawal-modal";
import { Vendor } from "@/app/(main)/wallet/models";


interface VendorWithdrawalButtonProps {
  vendors: Vendor[];
  token: string;
}

export const VendorWithdrawalButton = ({ vendors, token }: VendorWithdrawalButtonProps) => {
  const [vendorWithdrawModal, setVendorWithdrawModal] = useState(false);
  return (
    <>
    { vendorWithdrawModal && <VendorWithdrawalModal onClose={() => setVendorWithdrawModal(false)} vendors={vendors} token={token} /> }
      <div>
        <Button
          size="default"
          className="bg-accent text-white hover:bg-accent/70"
          onClick={() => {
            setVendorWithdrawModal(true)
          }}
        >
          <span className="inline-block">Withdraw to vendor</span>
        </Button>
      </div>
    </>
  );
};
