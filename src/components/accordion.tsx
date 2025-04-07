"use client";

import { Accordion, AccordionItemProps, AccordionItem as Item } from "@szhsin/react-accordion";
import { Icons } from "./ui/Icons";
import { cn } from "@/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";
import ValidateBankModal from "./validate-bank-modal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "./ui/toast";
import clsx from "clsx";
import Image from "next/image";

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */

interface Account {
  _id: string;
  accountNumber: string;
  bankCode: string;
}

interface SettingsAccordionProps {
  token: string;
  merchantId: string;
  merchant: {
    businessName: string;
    merchantId: string;
    businessEmail: string;
  }
}

const changePasswordSubmit = async (token: string, request: {oldPassword: string, newPassword: string, confirmPassword: string}) => {
  try {
    const response = await fetch("api/auth/change-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const getMerchantAccounts = async (token: string, merchantId: string) => {
  try {
    const response = await fetch(`api/merchants/${merchantId}/get-accounts`, {
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
    const response = await fetch(`api/banks`, {
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

const AccordionItem = ({ header, ...rest}: AccordionItemProps) => (
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
    className="mb-10"
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full px-4 py-7 text-left ${isEnter && "bg-accent text-black/50"}
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
  merchant
}: SettingsAccordionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [banks, setBanks] = useState<{ code: string; name: string; slug: string; longCode: string }[]>([]);
  const [bankValidationModal, setBankValidationModal] = useState(false);
  const [passwordChange, setPasswordChange] = useState<{oldPassword: string, newPassword: string, confirmPassword: string}>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState("");

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setPasswordChange({...passwordChange, [event.target.name]: event.target.value})
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

    changePasswordSubmit(token, passwordChange).then(res => {
      if("error" in res) {
        setError(res.error);
        setIsLoading(false);
      } else {
        toast({
          message: res.message,
          type: 'success'
        });
        setIsLoading(false);
        setPasswordChange({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      }
    });
  }

  return (
    <>
      { bankValidationModal && <ValidateBankModal onClose={() => setBankValidationModal(false)} token={token} merchantId={merchantId} banks={banks} /> }
      <div className="mx-2 my-4 border-t">
        {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
        <Accordion transition transitionTimeout={200}>
          <AccordionItem
            itemKey="item-1"
            header={
              <div>
                <h1 className="text-2xl font-semibold">Business Information</h1>
              </div>
            }
          >
            <div className="flex gap-16">
              <div className="w-[264px] h-[264px] border-gray-100 border"></div>
              <div className="grow">
                <div className="flex gap-5 mb-5">
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
                <h1 className="text-2xl font-semibold">Password and Security</h1>
              </div>
            }
          >
            <div className={clsx(error && "border border-red-500", "px-4")}>
              {
                typeof error == "string" && (
                  <p className="px-1 pb-4 text-red-600 font-semibold">{error}</p>
                )
              }
              <div className="flex gap-16">
                <div className="grow">
                  <div className="flex gap-5 mb-5">
                    <Input type="password" placeholder="Current Password" name="oldPassword" onChange={handlePasswordChange} value={passwordChange.oldPassword} />
                    <Input type="password" placeholder="New Password" name="newPassword" onChange={handlePasswordChange} value={passwordChange.newPassword} />
                  </div>
                  <div className="flex gap-5 mb-5 justify-between">
                    <Input type="password" placeholder="Confirm Password" name="confirmPassword" className="w-1/2" onChange={handlePasswordChange} value={passwordChange.confirmPassword} />
                    <div className="w-1/2 flex justify-end">
                      <Button className="bg-accent px-10" disabled={isLoading} onClick={(e) => {
                        e.preventDefault();
                        submitChangePassword();
                      }}>
                        {
                          isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                          )
                        }
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
                <h1 className="text-2xl font-semibold">Bank Details</h1>
              </div>
            }
          >
            <div className="flex items-center justify-between px-3">
              <div className="flex flex-col">
                {accounts.map((account: Account) => (
                  <div
                    className="text-black mb-4 flex items-center border border-blue-500 gap-4 py-4 px-8"
                    key={account._id}
                  >
                    <div className="w-[30px] h-[30px] border">
                      {banks.map((bank, i) => {
                        if (bank.code === account.bankCode) {
                          return (
                            <div key={bank.longCode + i}>
                              <Image src={`/bank-logos/${bank.slug}.png`} alt="bank logo" width={50} height={50} className="w-full h-full"/>
                            </div>
                          )
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
                ))}
              </div>
              <div className="text-accent flex gap-2">
                <div>
                  <Icons.add />
                </div>
                <button className="font-bold" onClick={() => {
                  setBankValidationModal(true);
                }}>Add New Account</button>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            itemKey="item-4"
            header={
              <div>
                <h1 className="text-2xl font-semibold">Help and Support</h1>
              </div>
            }
          >
            Suspendisse massa risus, pretium id interdum in, dictum sit amet ante.
            Fusce vulputate purus sed tempus feugiat.
          </AccordionItem>
        </Accordion>
      </div>

    </>
  );
}
