import React, { ChangeEvent,  useState } from "react";
import toast from "./ui/toast";
import { Modal } from "./ui/modal";
import { Input } from "./ui/input";
import { Dropdown } from "./ui/dropdown";


interface ValidateBankModalProps {
  onClose: () => void;
  banks: {code: string; name: string}[];
  token: string;
  merchantId: string;
}

interface BankValidationRequest {
  country: string;
  type: string;
  account_number: string;
  bvn: string;
  bank_code: string;
  first_name: string;
  last_name: string;
}

const validateBank = async (token: string, merchantId: string, request: BankValidationRequest) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/validate-bank`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(request)
    })
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

const ValidateBankModal: React.FC<ValidateBankModalProps> = ({onClose, token, merchantId, banks}) => {
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBankCredential({...bankCredentials, [event.target.name]: event.target.value})
  }

  const handleDropdown = (event: ChangeEvent<HTMLSelectElement>) => {
    setBankCredential({...bankCredentials, bank_code: event.target.value});
  }

  const handleSubmit = () => {
    setIsLoading(true);
    validateBank(token, merchantId, bankCredentials).then((res) => {
      if ('error' in res) {
        toast({
          message: res.error,
          type: "error"
        })
        setIsLoading(false);
        onClose()
      } else {
        toast({
          message: res.message,
          type: "success"
        })
        setIsLoading(false);
        onClose();
      }
    })
  }


  return (
    <>
      <Modal
        title="Enter Bank Details"
        action={() => handleSubmit()}
        actionName="Submit"
        onModalClose={() => onClose()}
        isLoading={isLoading}
      >
        <div className="px-28 mt-6">
          <Input name="account_number" placeholder="Account Number" onChange={handleInputChange} className="mb-3" />
          <Input name="bvn" placeholder="BVN" onChange={handleInputChange} className="mb-3" />
          <Dropdown name="bank_code" className="mb-3" options={banks.map((bank) => ({
            label: bank.name,
            value: bank.code
          }))} onChange={handleDropdown} defaultValue={Number(bankCredentials.bank_code)}  />
          <Input name="first_name" placeholder="First Name" onChange={handleInputChange} className="mb-3" />
          <Input name="last_name" placeholder="Last Name" onChange={handleInputChange} className="mb-3" />
        </div>

      </Modal>
    </>
  )
}

export default ValidateBankModal
