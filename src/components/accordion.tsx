"use client";

import {
  Accordion,
  AccordionItemProps,
  AccordionItem as Item,
} from "@szhsin/react-accordion";
import { Icons } from "./ui/Icons";
import { cn } from "@/lib/utils";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ValidateBankModal from "./validate-bank-modal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "./ui/toast";
import clsx from "clsx";
import Image from "next/image";
import { DeleteBankAccountModal } from "./delete-bank-account-modal";
import { useRouter } from "next/navigation";

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */

interface Account {
  _id: string;
  accountNumber: string;
  bankCode: string;
  recipientCode: string;
}

interface SettingsAccordionProps {
  token: string;
  merchantId: string;
  merchant: {
    businessName: string;
    merchantId: string;
    businessEmail: string;
    logoUrl: string;
  };
}

const changePasswordSubmit = async (
  token: string,
  request: { oldPassword: string; newPassword: string; confirmPassword: string }
) => {
  try {
    const response = await fetch("/api/auth/change-password", {
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

const getMerchantAccounts = async (token: string, merchantId: string) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/get-accounts`, {
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

const uploadMerchantImage = async (
  token: string,
  merchantId: string,
  formData: FormData
) => {
  const response = await fetch(`/api/merchants/${merchantId}/upload`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return await response.json();
};

const AccordionItem = ({ header, ...rest }: AccordionItemProps) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        <Icons.chevronDown
          className={cn(
            "ml-auto transition-transform duration-200 ease-out",
            isEnter && "rotate-180"
          )}
        />
      </>
    )}
    className="mb-10 max-lg:mb-5"
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full px-4 py-7 text-left max-lg:py-3 ${isEnter && "bg-accent text-black/50"}
        ${
          rest.itemKey === "item-1"
            ? "bg-[#17235D] text-white"
            : rest.itemKey === "item-2"
            ? "bg-[#A1D0E6]"
            : rest.itemKey === "item-3"
            ? "bg-[#FFE6DC]"
            : "bg-[#E5E5E5]"
        }
        `,
    }}
    contentProps={{
      className: "transition-height duration-200 ease-out",
    }}
    panelProps={{ className: "p-4" }}
  />
);

export function SettingsAccordion({
  token,
  merchantId,
  merchant,
}: SettingsAccordionProps) {
  const router = useRouter();
  const [deleteBankModal, setDeleteBankModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [banks, setBanks] = useState<
    { code: string; name: string; slug: string; longCode: string }[]
  >([]);
  const [bankValidationModal, setBankValidationModal] = useState(false);
  const [passwordChange, setPasswordChange] = useState<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const fileUpload = useRef<HTMLInputElement>(null);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    setIsImageLoading(true);
    if (!e.currentTarget.files) {
      return;
    }
    if (e.currentTarget.files[0].type !== "image/png") {
      toast({
        message: "Unknown image format",
        type: 'error'
      });
      setIsImageLoading(false)
      throw new Error("Unknown file format")
    }

    if (e.currentTarget.files[0].size > 5000) {
      toast({
        message: "File size too large, File should not be larger than 5mb",
        type: "error"
      })
      setIsImageLoading(false);
      throw new Error("File size too large")
    }

    const formData = new FormData();
    formData.append("logoUrl", e.currentTarget.files[0]);

    uploadMerchantImage(token, merchantId, formData).then((res) => {
      if ("error" in res) {
        toast({
          message: res.error,
          type: "error",
        });
        setIsImageLoading(false);
      } else {
        toast({
          message: res.message,
          type: "success",
        });
        setIsImageLoading(false);
        router.refresh();
      }
    });
  };

  const handleUpload = () => {
    fileUpload.current?.click();
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPasswordChange({
      ...passwordChange,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      getMerchantAccounts(token, merchantId).then((res) => {
        setAccounts(res.accounts);
      });
    }

    if (!ignore) {
      getBanks(token).then((res) => {
        setBanks(res.data);
      });
    }

    return () => {
      ignore = true;
    };
  }, [isMounted, token, merchantId]);

  const submitChangePassword = () => {
    setIsLoading(true);

    changePasswordSubmit(token, passwordChange).then((res) => {
      if ("error" in res) {
        setError(res.error);
        setIsLoading(false);
      } else {
        toast({
          message: res.message,
          type: "success",
        });
        setIsLoading(false);
        setPasswordChange({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    });
  };

  return (
    <>
      {bankValidationModal && (
        <ValidateBankModal
          onClose={() => setBankValidationModal(false)}
          token={token}
          merchantId={merchantId}
          banks={banks}
        />
      )}
      {deleteBankModal && (<DeleteBankAccountModal onClose={() => setDeleteBankModal(false)} token={token} merchantId={merchantId} id={selectedAccount} />)}
      <div className="mx-2 my-4 border-t">
        {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
        <Accordion transition transitionTimeout={200}>
          <AccordionItem
            itemKey="item-1"
            header={
              <div>
                <h1 className="text-2xl font-semibold max-lg:text-sm">Business Information</h1>
              </div>
            }
          >
            <div className="flex gap-16 max-lg:flex-col max-lg:gap-5 max-lg:items-center">
              <div className={cn(
                "w-[264px] h-[264px] border-gray-100 border relative max-lg:w-[132px] max-lg:h-[132px]",
                isImageLoading && "bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex cursor-not-allowed"
                )}>
                {merchant.logoUrl && (
                  <Image
                    src={merchant.logoUrl}
                    alt="Merchant Image"
                    className="min-w-full min-h-full"
                    width={100}
                    height={100}
                  />
                )}
                <input
                  className="hidden"
                  type="file"
                  id="iconUpload"
                  onChange={uploadImage}
                  ref={fileUpload}
                  accept="image/png, image/jpeg"
                />
                <button
                  className={cn(
                    "absolute bottom-0 right-1 p-2 rounded-full border",
                    isImageLoading && 'cursor-not-allowed'
                  )}
                  onClick={() => handleUpload()}
                >
                  <Icons.camera />
                </button>
              </div>
              <div className="grow">
                <div className="flex gap-5 mb-5 max-lg:flex-col">
                  <div className="focus:shadow-soft-primary-outline text-lg leading-5.6 ease-soft block w-full appearance-none rounded-sm border border-solid border-gray-300 bg-white bg-clip-padding px-3 2xl:py-3 lg:py-2 font-bold text-gray-700 transition-all focus:border-black focus:outline-none focus:transition-shadow">
                    {merchant.businessName}
                  </div>
                  <div className="focus:shadow-soft-primary-outline text-lg leading-5.6 ease-soft block w-full appearance-none rounded-sm border border-solid border-gray-300 bg-white bg-clip-padding px-3 2xl:py-3 lg:py-2 font-bold text-gray-700 transition-all focus:border-black focus:outline-none focus:transition-shadow">
                    {merchant.merchantId}
                  </div>
                </div>
                <div className="flex gap-5 mb-5">
                  <div className="focus:shadow-soft-primary-outline text-lg leading-5.6 ease-soft block w-full appearance-none rounded-sm border border-solid border-gray-300 bg-white bg-clip-padding px-3 2xl:py-3 lg:py-2 font-bold text-gray-700 transition-all focus:border-black focus:outline-none focus:transition-shadow">
                    {merchant.businessEmail}
                  </div>
                </div>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            itemKey="item-2"
            header={
              <div>
                <h1 className="text-2xl font-semibold max-lg:text-sm">
                  Password and Security
                </h1>
              </div>
            }
          >
            <div className={clsx(error && "border border-red-500", "px-4")}>
              {typeof error == "string" && (
                <p className="px-1 pb-4 text-red-600 font-semibold">{error}</p>
              )}
              <div className="flex gap-16 max-lg:flex-col">
                <div className="grow">
                  <div className="flex gap-5 mb-5 max-lg:flex-col">
                    <Input
                      type="password"
                      placeholder="Current Password"
                      name="oldPassword"
                      onChange={handlePasswordChange}
                      value={passwordChange.oldPassword}
                    />
                    <Input
                      type="password"
                      placeholder="New Password"
                      name="newPassword"
                      onChange={handlePasswordChange}
                      value={passwordChange.newPassword}
                    />
                  </div>
                  <div className="flex gap-5 mb-5 justify-between max-lg:flex-col">
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      className="w-1/2 max-lg:w-full"
                      onChange={handlePasswordChange}
                      value={passwordChange.confirmPassword}
                    />
                    <div className="w-1/2 flex justify-end max-lg:w-full">
                      <Button
                        className="bg-accent px-10"
                        disabled={isLoading}
                        onClick={(e) => {
                          e.preventDefault();
                          submitChangePassword();
                        }}
                      >
                        {isLoading && (
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            itemKey="item-3"
            header={
              <div>
                <h1 className="text-2xl font-semibold max-lg:text-sm">Bank Details</h1>
              </div>
            }
          >
            <div className="flex items-center justify-between px-3 relative max-lg:flex-col">
              <div className="flex flex-col max-h-[300px] flex-wrap gap-x-6">
                {accounts.map((account: Account) => (
                  <div
                    className={cn("text-black mb-4 flex items-center border border-blue-500 gap-4 py-4 pl-8 pr-2 max-lg:pl-0",
                      account.recipientCode === '' && "border-blue-200"
                    )}
                    key={account._id}
                  >
                    <div className="w-[30px] h-[30px] border relative">

                        {banks.map((bank, i) => {
                          if (bank.code === account.bankCode) {
                            return (
                              <div key={bank.longCode + i} className={cn(account.recipientCode === "" && "opacity-40")}>
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
                    <h1 className={cn(account.recipientCode === "" && "opacity-40", "mr-auto text-lg max-lg:text-xs")}>
                      {banks.map((bank) => {
                        if (bank.code === account.bankCode) {
                          return `${bank.name}: ${account.accountNumber}`;
                        } else {
                          return "";
                        }
                      })}
                    </h1>
                    <button className="ml-auto text-red-400 px-3" onClick={() => {
                      setSelectedAccount(account._id);
                      setDeleteBankModal(true);
                    }}>
                      <Icons.trash className="w-5 max-lg:w-4"/>
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-accent flex gap-2">
                <div>
                  <Icons.add />
                </div>
                <button
                  className="font-bold"
                  onClick={() => {
                    setBankValidationModal(true);
                  }}
                >
                  Add New Account
                </button>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            itemKey="item-4"
            header={
              <div>
                <h1 className="text-2xl font-semibold max-lg:text-sm">Help and Support</h1>
              </div>
            }
          >
            You can send us an email at <span className="text-accent">merchant@biya.com.ng</span>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
