export interface VendorResponse {
  _id: string;
  merchant: string;
  name: string;
  email: string;
  phone: string;
  bankAccount: {
    accountNumber: string;
    bankCode: string;
    _id: string;
    recipientCode: string;
  }
}

export interface VendorTransactionsResponse {
  _id: string;
  vendor: string;
  amount: number;
  createdAt: string;
  reason: string;
}

export interface BanksResponse {
  code: string;
  name: string;
  slug: string;
  longCode: string;
}
