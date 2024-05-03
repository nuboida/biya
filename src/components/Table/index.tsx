import React from "react";
import { format } from 'date-fns';
import { WalletTransactions } from "@/modules/Dashboard/dashboard.models";

interface TableProps {
  isLoading: boolean;
  tableData: WalletTransactions[],
  tableHeaders: string[]
}

const BiyaTable: React.FC<TableProps> = ({isLoading, tableData, tableHeaders}) => {
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
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-left flex items-center">{data.reference}</td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center">{data.transactionType}</td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center">{format(data.createdAt, 'dd/mm/yyyy')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BiyaTable;
