import { AddVendorButton } from "@/components/vendors/addVendorButton";
import { verifySession } from "@/dal";
import { getMerchant } from "../service";
import { Vendor } from "../models";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const VendorsPage = async () => {
  const { token, merchantId } = await verifySession();
  const merchant = await getMerchant(token!, merchantId);

  return (
    <>
      <section>
        <div className="px-10 mb-10">
          <div className="flex justify-between items-center pt-10">
            <div className="mr-auto">
              <h1 className="text-3xl font-semibold">Vendors</h1>
              <p>Add and manage merchant vendors</p>
            </div>
            <AddVendorButton />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="px-10 mb-10">
          <div className="w-full max-h-full bg-slated-100">
            <div className="relative rounded-lg min-h-[80vh]">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold dark:text-white">
                  All Vendors
                </h3>
              </div>
              <div className="flex min-w-full flex-col rounded-xl">
                <div className="grow overflow-auto max-h-[68vh] scrollbar">
                  <table className="table w-full table-auto border-collapse border-0 text-left align-middle leading-5">
                    <thead className="text-xs">
                      <tr>
                        <th className="w-[50px] tableHeader">#</th>
                        <th className="min-w-[50px] tableHeader">Name</th>
                        <th className="min-w-[120px] tableHeader">Email</th>
                        <th className="min-w-[100px] tableHeader">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {merchant.vendors.map((vendor: Vendor, i) => (
                        <tr key={vendor._id}>
                          <td className="tableData">{i + 1}</td>
                          <td className="tableData">{vendor.name}</td>
                          <td className="tableData">{vendor.email}</td>
                          <td className="tableData">{vendor.phone}</td>
                          <td className="tableData">
                            <Link href={`/vendors/${vendor._id}`}>
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

export default VendorsPage;
