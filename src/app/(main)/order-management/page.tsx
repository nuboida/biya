import { Button } from "@/components/ui/button";
import { verifySession } from "@/dal";
import { getPaymentRequests } from "./services";
import { cn, convertKoboToNaira, formatDate } from "@/lib/utils";
import Link from "next/link";

const OrderManagementPage = async () => {
  const { token, merchantId } = await verifySession();
  const paymentRequests = await getPaymentRequests(token!, merchantId);
  const sortPaymentRequests = paymentRequests.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    <>
      <section>
        <div className="px-10 mb-10">
          <div className="flex justify-between items-center pt-10">
            <div className="mr-auto">
              <h1 className="text-3xl font-semibold">Create Orders</h1>
              <p>Initiate orders and see who has also initiated orders</p>
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
      </section>
      <section className="mt-10">
        <div className="px-10 mb-10">
          <div className="w-full max-h-full bg-slated-100">
            <div className="relative rounded-lg min-h-[80vh]">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold dark:text-white">
                  All Transactions
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
                        <th className="min-w-[120px] tableHeader">
                          Agent Name
                        </th>
                        <th className="min-w-[50px] tableHeader">Amount</th>
                        <th className="min-w-[50px] tableHeader">Payout</th>
                        <th className="min-w-[50px] tableHeader">Fee</th>
                        <th className="min-w-[120px] tableHeader">
                          Order Date
                        </th>
                        <th className="tableHeader w-[50px]">Status</th>
                        <th className="tableHeader w-[120px]"></th>
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
                          <td className="tableData">&#8358; {convertKoboToNaira(paymentRequest.amount)}</td>
                          <td className="tableData">&#8358; {paymentRequest.payout ? convertKoboToNaira(paymentRequest.payout) : "--"}</td>
                          <td className="tableData">&#8358; {convertKoboToNaira(paymentRequest.charge)}</td>
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
                          <td className="tableData">
                            <Link
                              href={`/order-management/${paymentRequest.id}`}
                            >
                              <Button className="bg-gray-400">View</Button>
                            </Link>
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

export default OrderManagementPage;
