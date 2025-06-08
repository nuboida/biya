"use client"

import { useState } from "react";
import { Icons } from "../ui/Icons";
import {ValidateVendorBankModal} from "./validate-vendor-bank-modal";

interface AddVendorAccButtonProps {
  token: string;
  vendorId: string;
}

export const AddVendorAccButton = ({ token, vendorId }: AddVendorAccButtonProps) => {
  const [bankValidationModal, setBankValidationModal] = useState(false);

  return (
    <>
    {
      bankValidationModal && (
        <ValidateVendorBankModal
          onClose={() => setBankValidationModal(false)}
          token={token}
          vendorId={vendorId}
        />
      )
    }
      <div className="text-accent flex gap-2">
        <div>
          <Icons.add />
        </div>
        <button
          className="font-bold"
          onClick={() => {
            setBankValidationModal(true);
          }}
        >
          Add New Account
        </button>
      </div>
    </>
  );
};
