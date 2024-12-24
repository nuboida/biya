const getWalletBalance = async (token: string, merchantId: string) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/wallet-balance`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getWalletTransactions = async (token: string, merchantId: string, page = 1) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/wallet-transactions?page=${page}&limit=10`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

const getPaymentRequests = async (token: string, merchantId: string) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/payment-requests`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export {
  getWalletBalance,
  getWalletTransactions,
  getPaymentRequests,
}
