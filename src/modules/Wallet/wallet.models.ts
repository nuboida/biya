interface GlobalResponse {
  status: string;
  message: string;
  code: number;
}

export interface WalletTransactions {
  _id: string;
  userId: string;
  transactionType: string;
  reference: string;
  balance: number;
  difference: number;
  modelResponsible: string;
  modelId: string;
  createdAt: string;
  updatedAt: string;
  customer: {
    _id: string;
    name: string;
    email: string;
  }
}

export interface WalletTransactionsResponse extends GlobalResponse {
  data: WalletTransactions[];
}

export interface WalletBalanceResponse extends GlobalResponse {
  data: {
    balance: number;
  }
}
