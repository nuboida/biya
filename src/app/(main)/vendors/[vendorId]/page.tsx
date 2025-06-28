import { Icons } from "@/components/ui/Icons";
import { verifySession } from "@/dal";
import Link from "next/link";
import { getBanks, getSingleVendor, getVendorTransactions } from "../service";
import VendorBankComponent from "@/components/vendors/vendorBank";
import { format } from "date-fns";
import { convertKoboToNaira } from "@/lib/utils";

interface Props {
  params: Promise<{ vendorId: string }>;
}

const VendorPage = async ({ params }: Props) => {
  const { vendorId } = await params;
  const { token } = await verifySession();
  const vendor = await getSingleVendor(token!, vendorId);
  const banks = await getBanks(token!);
  const vendorTransactions = await getVendorTransactions(token!, vendorId);

  return (
    <>
      <section>
        <div className="px-10 mb-10 max-md:px-5">
          <div className="flex justify-between items-center pt-10">
            <div className="mr-auto flex items-center gap-5">
              <Link href="/vendors">
                <Icons.chevronLeft className="mt-2" />
              </Link>
              <h1 className="text-3xl font-semibold">Vendor</h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="px-10 mb-10 max-md:px-5">
          <div className="w-full max-h-full bg-slated-100">
            <div className="relative rounded-lg min-h-[60vh] flex flex-col justify-center items-center py-10">
              <div className="w-1/2 flex flex-col gap-6 bg-white py-10 px-2 max-md:w-[90%]">
                <div className="flex justify-between px-8">
                  <h4 className="font-semibold">Name:</h4>
                  <h6>{vendor.name}</h6>
                </div>
                <div className="flex justify-between px-8">
                  <h4 className="font-semibold">Email:</h4>
                  <h6>{vendor.email}</h6>
                </div>
                <div className="flex justify-between px-8">
                  <h4 className="font-semibold">Phone:</h4>
                  <h6>{vendor.phone}</h6>
                </div>
                <VendorBankComponent
                  bankAccount={vendor.bankAccount}
                  token={String(token)}
                  banks={banks.data}
                  vendorId={vendorId}
                />
              </div>
            </div>
            {vendorTransactions.length != 0 && (
              <div className="flex justify-center items-center mb-2 w-[90%] bg-white mt-10 px-5 max-md:overflow-auto">
                <div className="w-full">
                  <div className="flex justify-between items-center py-4">
                    <h4 className="font-semibold">Withdrawals to vendor</h4>
                  </div>
                  <table className="table w-full table-auto border-collapse border-0 text-left align-middle leading-5">
                    <thead>
                      <tr>
                        <th className="min-w-[50px] tableHeader">#</th>
                        <th className="min-w-[50px] tableHeader">Amount</th>
                        <th className="min-w-[120px] tableHeader">
                          Reason for withdrawal
                        </th>
                        <th className="min-w-[120px] tableHeader">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendorTransactions.length !== 0 &&
                        vendorTransactions.map((transaction, i) => (
                          <tr key={transaction._id}>
                            <td className="tableData">{i + 1}</td>
                            <td className="tableData">
                              <span>&#8358; </span>
                              {convertKoboToNaira(transaction.amount)}
                            </td>
                            <td className="tableData">{transaction.reason}</td>
                            <td className="tableData">
                              {format(
                                new Date(transaction.createdAt),
                                "eeee, d MMM yyyy. hh:mma"
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default VendorPage;
