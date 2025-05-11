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

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  active: boolean;
  role: string;
}
export interface GetMerchantResponse {
  id: string;
  merchantId: number;
  businessName: string;
  employees: Employee[]
}
