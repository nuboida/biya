"use client";

import React, { useContext, useEffect, useState } from "react";
import { DashboardLayoutProps, WalletResponse, WalletTransactions, WalletTransactionsResponse } from "./dashboard.models";
import { BiyaInput } from "@/components/BiyaInput";
import { BiyaButton } from "@/components/BiyaButton";
import { BiyaSelect } from "@/components/BiyaSelect";
import BiyaTable from "@/components/Table";
import AuthContext from "@/context/authContext";
import { getWalletBalance, getWalletTransactions } from "./dashboard.api";
import ToastContext from "@/context/toastContext";
import { BiyaIcon } from "@/components/Icon";

const Dashboard = ({name: string}: DashboardLayoutProps) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransactions[]>([]);
  const [walletTransactionLoading, setWalletTransactionLoading] = useState(false);
  const toast = useContext(ToastContext)
  const {userToken} = useContext(AuthContext);

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

  return (
    <div className="mt-4 grid grid-cols-12 grid-rows-5 gap-4">

      {/* Item 1 */}

      <div className="dashboard lg:col-span-7 rounded border border-stroke bg-primary px-5 pb-5 pt-7 2xl:col-span-8">
        <div className="flex flex-col flex-wrap items-start justify-between gap-3 pl-8 pb-12">
          <h6 className="text-white text-l">Wallet Balance</h6>
          <h1 className="text-white text-5xl font-extrabold"><span className="pr-2">&#x20A6;</span>{walletBalance}</h1>
        </div>
      </div>

      {/* Item 2 */}
      <div className="lg:col-span-5 2xl:col-span-4 rounded border border-stroke bg-white p-7 row-span-2 shadow-default border-black border-1">
        <div className="mb-4 justify-between gap-4">
          <div>
            <h4 className="text-xl font-semibold text-black pb-5">
              Create New Transaction
            </h4>
          </div>
          <div className="flex flex-col">
            <BiyaSelect name="csvSelect" label="Select An Option"/>
          </div>
          <div className="flex flex-col">
            <BiyaInput name="uplodad csv" label="Upload CSV"/>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm underline mb-1 text-primary">Download Sample CSV for Data</p>
              <p className="text-sm underline text-primary">Download Sample CSV for Airtime</p>
            </div>
            <BiyaButton label="Upload Csv"/>
          </div>
        </div>
      </div>

      {/* Item 3 */}
      <div className="lg:col-span-7 2xl:col-span-8 rounded border border-stroke bg-white py-7 px-2 row-span-4 shadow-default border-black border-1">
       { (!walletTransactions || walletTransactions.length === 0)  ? <div className="p-10">
          <h6 className="mb-3 font-bold">Recent Transactions</h6>
          <div className="flex items-center">
            <BiyaIcon name="info"/>
            <p className="pl-2">You have not intiated any Wallet Transactions. Recent Wallet Transactions will appear here.</p>
          </div>
        </div>
        :
        <BiyaTable tableData={walletTransactions} isLoading={walletTransactionLoading} />
      }

      </div>

      {/* Item 4 */}
      <div className="lg:col-span-5 2xl:col-span-4 rounded border border-stroke bg-white p-7 row-span-3 shadow-default border-black border-1">
        <div className="mb-4 justify-between gap-4">
          <div>
            <h4 className="text-xl font-semibold text-black pb-5">
              Single Recharge
            </h4>
          </div>
          <div className="flex flex-col">
            <BiyaInput name="uplodad csv" label="Upload CSV"/>
          </div>
          <div className="flex flex-col">
            <BiyaSelect name="csvSelect" label="Select An Option"/>
          </div>
          <div className="flex flex-col">
            <BiyaInput name="uplodad csv" label="Upload CSV"/>
          </div>
          <div className="flex flex-row-reverse">
            <BiyaButton label="Recharge"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
