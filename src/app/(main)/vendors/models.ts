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

export interface BanksResponse {
  code: string;
  name: string;
  slug: string;
  longCode: string;
}
