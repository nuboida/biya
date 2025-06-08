"use client"

import React, { ChangeEvent,  useEffect,  useState } from "react";
import { Modal } from "../ui/modal";
import { Input } from "../ui/input";
import { Dropdown } from "../ui/dropdown";
import toast from "../ui/toast";


interface ValidateBankModalProps {
  onClose: () => void;
  token: string;
  vendorId: string;
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

const getBanks = async (token: string) => {
  try {
    const response = await fetch(`/api/banks`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const validateVendorBank = async (token: string, vendorId: string, request: BankValidationRequest) => {
  try {
    const response = await fetch(`/api/merchants/vendor/${vendorId}/validate-bank`, {
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

export const ValidateVendorBankModal: React.FC<ValidateBankModalProps> = ({onClose, token, vendorId}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [bankCredentials, setBankCredential] = useState<BankValidationRequest>({
    country: "NG",
    type: "bank_account",
    account_number: '',
    bvn: '',
    bank_code: '',
    first_name: '',
    last_name: ''
  });
  const [banks, setBanks] = useState<
    { code: string; name: string; slug: string; longCode: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      setIsMounted(true);
    }, []);

  useEffect(() => {
      let ignore = false;

      if (!ignore) {
        getBanks(token).then((res) => {
          setBanks(res.data);
        });
      }

      return () => {
        ignore = true;
      };
    }, [isMounted]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBankCredential({...bankCredentials, [event.target.name]: event.target.value})
  }

  const handleDropdown = (event: ChangeEvent<HTMLSelectElement>) => {
    setBankCredential({...bankCredentials, bank_code: event.target.value});
  }

  const handleSubmit = () => {
    setIsLoading(true);
    setIsLoading(true);
    validateVendorBank(token, vendorId, bankCredentials).then((res) => {
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
          }))} onChange={handleDropdown} defaultValue={bankCredentials.bank_code}  />
          <Input name="first_name" placeholder="First Name" onChange={handleInputChange} className="mb-3" />
          <Input name="last_name" placeholder="Last Name" onChange={handleInputChange} className="mb-3" />
        </div>

      </Modal>
    </>
  )
}


