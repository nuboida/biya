"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { DashboardLayoutProps, ErrorResponse, MerchantPaymentRequest, MerchantPaymentResponse, WalletResponse, WalletTransactions, PaymentRequestsResponse } from "./dashboard.models";
import { BiyaInput } from "@/components/BiyaInput";
import { BiyaButton } from "@/components/BiyaButton";
import AuthContext from "@/context/authContext";
import { getBanks, getMerchantAccounts, getPaymentRequests, getWalletBalance, merchantRequestPayment } from "./dashboard.api";
import ToastContext from "@/context/toastContext";
import { BiyaIcon } from "@/components/Icon";
import { RefundCustomerModal } from "../Dashboard/RefundCustomerModal";
import { format } from "date-fns";
import { TableRowModal } from "./TableRowData";
import auth from "@/helpers/auth.helper";
import { convertKoboToNaira } from "@/helpers/convert.helper";
import { WithdrawalModal } from "./WithdrawalModal";

const Dashboard = ({name: string}: DashboardLayoutProps) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequestsResponse[]>([]);
  const [walletTransactionLoading, setWalletTransactionLoading] = useState(false);
  const [tableRowData, setShowTableRowData] = useState({
    open: false,
    data: {}
  });
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const toast = useContext(ToastContext)
  const {merchantId} = useContext(AuthContext);
  const [paymentCredentials, setPaymentCredentials] = useState<MerchantPaymentRequest>({
    customerId: '',
    amount: 0,
    orderId: '',
  });
  const [refundCredentials, setRefundCredentials] = useState<MerchantPaymentRequest>({
    customerId: '',
    amount: 0,
    orderId: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const tableHeaders = ["Batch Reference", "Amount", "Customer", "Employee", "Status", "Date", "Refunded", " "];
  const token = auth.isAuthenticated();
  const [merchantAccounts, setMerchantAccounts] = useState<{_id: string, accountNumber: string, bankCode: string}[]>([]);
  const [banks, setBanks] = useState<{bankCode: string, bankName: string}[]>([]);

  useEffect(() => {
    getWalletBalance(token,merchantId).then((res: WalletResponse | ErrorResponse) => {
      if ('error' in res) {
        toast.error(res.error);
        setWalletBalance(0);
      } else {
        setWalletBalance(res.balance)
      }
    });

    getPaymentRequests(token, merchantId).then((res: PaymentRequestsResponse[] | ErrorResponse) => {
      setWalletTransactionLoading(true);
      if('error' in res) {
        toast.error(res.error);
        setWalletTransactionLoading(false);
      } else {
        setPaymentRequests(res);
        setWalletTransactionLoading(false);
      }
    });

    getBanks(token).then((res) => {
      if ('error' in res) {
        toast.error(res.error)
      } else {
        const bankValues = res.data.map((bank: any) => {
          return {
            bankCode: bank.code,
            bankName: bank.name
          }
        });
        setBanks(bankValues);
      }
    })

    getMerchantAccounts(token, merchantId).then((res) => {
      if ('error' in res) {
        toast.error(res.error);
      } else {
        setMerchantAccounts(res.accounts);
      }
    });

  }, [toast]);

  const handleClickTableItem = (data: any) => {
    !tableRowData.open  ? setShowTableRowData({...tableRowData, open: true, data}) : setShowTableRowData({...tableRowData, open: false, data: {}});
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentCredentials({...paymentCredentials, [event.target.name]: event.target.value})
  }

  const handleMerchantPayment = () => {
    setIsLoading(true);
    merchantRequestPayment(paymentCredentials, token, merchantId).then((res: MerchantPaymentResponse | ErrorResponse) => {
     if ('error' in res) {
      toast.error(res.error);
      setIsLoading(false);
     } else {
      toast.success(res.message);
      setIsLoading(false);
     }
    });
  }

  return (
    <>
    {tableRowData.open &&  <TableRowModal onClose={() => setShowTableRowData({...tableRowData, open: false})} rowData={tableRowData.data} />}
    {showRefundModal && <RefundCustomerModal onClose={() => setShowRefundModal(false)} orderId={refundCredentials.orderId} customer={refundCredentials.customerId} amount={refundCredentials.amount} />}
    {showWithdrawModal && <WithdrawalModal onClose={() => setShowWithdrawModal(false)} banks={banks} accounts={merchantAccounts} />}
    <div className="mt-4 grid grid-cols-12 grid-rows gap-4">

      {/* Item 1 */}

      <div className=" flex justify-between items-center dashboard lg:col-span-7 row-span-1 rounded border border-stroke bg-primary px-5 pb-5 pt-7 2xl:col-span-8">
        <div className="flex flex-col flex-wrap items-start justify-between gap-3 pl-8 pb-8">
          <h6 className="text-white text-l font-Roobert font-thin tracking-[4px]">WALLET BALANCE</h6>
          <h1 className="text-white text-5xl font-extrabold"><span className="pr-2">&#x20A6;</span>{typeof walletBalance !== 'number' ? '--' : convertKoboToNaira(walletBalance)}</h1>
        </div>
        <div>
          <BiyaButton label="withdraw" primary={false} onClick={() => setShowWithdrawModal(true)} />
        </div>
      </div>

      {/* Item 2 */}
      <div className="lg:col-span-5 2xl:col-span-4 rounded border border-stroke bg-white p-7 row-span-2 shadow-default border-black border-1">
        <div className="mb-4 justify-between gap-4">
          <div>
            <h4 className="text-xl font-semibold text-black pb-5">
              Merchant Request Payment
            </h4>
          </div>
          <div className="flex flex-col">
            <BiyaInput name='customerId' label='Customer ID' onChange={handleChange}/>
            <BiyaInput name='amount' label='Amount' onChange={handleChange}/>
            <BiyaInput name='orderId' label='Order ID' onChange={handleChange}/>
          </div>
          <div className="mt-6 flex justify-end">
            <BiyaButton loading={isLoading} label="Submit" onClick={() => handleMerchantPayment()}/>
        </div>
        </div>
      </div>

      {/* Item 3 */}
      <div className="lg:col-span-7 2xl:col-span-8 rounded border border-stroke bg-white pb-7 px-2 row-span-4 shadow-default border-black border-1 overflow-scroll">
       { (!paymentRequests || paymentRequests.length === 0)  ? <div className="p-10">
          <h6 className="mb-3 font-bold">Recent Transactions</h6>
          <div className="flex items-center">
            <BiyaIcon name="info"/>
            <p className="pl-2">You have not intiated any Wallet Transactions. Recent Wallet Transactions will appear here.</p>
          </div>
        </div>
        :
        <div className="h-96">
          <table className="w-full border-collapse border-spacing-0">
            <thead className="sticky top-0 bg-white">
              <tr>
                {tableHeaders.map((header: string, i: number) => (
                  <th key={`header${i}`} className={`px-3 align-middle py-10 text-m uppercase text-[#97A4AC] whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 ${i > 0 ? 'text-center' : ''}`}>{ header }</th>
                ))}
              </tr>
            </thead>
            <tbody>
              { paymentRequests.map((data, i) => (
                <tr key={data.reference} className={`${i%2==1 ? 'bg-sky-50': ''}`}>
                  <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-left flex items-center"><a className="text-blue cursor-pointer" onClick={() => {
                    handleClickTableItem(data);
                  }}>{data.reference}</a></td>
                  <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-7 text-center"><span className="pr-2">&#x20A6;</span>{(data.amount).toLocaleString()}</td>
                  <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-7 text-center">{data.customerId}</td>
                  <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-7 text-center">{!data.requestBy?.id ? ' ' : `${data.requestBy?.firstName} ${data.requestBy?.lastName}`}</td>
                  <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-7 text-center"><span className={`border-2 ${data.status === 'APPROVED' ?'border-green text-green bg-[#48b2461e]' : (data.status === "DECLINED" ? 'border-red text-red bg-[#ce3f3f1e]' : 'text-amber-400 border-amber-400 bg-amber-100')} font-semibold rounded-2xl p-2`}>{data.status}</span></td>
                  <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-7 text-center">{format(data.createdAt, 'dd/MM/yyyy')}</td>
                  <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-7 text-center"><span className="pr-2">&#x20A6;</span>{data.refund}</td>
                  <td>
                    {
                      data.status === 'APPROVED' && !data.refund && (<BiyaButton label="refund" onClick={() => {
                        setRefundCredentials({
                          orderId: data.orderId,
                          customerId: data.customerId,
                          amount: data.amount
                        });
                        setShowRefundModal(true)
                      }}/>)
                    }
                    {
                      (!!data.refund) && (data.refund > 0) && (data.refund < data.amount) &&
                      (
                        <div className="text-blue">
                          Partly Refunded
                        </div>
                      )
                    }
                    {
                      data.refund === data.amount && (
                        <div className="text-green">
                          Refunded
                        </div>
                      )
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }

      </div>
    </div>
    </>
  )
}

export default Dashboard;
