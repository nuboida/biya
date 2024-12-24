export interface WalletTransactions {
  userId: string;
  transactionType: string;
  reference: string;
  balance: number;
  difference: number;
  modelResponsible: string;
  modelId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ErrorResponse {
  error: string;
}

export interface WalletBalanceResponse {
  balance: number;
}

export interface PaymentRequestsResponse  {
  merchantId: string;
  customerId: string;
  orderId: string;
  amount: number;
  reference: string;
  status: string;
  createdAt: Date;
}

export interface RefundResponse {
  message: string;
}
