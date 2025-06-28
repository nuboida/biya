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

export interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface GetMerchantResponse {
  id: string;
  merchantId: string;
  businessName: string;
  logoUrl: string;
  isMerchantVerified: boolean;
  transactionWithdrawalCharge: number;
  employees: Employee[],
  vendors: Vendor[]
}
