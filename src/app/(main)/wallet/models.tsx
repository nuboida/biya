export interface WalletTransactionModel {
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


export interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: string;
}
