"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "../ui/toast";
import { Icons } from "../ui/Icons";
import { redirect } from "next/navigation";

interface MerchantPaymentRequest {
  customerId: string;
  amount: number;
  orderId: string;
}

interface PaymentRequestFormProps {
  token: string;
  merchantId: string;
}

const merchantRequestPayment = async (
  request: MerchantPaymentRequest,
  token: string,
  merchantId: string
) => {
  try {
    const response = await fetch(
      `/api/merchants/${merchantId}/request-payment`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const PaymentRequestForm = ({
  token,
  merchantId,
}: PaymentRequestFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentRequestData, setPaymentRequestData] =
    useState<MerchantPaymentRequest>({
      customerId: "",
      amount: 0,
      orderId: "",
    });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentRequestData({
      ...paymentRequestData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    setIsLoading(true);

    merchantRequestPayment(paymentRequestData, token, merchantId).then(
      (res) => {
        if ("error" in res) {
          toast({
            message: res.error,
            type: "error",
          });
          setIsLoading(false);
        } else {
          toast({
            message: res.message,
            type: "success",
          });
          setIsLoading(false);
          redirect("/order-management");
        }
      }
    );
  };

  return (
    <>
      <div className="w-3/4 flex flex-col gap-6 bg-white py-10 px-36">
        <Input
          placeholder="Enter CustomerId"
          name="customerId"
          className="mt-5"
          onChange={handleInputChange}
        />
        <Input
          placeholder="Enter amount"
          name="amount"
          className="mt-5"
          onChange={handleInputChange}
        />
        <Input
          placeholder="Enter order Id"
          name="orderId"
          className="mt-5"
          onChange={handleInputChange}
        />

        <div className="mt-6">
          <Button size="lg" disabled={isLoading} onClick={onSubmit}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};
