"use client";

import React, { useState } from "react";
import { format } from 'date-fns';
import { WalletTransactions } from "@/modules/Dashboard/dashboard.models";

interface TableProps {
  isLoading: boolean;
  tableData: WalletTransactions[],
  tableHeaders: string[],
  openCloseModal: Function
}

const BiyaTable: React.FC<TableProps> = ({isLoading, tableData, tableHeaders, openCloseModal}) => {
  const [showModal, setShowModal] = useState({
    open: false,
    data: {}
  });

  const handleClick = (data: any) => {
    !showModal.open ? setShowModal({...showModal, open: true, data}) : setShowModal({...showModal, open: false, data: {}});
    openCloseModal(showModal)
  }
  return (
    <div>
      <table className="w-full border-collapse border-spacing-0">
        <thead className="sticky top-0 bg-white">
          <tr>
            {tableHeaders.map((header: string, i: number) => (
              <th key={`header${i}`} className={`px-6 align-middle py-3 text-lg uppercase text-[#97A4AC] whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 ${i > 0 ? 'text-center' : ''}`}>{ header }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { tableData.map((data, i) => (
            <tr key={`tableData${i}`} className={`${i%2==1 ? 'bg-sky-50': ''}`}>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-left flex items-center"><a className="text-blue cursor-pointer" onClick={() => {
                handleClick(data);
              }}>{data.reference}</a></td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center">{data.amount}</td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center">{data.customerId}</td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center">{format(data.createdAt, 'dd/mm/yyyy')}</td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center"><span className={`border-2 ${data.status === 'APPROVED' ?'border-green text-green bg-[#48b2461e]' : (data.status === "DECLINED" ? 'border-red text-red bg-[#ce3f3f1e]' : 'text-amber-400 border-amber-400 bg-amber-100')} font-semibold rounded-2xl p-2`}>{data.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BiyaTable;
