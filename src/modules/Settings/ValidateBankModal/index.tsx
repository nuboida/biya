import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { BankValidationRequest, ErrorResponse, GeneralResponse } from "../settings.model";
import auth from "@/helpers/auth.helper";
import AuthContext from "@/context/authContext";
import ToastContext from "@/context/toastContext";
import Modal from "@/components/modal";
import { BiyaInput } from "@/components/BiyaInput";
import { Dropdown } from "@/components/dropdown";
import { dropdownOption } from "@/components/models/dropdown.models";
import { validateBank } from "../settings.api";

interface ValidateBankModalProps {
  onClose: () => void;
  banks: dropdownOption[]
}

const ValidateBankModal: React.FC<ValidateBankModalProps> = ({onClose, banks}) => {
  const [bankCredentials, setBankCredential] = useState<BankValidationRequest>({
    country: "NG",
    type: "bank_account",
    account_number: '',
    bvn: '',
    bank_code: '',
    first_name: '',
    last_name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const token = auth.isAuthenticated();
  const {merchantId} = useContext(AuthContext);
  const toast = useContext(ToastContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBankCredential({...bankCredentials, [event.target.name]: event.target.value})
  }

  const handleDropdown = (event: ChangeEvent<HTMLSelectElement>) => {
    setBankCredential({...bankCredentials, bank_code: event.target.value});
  }

  const handleSubmit = () => {
    setIsLoading(true);
    validateBank(token, merchantId, bankCredentials).then((res: GeneralResponse | ErrorResponse) => {
      if ('error' in res) {
        toast.error(res.error);
        setIsLoading(false);
        onClose()
      } else {
        toast.success(res.message);
        setIsLoading(false);
        onClose();
      }
    })
  }


  return (
    <>
      <Modal
        title="Bank Details"
        action={() => handleSubmit()}
        actionName="Submit"
        onModalClose={() => onClose()}
        size="large"
        loading={isLoading}
      >
        <div className="px-28 mt-6">
          <BiyaInput name="account_number" label="Account Number" onChange={handleInputChange} />
          <BiyaInput name="bvn" label="BVN" onChange={handleInputChange} />
          <Dropdown name="bank_code" label="Bank" options={[{label: "Select bank", value: ''},...banks]} onChange={handleDropdown}  />
          <BiyaInput name="first_name" label="First Name" onChange={handleInputChange} />
          <BiyaInput name="last_name" label="Last Name" onChange={handleInputChange} />
        </div>

      </Modal>
    </>
  )
}

export default ValidateBankModal
