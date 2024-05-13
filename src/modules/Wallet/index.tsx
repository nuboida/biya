import React, { useContext, useEffect, useState } from "react";
import { WalletBalanceResponse, WalletTransactions, WalletTransactionsResponse } from "./wallet.models";
import { getWalletBalance, getWalletTransactions } from "./wallet.api";
import AuthContext from "@/context/authContext";
import ToastContext from "@/context/toastContext";
import { format } from "date-fns";

const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransactions[]>([]);
  const {userToken} = useContext(AuthContext);
  const toast = useContext(ToastContext);


  useEffect(() => {
    getWalletBalance(userToken).then((data: WalletBalanceResponse) => {
      if(data.code !== 200) {
        toast.error(data.message);
        setWalletBalance(0);
      }
      setWalletBalance(data.data.balance)
    });

    getWalletTransactions(userToken).then((data: WalletTransactionsResponse) => {
      if(data.code !== 200) {
        toast.error(data.message);
      }
      setWalletTransactions(data.data);
    })
  }, [])

  return (
    <div>
      <div className="dashboard rounded border border-stroke bg-primary px-5 pb-5 pt-7 mb-5">
        <div className="flex flex-col flex-wrap items-start justify-between gap-3 pl-8 pb-12">
          <h6 className="text-white text-l font-Roobert font-thin tracking-[4px]">WALLET BALANCE</h6>
          <h1 className="text-white text-5xl font-extrabold"><span className="pr-2">&#x20A6;</span>{walletBalance}</h1>
        </div>
      </div>

      <div className="border">
        <table className="w-full border-collapse border-spacing-0">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="text-left px-6 py-5">Reference</th>
              <th className="text-center px-6 py-5">Type</th>
              <th className="text-center px-6 py-5">Customer Name</th>
              <th className="text-center px-6 py-5">Customer Email</th>
              <th className="text-center px-6 py-5">Date</th>
            </tr>
          </thead>
          <tbody>
            { walletTransactions.map((data, i) => (
              <tr key={`tableData${i}`} className={`${i%2==1 ? 'bg-sky-50': ''}`}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-left flex items-center"><a className="text-blue cursor-pointer">{data.reference}</a></td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center capitalize">{((data.transactionType).replace(/([a-z0-9])([A-Z])/g, '$1 $2'))}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center">{data.customer['name']}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center">{data.customer['email']}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center">{format(data.createdAt, 'dd/MM/yyyy')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Wallet;
