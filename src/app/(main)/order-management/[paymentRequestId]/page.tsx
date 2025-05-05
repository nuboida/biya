import Link from "next/link";
import { Icons } from "@/components/ui/Icons";
import { verifySession } from "@/dal";
import { getSinglePaymentRequest } from "../services";
import { cn, convertKoboToNaira, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ paymentRequestId: string }>;
}

const PaymentRequestPage = async ({ params }: Props) => {
  const { paymentRequestId } = await params;
  const { token, merchantId, role } = await verifySession();
  const paymentRequest = await getSinglePaymentRequest(
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
              <Link href="/order-management">
                <Icons.chevronLeft className="mt-2" />
              </Link>
              <h1 className="text-3xl font-semibold">Payment Request</h1>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="px-10 mb-10">
          <div className="w-full max-h-full bg-slated-100">
            <div className="relative rounded-lg min-h-[80vh] flex justify-center items-center">
              <div className="w-96 flex flex-col gap-6 bg-white py-10 px-2">
                <div className="flex justify-between px-8">
                  <h4 className="font-semibold">OrderId:</h4>
                  <h6>{paymentRequest.orderId}</h6>
                </div>
                <div className="flex justify-between items-center px-8">
                  <h4 className="font-semibold">CustomerId:</h4>
                  <h6>{paymentRequest.customerId}</h6>
                </div>
                <div className="flex justify-between items-center px-8">
                  <h4 className="font-semibold">Agent Name:</h4>
                  <h6>{`${paymentRequest.requestBy.firstName} ${paymentRequest.requestBy.lastName}`}</h6>
                </div>
                <div className="flex justify-between items-center px-8">
                  <h4 className="font-semibold">Amount:</h4>
                  <h6>
                    <span>&#8358; </span>
                    {convertKoboToNaira(paymentRequest.amount)}
                  </h6>
                </div>
                <div className="flex justify-between items-center px-8">
                  <h4 className="font-semibold">Refunded:</h4>
                  <h6>
                    <span>&#8358; </span>
                    {convertKoboToNaira(paymentRequest.refund)}
                  </h6>
                </div>
                <div className="flex justify-between items-center px-8">
                  <h4 className="font-semibold">Date:</h4>
                  <h6>{formatDate(paymentRequest.createdAt)}</h6>
                </div>
                <div className="flex justify-between items-center px-8">
                  <h4 className="font-semibold">Status:</h4>
                  <h6
                    className={cn(
                      "font-bold",
                      paymentRequest.status === "APPROVED" && "text-green-500",
                      paymentRequest.status === "DECLINED" && "text-red-500",
                      paymentRequest.status === "PENDING" && "text-yellow-500",
                      paymentRequest.status === "PARTIAL REFUND" && 'text-blue-500',
                      paymentRequest.status === "REFUND" && "text-purple-500"
                    )}
                  >
                    {
                      paymentRequest.status === "PARTIAL REFUND" ? 'PARTIALLY REFUNDED' : paymentRequest.status
                    }
                  </h6>
                </div>
                {role === "Owner" &&
                  paymentRequest.status !== "DECLINED" &&
                  paymentRequest.status !== "EXPIRED" &&
                  paymentRequest.status !== "PENDING" &&
                  paymentRequest.status !== "REFUND" && (
                    <div className="flex justify-center items-center px-8 mt-4">
                      {/* <RefundButton amount={paymentRequest.amount} /> */}
                      <Link
                        href={`/order-management/${paymentRequestId}/refund`}
                      >
                        <Button size="lg">Request Refund</Button>
                      </Link>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentRequestPage;
