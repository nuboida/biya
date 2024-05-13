import React from "react";
import Modal from "@/components/modal";
import { format } from "date-fns";

interface TableRowModalProps {
  onClose: () => void;
  rowData: any;
}

export const TableRowModal: React.FC<TableRowModalProps> = ({onClose, rowData}) => {
  return (
    <Modal
      title={format(rowData.createdAt, 'dd/MM/yyyy')}
      action={() => console.log(" ")}
      actionName="Refund"
      onModalClose={() => onClose()}
      size="large"
    >
      <div className="flex flex-col px-10">
        <div className="flex items-center gap-5 mb-5">
          <h3 className="font-semibold text-xl">Batch Reference: </h3>
          <p>{rowData.reference}</p>
        </div>
        <div className="flex items-center gap-5 mb-5">
          <h3 className="font-semibold text-xl">Order Id: </h3>
          <p>{rowData.orderId}</p>
        </div>
        <div className="flex items-center gap-5 mb-5">
          <h3 className="font-semibold text-xl">Amount: </h3>
          <p>{rowData.amount}</p>
        </div>
        <div className="flex items-center gap-5 mb-5">
          <h3 className="font-semibold text-xl">Customer: </h3>
          <p>{rowData.customerId}</p>
        </div>
        <div className="flex items-center gap-5 mb-5">
          <h3 className="font-semibold text-xl">Status: </h3>
          <p className={`border-2 ${rowData.status === 'APPROVED' ?'border-green text-green bg-[#48b2461e]' : (rowData.status === "DECLINED" ? 'border-red text-red bg-[#ce3f3f1e]' : 'text-amber-400 border-amber-400 bg-amber-100')} font-semibold rounded-2xl p-2`}>{rowData.status}</p>
        </div>
      </div>
    </Modal>
  )
}
