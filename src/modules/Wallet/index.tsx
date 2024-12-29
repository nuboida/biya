import React, { useContext, useEffect, useState } from "react";
import { ErrorResponse, PaymentRequestsResponse, WalletBalanceResponse, WalletTransactions } from "./wallet.models";
import { getPaymentRequests, getWalletBalance, getWalletTransactions } from "./wallet.api";
import AuthContext from "@/context/authContext";
import ToastContext from "@/context/toastContext";
import { format } from "date-fns";
import auth from "@/helpers/auth.helper";
import Pagination from "@/components/Pagination";
import { convertKoboToNaira } from "@/helpers/convert.helper";

const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransactions[]>([])
  const {userId, merchantId} = useContext(AuthContext);
  const toast = useContext(ToastContext);
  const token = auth.isAuthenticated();
  const [walletTransactionsLoading, setWalletTransactionsLoading] = useState(false);
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequestsResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    getWalletBalance(token, merchantId).then((res: WalletBalanceResponse | ErrorResponse) => {
      if ('error' in res) {
        toast.error(res.error);
        setWalletBalance(0);
      } else {
        setWalletBalance(res.balance);
      }
    });

    getWalletTransactions(token, merchantId, currentPage).then((res: WalletTransactions[] | ErrorResponse) => {
      setWalletTransactionsLoading(true);
      if ('error' in res) {
        toast.error(res.error);
        setWalletTransactionsLoading(false);
      } else {
        setWalletTransactions(res);
        setWalletTransactionsLoading(false);
      }
    });

    getPaymentRequests(token, merchantId).then((res: PaymentRequestsResponse[] | ErrorResponse) => {
      if ('error' in res) {
        toast.error(res.error);
      } else {
        setPaymentRequests(res);
      }
    })
  }, [toast, currentPage]);

  return (
    <div>
      <div className="dashboard rounded border border-stroke bg-primary px-5 pb-5 pt-7 mb-5">
        <div className="flex flex-col flex-wrap items-start justify-between gap-3 pl-8 pb-12">
          <h6 className="text-white text-l font-Roobert font-thin tracking-[4px]">WALLET BALANCE</h6>
          <h1 className="text-white text-5xl font-extrabold"><span className="pr-2">&#x20A6;</span>{typeof walletBalance !== 'number' ? '--' : convertKoboToNaira(walletBalance)}</h1>
        </div>
      </div>

      <div className="border">
        <table className="w-full border-collapse border-spacing-0">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="text-left px-6 py-5">Reference</th>
              <th className="text-center px-6 py-5">Transaction Type</th>
              <th className="text-left px-6 py-5">Amount</th>
              <th className="text-center px-6 py-5">Date</th>
            </tr>
          </thead>
          <tbody>
            {
              walletTransactions.map((data, i) => (
              <tr key={`tableData${i}`} className={`${i%2==1 ? 'bg-sky-50': ''}`}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-left flex items-center"><a className="text-blue cursor-pointer">{data.reference}</a></td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center capitalize">{((data.transactionType).replace(/([a-z0-9])([A-Z])/g, '$1 $2'))}</td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-left"><span className="pr-2">&#x20A6;</span><span className={String(data.difference).includes("-") ? "text-red" : "text-green"}>{String(data.difference).includes("-") ? convertKoboToNaira(Number(String(data.difference).replace("-", ""))) : convertKoboToNaira(data.difference)}</span></td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center">{format(data.createdAt, 'dd/MM/yyyy')}</td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} updatePage={(page: number) => setCurrentPage(page)}/>
    </div>
  )
}

export default Wallet;
