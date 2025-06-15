import { Icons } from "@/components/ui/Icons";
import { AddVendorForm } from "@/components/vendors/addVendorForm";
import { verifySession } from "@/dal";
import Link from "next/link";

const AddVendorPage = async () => {
  const { token, merchantId } = await verifySession();

  return (
    <>
      <section>
        <div className="px-10 mb-10 max-md:px-5">
          <div className="flex justify-between items-center pt-10">
            <div className="mr-auto flex items-center gap-5">
              <Link href="/vendors">
                <Icons.chevronLeft className="mt-2" />
              </Link>
              <h1 className="text-3xl font-semibold">Add Vendors</h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div>
          <div className="px-10 mb-10 max-md:px-5">
            <div className="w-full max-h-full bg-slated-100">
              <div className="relative rounded-lg min-h-[80vh] flex justify-center items-center max-md:min-h-[60vh]">
                <AddVendorForm token={String(token)} merchantId={merchantId} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddVendorPage;
