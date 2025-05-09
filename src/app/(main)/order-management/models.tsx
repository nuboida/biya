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
  refunds: {
    _id: string;
    amountRefunded: number;
    comment: string;
    createdAt: string;
  }[]
  status: string;
  merchantId: string;
  refund: number;
  createdAt: string;
  charge: number;
}
