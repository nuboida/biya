"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { PaymentRequestsResponse } from "@/app/(main)/order-management/models";
import { cn, convertKoboToNaira, formatDate } from "@/lib/utils";
import { GetMerchantResponse } from "@/app/(main)/models";
import { Dropdown } from "../ui/dropdown";
import { Icons } from "../ui/Icons";
import toast from "../ui/toast";

interface OrderManagementTableProps {
  token: string;
  merchantId: string;
  role: string;
}

export const getPaymentRequests = async (token: string, merchantId: string, employeeId?: string): Promise<PaymentRequestsResponse[]> => {
  try {
    let response;
    if (!employeeId) {
      response = await fetch(`/api/merchants/${merchantId}/payment-requests?employeeId=`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
    } else {
      response = await fetch(`/api/merchants/${merchantId}/payment-requests?employeeId=${employeeId}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
    }
    return await response.json();
  } catch (err) {
    throw new Error(String(err))
  }
}

export const getMerchant = async (
  token: string,
  merchantId: string
): Promise<GetMerchantResponse> => {
  const response = await fetch(
    `https://merch.biya.com.ng/api/v1/merchants/${merchantId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};


export const OrderManagementTable = ({ token, merchantId, role }: OrderManagementTableProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeOpts, setEmployeeOpts] = useState<{id: string, name: string}[]>([{id: '', name: "All"}]);
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequestsResponse[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let ignore = false;

    getMerchant(token, merchantId).then(res => {
      if (!ignore) {
        const employeesNameAndId = res.employees.map((employee) => {
          return {
            id: employee.id,
            name: `${employee.firstName} ${employee.lastName}`
          }
        });
        setEmployeeOpts([...employeeOpts, ...employeesNameAndId]);
      }
    });

    return () => {
      ignore = true;
    }
  }, [isMounted])

  useEffect(() => {
    let ignore = false;

    getPaymentRequests(token, merchantId, employeeId).then((res) => {
      if (!ignore) {
        setIsLoading(true);
        if ('error' in res) {
          toast({
            message: 'Something went wrong',
            type: 'error'
          })
          setIsLoading(false);
        } else {
          const sortPaymentRequests = res.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setPaymentRequests(sortPaymentRequests);
          setIsLoading(false);
        }
      }
    });

    return () => {
      ignore = true;
    }

  }, [isMounted, employeeId]);


  const handleOptChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEmployeeId(event.target.value);
  }

  return (
    <>
    {
      role === 'Owner' && (
        <div className="w-[20%] px-4 py-2 ml-auto">
          <Dropdown placeholder="All" name="employeeId" defaultValue={employeeId || 0} options={employeeOpts.map((employee) => ({label: employee.name, value: employee.id}))} onChange={handleOptChange} />
        </div>
      )
    }
      <table className="table w-full table-auto border-collapse border-0 text-left align-middle leading-5">
        <thead className="text-xs">
          <tr>
            <th className="w-[50px] tableHeader">#</th>
            <th className="min-w-[50px] tableHeader">Order ID</th>
            <th className="min-w-[50px] tableHeader">Customer ID</th>
            <th className="min-w-[120px] tableHeader">Agent Name</th>
            <th className="min-w-[50px] tableHeader">Amount</th>
            <th className="min-w-[50px] tableHeader">Payout</th>
            <th className="min-w-[50px] tableHeader">Fee</th>
            <th className="min-w-[120px] tableHeader">Order Date</th>
            <th className="tableHeader w-[50px]">Status</th>
            <th className="tableHeader w-[120px]"></th>
          </tr>
        </thead>
        <tbody>
          {
            isLoading && (
              <tr>
                <td>
                  <div className="absolute top-0 bottom-0 right-0 left-0 bg-white opacity-40">
                    <div className="flex justify-center items-center h-full">
                      <Icons.spinner className="w-14 h-14 animate-spin text-blue-800" />
                    </div>
                  </div>
                </td>
              </tr>
            )
          }
          {paymentRequests.map((paymentRequest, i: number) => (
            <tr key={paymentRequest.id}>
              <td className="tableData">{i + 1}</td>
              <td className="tableData">{paymentRequest.orderId}</td>
              <td className="tableData">{paymentRequest.customerId}</td>
              <td className="tableData">{`${paymentRequest.requestBy.firstName} ${paymentRequest.requestBy.lastName}`}</td>
              <td className="tableData">
                &#8358; {convertKoboToNaira(paymentRequest.amount)}
              </td>
              <td className="tableData">
                &#8358;{" "}
                {paymentRequest.payout
                  ? convertKoboToNaira(paymentRequest.payout)
                  : "--"}
              </td>
              <td className="tableData">
                &#8358; {convertKoboToNaira(paymentRequest.charge)}
              </td>
              <td className="tableData">
                {formatDate(paymentRequest.createdAt)}
              </td>
              <td
                className={cn(
                  "tableData font-bold text-nowrap",
                  paymentRequest.status === "APPROVED" && "text-green-500",
                  paymentRequest.status === "DECLINED" && "text-red-500",
                  paymentRequest.status === "PENDING" && "text-yellow-500",
                  paymentRequest.status === "PARTIAL REFUND" && "text-blue-500",
                  paymentRequest.status === "REFUND" && "text-purple-500",
                )}
              >
                {paymentRequest.status === "APPROVED" ? 'PAID' : paymentRequest.status}
              </td>
              <td className="tableData">
                <Link href={`/order-management/${paymentRequest.id}`}>
                  <Button className="bg-gray-400">View</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
