import { Icons } from "@/components/ui/Icons";
import { verifySession } from "@/dal";
import Link from "next/link";
import { getBanks, getSingleVendor } from "../service";
import VendorBankComponent from "@/components/vendors/vendorBank";

interface Props {
  params: Promise<{ vendorId: string }>;
}

const VendorPage = async ({ params }: Props) => {
  const { vendorId } = await params;
  const { token } = await verifySession();
  const vendor = await getSingleVendor(token!, vendorId);
  const banks = await getBanks(token!);

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
                <VendorBankComponent bankAccount={vendor.bankAccount} token={String(token)} banks={banks.data} vendorId={vendorId} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VendorPage;
