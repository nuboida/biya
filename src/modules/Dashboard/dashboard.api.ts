const getWalletBalance = async (token: string) => {
  try {
    const response = await fetch('http://merch.biya.com.ng:5000/api/v1/merchant/wallet-balance', {
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
  const response = await fetch('http://merch.biya.com.ng:5000/api/v1/merchant/wallet-transactions', {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  return await response.json();
}
export {
  getWalletBalance,
  getWalletTransactions
}
