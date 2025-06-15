import { Icons } from "@/components/ui/Icons";
import Link from "next/link";
import { PaymentRequestForm } from "@/components/order-management/order-form";
import { verifySession } from "@/dal";

const InitiateOrderPage = async () => {
  const { token, merchantId } = await verifySession();

  return (
    <>
      <section>
        <div className="px-10 mb-10 max-lg:px-5">
          <div className="flex justify-between items-center pt-10">
            <div className="mr-auto flex items-center gap-5">
              <Link href='/order-management'>
                <Icons.chevronLeft className="mt-2" />
              </Link>
              <h1 className="text-3xl font-semibold max-lg:text-xl">Initiate Payment Request</h1>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="px-10 mb-10 max-lg:px-5">
          <div className="w-full max-h-full bg-slated-100">
            <div className="relative rounded-lg min-h-[80vh] flex justify-center items-center max-lg:min-h-[60vh]">
              <PaymentRequestForm token={String(token)} merchantId={merchantId} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InitiateOrderPage;
