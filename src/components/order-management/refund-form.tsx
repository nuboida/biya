"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RefundConfirmationModal } from "./refund-confirmation-modal";
import { convertKoboToNaira } from "@/lib/utils";

interface RefundFormProps {
  amount: number;
  refund: number;
  paymentRequestId: string;
  orderId: string;
  customerId: string;
  token: string;
  merchantId: string;
}

export const RefundForm = ({
  amount,
  refund,
  paymentRequestId,
  orderId,
  customerId,
  token,
  merchantId
}: RefundFormProps) => {
  const [refundConfirmationModal, setRefundConfirmationModal] = useState(false);
  const [error, setError] = useState("");
  const [refundData, setRefundData] = useState<{
    customerId: string;
    amount: number;
    orderId: string;
    paymentRequestId: string;
    comment: string;
  }>({
    customerId,
    amount: 0,
    orderId,
    paymentRequestId,
    comment: "",
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.name === "amount") {
      setRefundData({ ...refundData, amount: Number(event.target.value) });
      if (refundData.amount > amount) {
        setError("Refund amount should be greater than request amount.");
      } else {
        setError("");
      }
    } else {
      setRefundData({ ...refundData, [event.target.name]: event.target.value });
    }
  };

  return (
    <>
      {refundConfirmationModal && (
        <RefundConfirmationModal
          onClose={() => setRefundConfirmationModal(false)}
          refund={refundData}
          token={token}
          merchantId={merchantId}
        />
      )}
      <div className="w-3/4 flex flex-col gap-6 bg-white py-10 px-36">
        <div>Initial Amount</div>
        <div className="text-lg leading-5.6 ease-soft block w-full appearance-none rounded-sm border border-solid border-gray-300 bg-slate-400 bg-clip-padding px-3 2xl:py-3 lg:py-2 font-bold text-gray-700">
          &#8358; {convertKoboToNaira(amount - refund)}
        </div>
        <Input
          placeholder="Enter amount to be refunded"
          className="mt-5"
          name="amount"
          onChange={handleInputChange}
        />
        <textarea
          rows={5}
          className="w-full border border-solid border-gray-300 mt-5 px-3 2xl:py-3 lg:py-2 resize-none"
          placeholder="Comment"
          name="comment"
          onChange={handleInputChange}
        ></textarea>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <Button
            size="lg"
            onClick={() => {
              setRefundConfirmationModal(true);
            }}
            disabled={!!error}
          >
            Refund
          </Button>
        </div>
      </div>
    </>
  );
};
