import { verifySession } from "@/dal";
import { getWalletBalance, getWalletTransactions } from "./services";
import { convertKoboToNaira, formatDate } from "@/lib/utils";
import { WalletTransactionModel } from "./models";
import { WalletBalanceWidget } from "@/components/wallet/walletBalanceWidget";
import { WithDrawalButton } from "@/components/wallet/withdrawButton";

const WalletPage = async () => {
  const {token, merchantId, role} = await verifySession();
  const {balance} = await getWalletBalance(token!, merchantId);
  const walletTransactions = await getWalletTransactions(token!, merchantId);

  return (
    <>
      <section>
        <div className="pt-10 mb-10">
          <div className="grid grid-cols-12 grid-rows gap-6 px-10">
            <div className="bg-primary-100 text-white py-7 px-6 col-span-4 row-span-1 flex flex-col justify-center">
              <WalletBalanceWidget balance={balance} role={role} />
              {
                typeof balance === "number" && (
                  <WithDrawalButton token={String(token)} merchantId={merchantId} />
                )
              }
            </div>
            <div className="h-screen col-span-8 row-span-2">
            <div>
          <div className="w-full max-h-full bg-slated-100">
            <div className="relative bg-slated rounded-lg shadow min-h-[80vh]">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold dark:text-white">
                  Wallet Transactions
                </h3>
              </div>
              <div className="flex min-w-full flex-col rounded-xl">
                <div className="grow overflow-auto max-h-[68vh] scrollbar">
                  <table className="table w-full table-auto border-collapse border-0 text-left align-middle leading-5">
                    <thead className="text-xs sticky top-0">
                      <tr>
                        <th className="w-[50px] tableHeader">#</th>
                        <th className="min-w-[120px] tableHeader">Reference</th>
                        <th className="min-w-[70px] tableHeader">
                          Type
                        </th>
                        <th className="min-w-[100px] tableHeader">Amount</th>
                        <th className="min-w-[120px] tableHeader">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        walletTransactions.map((transaction:WalletTransactionModel, i: number) => (
                          <tr key={`${transaction.reference}-${i}`}>
                            <td className="tableData">{i + 1}</td>
                            <td className="tableData">{transaction.reference}</td>
                            <td className="tableData capitalize">{(transaction.transactionType).replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</td>
                            <td className="tableData"><span className="pr-2">&#x20A6;</span><span className={transaction.transactionType === "debitWallet" ? "text-red-700" : "text-green-700"}>{String(transaction.difference).includes("-") ? convertKoboToNaira(Number(String(transaction.difference).replace("-", ""))) : convertKoboToNaira(transaction.difference)}</span></td>

                            <td className="tableData">{formatDate(transaction.createdAt)}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WalletPage;
