export interface DashboardLayoutProps {
  name: string;
}

interface GlobalResponse {
  status: string;
  message: string;
  code: number;
}

export interface WalletResponse extends GlobalResponse {
  data: {
    balance: number
  }
};

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
      updateAt: string;
      __v: number;
      customer: {
        _id: string;
        name: string;
        email: string;
      }
  }

export interface WalletTransactionsResponse extends GlobalResponse {
  data: WalletTransactions[]
}
