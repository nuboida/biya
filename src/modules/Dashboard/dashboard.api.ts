import { MerchantPaymentRequest, RefundCustomerRequest } from "./dashboard.models";

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
    const response = await fetch('/api/merchant/payment-requests', {
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

const merchantRequestPayment = async (request: MerchantPaymentRequest, token: string) => {
  try {
    const response = await fetch('/api/merchant/request-payment', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });
    return await response.json()
  } catch (err) {
    console.log(err);
  }
}

const refundCustomer = async (request: RefundCustomerRequest, token: string) => {
  try {
    const response = await fetch('/api/merchant/refund', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });
    return await response.json()
  } catch (err) {
    console.log(err);
  }
}



export {
  getWalletBalance,
  getWalletTransactions,
  merchantRequestPayment,
  refundCustomer
}
