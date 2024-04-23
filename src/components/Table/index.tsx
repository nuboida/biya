import React from "react";

interface TableProps {
  headers: [];
  isLoading: boolean;
}

const tableHeaders = [
  "Batch Reference",
  "Type",
  "Date",
  "Status"
];

const tableData = [
  {
    batchRef: "6344495a8c7c80c4ca397c09",
    type: "Airtime",
    date: "14/10/22",
    status: "Successful"
  },
  {
    batchRef: "6344495a8c7c80c4ca397c09",
    type: "Airtime",
    date: "02/10/22",
    status: "Successful"
  },
  {
    batchRef: "6344495a8c7c80c4ca397c09",
    type: "Data",
    date: "14/10/22",
    status: "Successful"
  },
  {
    batchRef: "6344495a8c7c80c4ca397c09",
    type: "Data",
    date: "14/10/22",
    status: "Unsuccessful"
  },
  {
    batchRef: "6344495a8c7c80c4ca397c09",
    type: "Airtime",
    date: "14/10/22",
    status: "Unsuccessful"
  },
  {
    batchRef: "6344495a8c7c80c4ca397c09",
    type: "Data",
    date: "14/10/22",
    status: "Successful"
  },
];

const BiyaTable: React.FC = () => {
  return (
    <div>
      <table className="w-full border-collapse border-spacing-0">
        <thead className="sticky top-0 bg-white">
          <tr>
            {tableHeaders.map((header, i, arr) => (
              <th key={`header${i}`} className={`px-6 align-middle py-3 text-lg uppercase text-[#97A4AC] whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 ${i > 0 ? 'text-center' : ''}`}>{ header }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { tableData.map((data, i) => (
            <tr key={`tableData${i}`} className={`${i%2!==1 ? 'bg-sky-50': ''}`}>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-left flex items-center">{data.batchRef}</td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center">{data.type}</td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center">{data.date}</td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-7 text-center"><span className={`border-2 ${data.status === 'Successful' ?'border-green text-green bg-[#48b2461e]' : 'border-red text-red bg-[#ce3f3f1e]'} font-semibold rounded-2xl p-2`}>{data.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BiyaTable;
