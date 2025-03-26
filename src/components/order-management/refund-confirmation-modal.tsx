"use client";

import { useState } from "react";
import { InfoModal } from "../ui/info-modal";
import toast from "../ui/toast";
import { redirect } from "next/navigation";

interface RefundConfirmationModalProps {
  onClose: () => void;
  token: string;
  merchantId: string;
  refund: {
    customerId: string;
    amount: number;
    orderId: string;
    paymentRequestId: string;
    comment: string;
  };
}

const refundCustomerRequest = async (
  token: string,
  merchantId: string,
  request: {
    customerId: string;
    amount: number;
    orderId: string;
    paymentRequestId: string;
    comment: string;
  }
) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/refund`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const RefundConfirmationModal = ({
  onClose,
  refund,
  token,
  merchantId,
}: RefundConfirmationModalProps) => {
  console.log(refund);
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    setIsLoading(true);

    refundCustomerRequest(token, merchantId, refund).then((res) => {
      if ("error" in res) {
        toast({
          message: res.error,
          type: "error",
        });
        setIsLoading(false);
        onClose();
      } else {
        toast({
          message: res.message,
          type: "success",
        });
        setIsLoading(false);
        redirect("/order-management");
      }
    });
  };

  return (
    <InfoModal
      title=""
      onModalClose={() => onClose()}
      action={onSubmit}
      actionName="Refund"
      isLoading={isLoading}
    >
      <div>
        <h1 className="text-2xl">
          Are you sure you want to refund &#8358;{refund.amount}?
        </h1>
      </div>
    </InfoModal>
  );
};
