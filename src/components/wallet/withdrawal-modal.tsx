import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { InfoModal } from "../ui/info-modal";
import { Input } from "../ui/input";
import toast from "../ui/toast";

interface WithdrawalModalProps {
  onClose: () => void;
  token: string;
  merchantId: string;
}

interface Account {
  _id: string;
  accountNumber: string;
  bankCode: string;
}

interface WithdrawFundsRequest {
  amount: number;
  reason: string;
  accountId: string;
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
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const getBanks = async (token: string) => {
  try {
    const response = await fetch(`api/banks`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

const withdrawFunds = async (token: string, merchantId: string, request: WithdrawFundsRequest) => {
  try {
    const response = await fetch(`api/merchants/${merchantId}/withdraw`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });
    return await response.json();
  } catch (error) {
    console.log(error)
  }
}

export const WithdrawalModal = ({
  onClose,
  token,
  merchantId,
}: WithdrawalModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [banks, setBanks] = useState<{code: string; name: string; longCode: string; slug: string}[]>([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [inputData, setInputData] = useState<WithdrawFundsRequest>({
    accountId: '',
    amount: 0,
    reason: ''
  })

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
      })
    }

    return () => {
      ignore = true;
    };
  }, [isMounted, token, merchantId]);

  const toggleAccount = (id: string) => {
    setSelectedItem(id);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = () => {
    setIsLoading(true);

    withdrawFunds(token, merchantId, inputData).then((res) => {
      if ('error' in res) {
        toast({
          message: `${res.error}`,
          type: "error"
        })
        setIsLoading(false);
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
    <InfoModal
      title="Withdraw"
      subtitle="Click the account and fill in the information below to initiate withdrawal"
      onModalClose={() => onClose()}
      actionName="Withdraw"
      isLoading={isLoading}
      action={() => onSubmit()}
    >
        {accounts.map((account: Account) => (
          <div
            className="flex flex-col border border-blue-500 p-3"
            key={account._id}
          >
            <div className="text-black mb-2 flex items-center gap-4 cursor-pointer" onClick={() => {
              toggleAccount(account._id);
              setInputData({...inputData, accountId: account._id})
            }}>
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
              <h1 className="mr-auto text-lg">{banks.map((bank) => {
                if (bank.code === account.bankCode) {
                  return `${bank.name}: ${account.accountNumber}`
                } else {
                  return ''
                }
              })}</h1>
            </div>
            {
              selectedItem === account._id && (
                <div>
                  <Input placeholder="Amount" name="amount" onChange={handleChange} />
                  <textarea
                    rows={3}
                    className="w-full text-black border border-solid border-gray-300 mt-5 px-3 2xl:py-3 lg:py-2 resize-none"
                    placeholder="Reason"
                    name="reason"
                    onChange={handleChange}
                  ></textarea>
                </div>
              )
            }
          </div>
        ))}
    </InfoModal>
  );
};
