export interface PaymentRequestModel {
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
  createdAt: string;
  charge: number;
}

export interface WalletBalanceResponse {
  balance: number;
}
