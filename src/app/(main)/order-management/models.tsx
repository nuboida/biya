export interface PaymentRequestsResponse  {
  id: string;
  amount: number;
  payout: number;
  orderId: string;
  reference: string;
  customerId: string;
  requestBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
  status: string;
  merchantId: string;
  refund: number;
  createdAt: string;
  charge: number;
}
