export interface DashboardLayoutProps {
  name: string;
}

export interface ErrorResponse {
  error: string;
}

export interface WalletResponse {
  balance: number
};

export interface WalletTransactions {
  amount: number;
  customerId: string;
  status: string;
  userId: string;
  transactionType: string;
  reference: string;
  balance: number;
  difference: number;
  modelResponsible: string;
  modelId: string;
  createdAt: Date
}
export interface PaymentRequestsResponse  {
  merchantId: string;
  requestBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
  customerId: string;
  orderId: string;
  amount: number;
  reference: string;
  refund: number;
  status: string;
  createdAt: Date;
}

export interface MerchantPaymentRequest {
  customerId: string;
  amount: number;
  orderId: string;
}

export interface RefundRequest {
  customerId: string;
  orderId: string;
  amount: number;
}

export interface WithdrawFundsRequest {
  amount: number;
  reason: string;
  accountId: string
}

export interface MerchantPaymentResponse {
  message: string;
}

export interface GeneralResponse {
  message: string;
}

export interface RefundCustomerResponse extends MerchantPaymentResponse {}
