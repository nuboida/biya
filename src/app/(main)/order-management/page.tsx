import { OrderManagementTable } from "@/components/order-management/order-management-table";
import { Button } from "@/components/ui/button";
import { verifySession } from "@/dal";
import Link from "next/link";

const OrderManagementPage = async () => {
  const { token, merchantId, role } = await verifySession();

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
                  Transactions
                </h3>
              </div>
              <div className="flex min-w-full flex-col rounded-xl">
                <div className="grow overflow-auto max-h-[68vh] scrollbar">
                  <OrderManagementTable token={String(token)} merchantId={merchantId} role={role} />
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
