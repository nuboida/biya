import { Icons } from "@/components/ui/Icons";
import Link from "next/link";
import { getSinglePaymentRequest } from "../../services";
import { verifySession } from "@/dal";
import { RefundForm } from "@/components/order-management/refund-form";

interface Props {
  params: Promise<{ paymentRequestId: string }>;
}

const RefundPage = async ({ params }: Props) => {
  const { paymentRequestId } = await params;
  const { token, merchantId } = await verifySession();
  const {amount, customerId, orderId } = await getSinglePaymentRequest(
    token!,
    merchantId,
    paymentRequestId
  );

  return (
    <>
      <section>
        <div className="px-10 mb-10">
          <div className="flex justify-between items-center pt-10">
            <div className="mr-auto flex items-center gap-5">
              <Link href={`/order-management/${paymentRequestId}`}>
                <Icons.chevronLeft className="mt-2" />
              </Link>
              <h1 className="text-3xl font-semibold">Refund</h1>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="px-10 mb-10">
          <div className="w-full max-h-full bg-slated-100">
            <div className="relative rounded-lg min-h-[80vh] flex justify-center items-center">
              <RefundForm token={String(token)} merchantId={merchantId} amount={amount} paymentRequestId={paymentRequestId} orderId={orderId} customerId={customerId} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RefundPage;
