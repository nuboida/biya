"use client";

import Image from "next/image";
import { Vendor } from "@/app/(main)/wallet/models";
import { InfoModal } from "../ui/info-modal";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import toast from "../ui/toast";
import { Icons } from "../ui/Icons";

interface VendorWithdrawalModalProps {
  onClose: () => void;
  vendors: Vendor[];
  token: string;
  merchantId: string;
}

interface WithdrawFundsRequest {
  amount: number;
  reason: string;
  accountId: string;
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
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const withdrawFunds = async (
  token: string,
  merchantId: string,
  request: WithdrawFundsRequest
) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/withdraw`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getVendor = async (token: string, vendorId: string) => {
  try {
    const response = await fetch(`/api/merchants/vendor/${vendorId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error(String(error));
  }
};

export const VendorWithdrawalModal = ({
  onClose,
  vendors,
  token,
  merchantId,
}: VendorWithdrawalModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [banks, setBanks] = useState<
    { code: string; name: string; longCode: string; slug: string }[]
  >([]);
  const [account, setAccount] = useState<{
    _id: string;
    accountNumber: string;
    bankCode: string;
    recipientCode: string;
    email: string;
  }>({
    _id: "",
    accountNumber: "",
    bankCode: "",
    recipientCode: "",
    email: "",
  });
  const [selectedItem, setSelectedItem] = useState("");
  const [inputData, setInputData] = useState<WithdrawFundsRequest>({
    accountId: "",
    amount: 0,
    reason: "",
  });

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
  }, [isMounted, token]);

  const toggleAccount = (id: string) => {
    setAccount({
      _id: "",
      accountNumber: "",
      bankCode: "",
      recipientCode: "",
      email: "",
    });
    getVendor(token, id).then((res) => {
      setAccount(res.bankAccount);
      setInputData({...inputData, accountId: res.bankAccount._id})
    });
    setSelectedItem(id);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    setIsLoading(true);

    withdrawFunds(token, merchantId, inputData).then((res) => {
      if ("error" in res) {
        toast({
          message: `${res.error}`,
          type: "error",
        });
        setIsLoading(false);
      } else {
        toast({
          message: res.message,
          type: "success",
        });
        setIsLoading(false);
        onClose();
      }
    });
  };

  return (
    <InfoModal
      title="Withdraw to Vendor"
      subtitle="Click the vendor and fill the information below to initiate withdrawal"
      onModalClose={() => onClose()}
      actionName="Withdraw"
      isLoading={isLoading}
      action={() => onSubmit()}
    >
      {vendors.map((vendor: Vendor) => (
        <div
          className="flex flex-col border border-blue-500 p-3"
          key={vendor._id}
        >
          <div
            className="text-black mb-2 flex items-center gap-4 cursor-pointer"
            onClick={() => {
              toggleAccount(vendor._id);
            }}
          >
            <div className="flex items-center gap-5">
              <Icons.store className="text-blue-500"/>
              <h1 className="mr-auto text-lg font-semibold">{vendor.name}</h1>
            </div>
          </div>
          {selectedItem === vendor._id && (
            <>
              {account ? (
                <div className="pb-10">
                  <div className="flex gap-2 text-black m-3 font-semibold">
                    <div className="w-[30px] h-[30px] border">
                      {banks.map((bank, i) => {
                        if (bank.code === account.bankCode) {
                          return (
                            <div key={bank.longCode + i}>
                              <Image
                                src={`/bank-logos/${bank.slug}.png`}
                                alt="bank logo"
                                width={50}
                                height={50}
                                className="w-full h-full"
                              />
                            </div>
                          );
                        } else {
                        }
                      })}
                    </div>
                    <h1 className="mr-auto text-lg">
                      {banks.map((bank) => {
                        if (bank.code === account.bankCode) {
                          return `${bank.name}: ${account.accountNumber}`;
                        } else {
                          return "";
                        }
                      })}
                    </h1>
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Amount"
                      name="amount"
                      onChange={handleChange}
                      disabled={!account._id}
                    />
                    <textarea
                      rows={3}
                      className="w-full text-black border border-solid border-gray-300 mt-5 px-3 2xl:py-3 lg:py-2 resize-none"
                      placeholder="Reason"
                      name="reason"
                      onChange={handleChange}
                      disabled={!account._id}
                    ></textarea>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-xl text-slate-800 px-5 flex items-center gap-5">
                    <span><Icons.searchx className="text-red-500" /></span>
                    Vendor has no acccount registered
                  </h1>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </InfoModal>
  );
};
