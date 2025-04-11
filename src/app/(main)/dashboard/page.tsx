import { Button } from "@/components/ui/button";
import { getPaymentRequests, getWalletBalance } from "./services";
import { verifySession } from "@/dal";
import { cn, convertKoboToNaira, formatDate } from "@/lib/utils";
import { WalletBalanceWidget } from "@/components/wallet/walletBalanceWidget";
import Link from "next/link";

const DashboardPage = async () => {
  const { token, merchantId, role } = await verifySession();
  const paymentRequests = await getPaymentRequests(token!, merchantId);
  const totalRequestAmount = paymentRequests.reduce((acc, n) => {
    acc += n.amount;
    return acc;
  }, 0);

  const todayRequestAmount = paymentRequests.reduce((acc, n) => {
    const getCreatedDate = n.createdAt.split('T')[0];
    const getTodayDate = new Date().toISOString().split('T')[0];
    if (getCreatedDate === getTodayDate) {
      acc += n.amount;
    }
    return acc;
  }, 0);

  const { balance } = await getWalletBalance(token!, merchantId);
  const pendingRequests = paymentRequests.filter(
    (request) => request.status === "PENDING"
  );
  const sortPaymentRequests = paymentRequests.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <section>
        <div className="px-10 mb-10">
          <div className="flex justify-between items-center pt-10">
            <div className="mr-auto">
              <h1 className="text-3xl font-semibold">Welcome Back</h1>
              <p>Here is an overview of all that you have done</p>
            </div>
            <div>
              <Link href="/order-management/initiate">
                <Button size="default" className="bg-accent hover:bg-accent/60 active:bg-primary-100 text-white px-10">
                  Initiate Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex gap-4 px-10">
          <div className="bg-primary-100 text-white py-7 px-6 w-1/3">
            <WalletBalanceWidget balance={role === "Owner" ? balance : totalRequestAmount}  role={role} />
          </div>

          {
            role === "Owner" && (
            <div className="bg-slated-200 py-7 px-6 w-1/4 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <h1 className="font-medium text-2xl">Total No of Agents</h1>
                <div>
                  <svg
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.947266"
                      y="0.257812"
                      width="30"
                      height="30"
                      fill="#FF834E"
                    />
                    <g clipPath="url(#clip0_127_34502)">
                      <path
                        d="M15.9473 14.5078C16.9418 14.5078 17.8957 14.9029 18.5989 15.6062C19.3022 16.3094 19.6973 17.2633 19.6973 18.2578V22.7578H12.1973V18.2578C12.1973 17.2633 12.5924 16.3094 13.2956 15.6062C13.9989 14.9029 14.9527 14.5078 15.9473 14.5078ZM10.9133 16.7623C10.7939 17.1649 10.7234 17.5804 10.7033 17.9998L10.6973 18.2578V22.7578H8.44727V19.3828C8.44712 18.736 8.68579 18.1119 9.11749 17.6302C9.5492 17.1485 10.1435 16.8432 10.7865 16.7728L10.914 16.7623H10.9133ZM20.9813 16.7623C21.6487 16.803 22.2755 17.0968 22.7337 17.5837C23.192 18.0707 23.4472 18.7141 23.4473 19.3828V22.7578H21.1973V18.2578C21.1973 17.7381 21.1223 17.2363 20.9813 16.7623ZM11.0723 12.2578C11.5695 12.2578 12.0465 12.4554 12.3981 12.807C12.7497 13.1586 12.9473 13.6355 12.9473 14.1328C12.9473 14.6301 12.7497 15.107 12.3981 15.4586C12.0465 15.8103 11.5695 16.0078 11.0723 16.0078C10.575 16.0078 10.0981 15.8103 9.74644 15.4586C9.39481 15.107 9.19727 14.6301 9.19727 14.1328C9.19727 13.6355 9.39481 13.1586 9.74644 12.807C10.0981 12.4554 10.575 12.2578 11.0723 12.2578ZM20.8223 12.2578C21.3195 12.2578 21.7965 12.4554 22.1481 12.807C22.4997 13.1586 22.6973 13.6355 22.6973 14.1328C22.6973 14.6301 22.4997 15.107 22.1481 15.4586C21.7965 15.8103 21.3195 16.0078 20.8223 16.0078C20.325 16.0078 19.8481 15.8103 19.4964 15.4586C19.1448 15.107 18.9473 14.6301 18.9473 14.1328C18.9473 13.6355 19.1448 13.1586 19.4964 12.807C19.8481 12.4554 20.325 12.2578 20.8223 12.2578ZM15.9473 7.75781C16.7429 7.75781 17.506 8.07388 18.0686 8.63649C18.6312 9.1991 18.9473 9.96216 18.9473 10.7578C18.9473 11.5535 18.6312 12.3165 18.0686 12.8791C17.506 13.4417 16.7429 13.7578 15.9473 13.7578C15.1516 13.7578 14.3886 13.4417 13.8259 12.8791C13.2633 12.3165 12.9473 11.5535 12.9473 10.7578C12.9473 9.96216 13.2633 9.1991 13.8259 8.63649C14.3886 8.07388 15.1516 7.75781 15.9473 7.75781Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_127_34502">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(6.94727 6.25781)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-6xl font-mono">0</h1>
              </div>
            </div>
            )
          }

          {
            role !== "Owner" && (
              <div className="bg-slated-200 py-7 px-6 w-1/4 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h1 className="font-medium text-2xl">Today&apos;s Total Requests</h1>
              <div>
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.947266"
                    y="0.257812"
                    width="30"
                    height="30"
                    fill="#17235D"
                  />
                  <g clipPath="url(#clip0_127_34496)">
                    <path
                      d="M15.9473 22.7578C11.805 22.7578 8.44727 19.4001 8.44727 15.2578C8.44727 11.1156 11.805 7.75781 15.9473 7.75781C20.0895 7.75781 23.4473 11.1156 23.4473 15.2578C23.4473 19.4001 20.0895 22.7578 15.9473 22.7578ZM15.1995 18.2578L20.502 12.9546L19.4415 11.8941L15.1995 16.1368L13.0778 14.0151L12.0173 15.0756L15.1995 18.2578Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_127_34496">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(6.94727 6.25781)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div>
            <h1 className="text-7xl">
              &#8358;
              <span className="font-mono text-6xl inline-block pl-1">
                 {convertKoboToNaira(todayRequestAmount)}
              </span>
            </h1>
            </div>
          </div>
            )
          }

          <div className="bg-slated-200 py-7 px-6 w-1/4 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h1 className="font-medium text-2xl">Total Requests</h1>
              <div>
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.947266"
                    y="0.257812"
                    width="30"
                    height="30"
                    fill="#17235D"
                  />
                  <g clipPath="url(#clip0_127_34496)">
                    <path
                      d="M15.9473 22.7578C11.805 22.7578 8.44727 19.4001 8.44727 15.2578C8.44727 11.1156 11.805 7.75781 15.9473 7.75781C20.0895 7.75781 23.4473 11.1156 23.4473 15.2578C23.4473 19.4001 20.0895 22.7578 15.9473 22.7578ZM15.1995 18.2578L20.502 12.9546L19.4415 11.8941L15.1995 16.1368L13.0778 14.0151L12.0173 15.0756L15.1995 18.2578Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_127_34496">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(6.94727 6.25781)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-6xl font-mono">{paymentRequests.length}</h1>
            </div>
          </div>
          <div className="bg-slated-200 py-7 px-6 w-1/4 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h1 className="font-medium xl:text-2xl lg:text-xl">
                Pending Requests
              </h1>
              <div>
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.935547"
                    y="0.575195"
                    width="30"
                    height="30"
                    fill="#0D67AA"
                  />
                  <g clipPath="url(#clip0_127_34511)">
                    <path
                      d="M15.9355 23.0752C11.7933 23.0752 8.43555 19.7174 8.43555 15.5752C8.43555 11.4329 11.7933 8.0752 15.9355 8.0752C20.0778 8.0752 23.4355 11.4329 23.4355 15.5752C23.4355 19.7174 20.0778 23.0752 15.9355 23.0752ZM16.6855 15.5752V11.8252H15.1855V17.0752H19.6855V15.5752H16.6855Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_127_34511">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(6.93555 6.5752)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-6xl font-mono">{pendingRequests.length}</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <div className="px-10 mb-10">
          <div className="w-full max-h-full">
            <div className="relative rounded-lg shadow min-h-[80vh]">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold dark:text-white">
                  Total Transactions
                </h3>
              </div>
              <div className="flex min-w-full flex-col rounded-xl">
                <div className="grow overflow-auto max-h-[68vh] scrollbar">
                  <table className="table w-full table-auto border-collapse border-0 text-left align-middle leading-5">
                    <thead className="text-xs">
                      <tr>
                        <th className="w-[50px] tableHeader">#</th>
                        <th className="min-w-[50px] tableHeader">Order ID</th>
                        <th className="min-w-[50px] tableHeader">
                          Customer ID
                        </th>
                        <th className="min-w-[100px] tableHeader">
                          Agent Name
                        </th>
                        <th className="min-w-[50px] tableHeader">Amount</th>
                        <th className="min-w-[50px] tableHeader">Payout</th>
                        <th className="min-w-[50px] tableHeader">Fees</th>
                        <th className="min-w-[120px] tableHeader">
                          Order Date
                        </th>
                        <th className="min-w-[120px] tableHeader">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortPaymentRequests.map((paymentRequest, i: number) => (
                        <tr key={paymentRequest.id}>
                          <td className="tableData">{i + 1}</td>
                          <td className="tableData">
                            {paymentRequest.orderId}
                          </td>
                          <td className="tableData">
                            {paymentRequest.customerId}
                          </td>
                          <td className="tableData">{`${paymentRequest.requestBy.firstName} ${paymentRequest.requestBy.lastName}`}</td>
                          <td className="tableData">
                            &#8358; {convertKoboToNaira(paymentRequest.amount)}
                          </td>
                          <td className="tableData">
                            &#8358; {paymentRequest.payout ? convertKoboToNaira(paymentRequest.payout) : "--"}
                          </td>
                          <td className="tableData">
                            &#8358; {convertKoboToNaira(paymentRequest.charge)}
                          </td>
                          <td className="tableData">
                            {formatDate(paymentRequest.createdAt)}
                          </td>
                          <td
                            className={cn(
                              "tableData font-bold",
                              paymentRequest.status === "APPROVED" &&
                                "text-green-500",
                              paymentRequest.status === "DECLINED" &&
                                "text-red-500",
                              paymentRequest.status === "PENDING" &&
                                "text-yellow-500"
                            )}
                          >
                            {paymentRequest.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
