"use client"

import { useState } from "react";
import { InfoModal } from "./ui/info-modal";
import toast from "./ui/toast";

interface DeleteBankModalProps {
  onClose: () => void;
  token: string;
  merchantId: string;
  id: string;
}

const deleteBankAccount = async (token: string, merchantId: string, id: string) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/${id}/delete-account`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export const DeleteBankAccountModal = ({ onClose, token, merchantId, id }: DeleteBankModalProps) => {
   const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    setIsLoading(true);

    deleteBankAccount(token, merchantId, id).then(res => {
      if ('error' in res) {
        toast({
          message: res.error,
          type: "error"
        });
        setIsLoading(false);
      } else {
        toast({
          message: "Bank account deleted",
          type: "success"
        });
        setIsLoading(false);
        onClose();
      }
    })
  }

  return (
    <>
      <InfoModal title="" onModalClose={() => onClose()} actionName="Delete" action={() => onSubmit()} isLoading={isLoading}>
        <div className="flex justify-center items-center">
          <div className="w-[90px] h-[90px] flex items-center justify-center">
            <svg
              width="91"
              height="91"
              viewBox="0 0 91 91"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_127_41513)">
                <rect
                  x="-37.3711"
                  y="0.689453"
                  width="166.649"
                  height="137.051"
                  fill="#FF5C5C"
                />
                <g clipPath="url(#clip1_127_41513)">
                  <path
                    d="M45.6317 43.0313L54.913 33.75L57.5642 36.4013L48.283 45.6825L57.5642 54.9638L54.913 57.615L45.6317 48.3337L36.3505 57.615L33.6992 54.9638L42.9805 45.6825L33.6992 36.4013L36.3505 33.75L45.6317 43.0313Z"
                    fill="white"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_127_41513">
                  <rect
                    width="90"
                    height="90"
                    fill="white"
                    transform="translate(0.628906 0.689453)"
                  />
                </clipPath>
                <clipPath id="clip1_127_41513">
                  <rect
                    width="45"
                    height="45"
                    fill="white"
                    transform="translate(23.1289 23.1895)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold mb-5">Delete Bank Account</h1>

          <p className="text-sm mt-1">
            Are you sure you want to delete this bank account?
          </p>
        </div>
      </InfoModal>
    </>
  );
};
