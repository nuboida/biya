"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { DashboardLayoutProps, MerchantPaymentRequest, MerchantPaymentResponse, WalletResponse, WalletTransactions, WalletTransactionsResponse } from "./dashboard.models";
import { BiyaInput } from "@/components/BiyaInput";
import { BiyaButton } from "@/components/BiyaButton";
import AuthContext from "@/context/authContext";
import { getWalletBalance, getWalletTransactions, merchantRequestPayment } from "./dashboard.api";
import ToastContext from "@/context/toastContext";
import { BiyaIcon } from "@/components/Icon";
import { RefundCustomerModal } from "./RefundCustomerModal";
import { format } from "date-fns";
import { TableRowModal } from "./TableRowData";

const Dashboard = ({name: string}: DashboardLayoutProps) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransactions[]>([]);
  const [walletTransactionLoading, setWalletTransactionLoading] = useState(false);
  const [tableRowData, setShowTableRowData] = useState({
    open: false,
    data: {}
  });
  const [showRefundModal, setShowRefundModal] = useState(false);
  const toast = useContext(ToastContext)
  const {userToken} = useContext(AuthContext);
  const [paymentCredentials, setPaymentCredentials] = useState<MerchantPaymentRequest>({
    customerId: '',
    amount: 0,
    orderId: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const tableHeaders = ["Batch Reference", "Amount", "Customer", "Date", "Status"];

  useEffect(() => {
    getWalletBalance(userToken).then((data: WalletResponse) => {
      if (data.code !== 200) {
        toast.error(data.message);
        setWalletBalance(0);
      }
      setWalletBalance(data.data.balance)
    });

    getWalletTransactions(userToken).then((data: WalletTransactionsResponse) => {
      setWalletTransactionLoading(true);
      if(data.code !== 200) {
        toast.error(data.message);
        setWalletTransactionLoading(false);
      }
      setWalletTransactions(data.data);
      setWalletTransactionLoading(false);
    })
  }, []);

  const handleClickTableItem = (data: any) => {
    !tableRowData.open  ? setShowTableRowData({...tableRowData, open: true, data}) : setShowTableRowData({...tableRowData, open: false, data: {}});
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentCredentials({...paymentCredentials, [event.target.name]: event.target.value})
  }

  const handleMerchantPayment = () => {
    setIsLoading(true);
    merchantRequestPayment(paymentCredentials, userToken).then((data: MerchantPaymentResponse) => {
      if(!data) {
        toast.error("Something went wrong, Please try again later");
        setIsLoading(false);
      } else if(data.status === 'error') {
        toast.error(data.message);
        setPaymentCredentials({...paymentCredentials});
        setError(data.message);
        setIsLoading(false);
      } else {
        setError('');
        setPaymentCredentials({
          customerId: '',
          amount: 0,
          orderId: '',
        });
        setIsLoading(false);
      }
    });
  }

  return (
    <>
    {tableRowData.open &&  <TableRowModal onClose={() => setShowTableRowData({...tableRowData, open: false})} rowData={tableRowData.data} />}
    {showRefundModal && <RefundCustomerModal onClose={() => setShowRefundModal(false)} />}
    <div className="mt-4 grid grid-cols-12 grid-rows gap-4">

      {/* Item 1 */}

      <div className="dashboard lg:col-span-7 row-span-1 rounded border border-stroke bg-primary px-5 pb-5 pt-7 2xl:col-span-8">
        <div className="flex flex-col flex-wrap items-start justify-between gap-3 pl-8 pb-12">
          <h6 className="text-white text-l font-Roobert font-thin tracking-[4px]">WALLET BALANCE</h6>
          <h1 className="text-white text-5xl font-extrabold"><span className="pr-2">&#x20A6;</span>{walletBalance}</h1>
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
       { (!walletTransactions || walletTransactions.length === 0)  ? <div className="p-10">
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
                  <th key={`header${i}`} className={`px-6 align-middle py-10 text-lg uppercase text-[#97A4AC] whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 ${i > 0 ? 'text-center' : ''}`}>{ header }</th>
                ))}
              </tr>
            </thead>
            <tbody>
              { walletTransactions.map((data, i) => (
                <tr key={`tableData${i}`} className={`${i%2==1 ? 'bg-sky-50': ''}`}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-left flex items-center"><a className="text-blue cursor-pointer" onClick={() => {
                    handleClickTableItem(data);
                  }}>{data.reference}</a></td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center"><span className="pr-2">&#x20A6;</span>{(data.amount).toLocaleString()}</td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center">{data.customerId}</td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center">{format(data.createdAt, 'dd/MM/yyyy')}</td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center"><span className={`border-2 ${data.status === 'APPROVED' ?'border-green text-green bg-[#48b2461e]' : (data.status === "DECLINED" ? 'border-red text-red bg-[#ce3f3f1e]' : 'text-amber-400 border-amber-400 bg-amber-100')} font-semibold rounded-2xl p-2`}>{data.status}</span></td>
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
