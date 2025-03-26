export const getWalletBalance = async (token: string, merchantId: string) => {
  try {
    const response = await fetch(`https://merch.biya.com.ng/api/v1/merchants/${merchantId}/wallet-balance`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (err) {
    throw new Error(String(err))
  }
};

export const getWalletTransactions = async (token: string, merchantId: string, page = 1) => {
  try {
    const response = await fetch(`https://merch.biya.com.ng/api/v1/merchants/${merchantId}/wallet-transactions?page=${page}&limit=100`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (err) {
    throw new Error(String(err))
  }
}
