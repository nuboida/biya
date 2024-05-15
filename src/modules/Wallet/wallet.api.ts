
const getWalletBalance = async (token: string) => {
  try {
    const response = await fetch('/api/merchant/wallet-balance', {
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

const getWalletTransactions = async (token: string) => {
  try {
    const response = await fetch('/api/merchant/wallet-transactions', {
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
  getWalletTransactions
}
