import { MerchantPaymentRequest, RefundCustomerRequest } from "./dashboard.models";

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
  try {
    const response = await fetch('http://merch.biya.com.ng:5000/api/v1/merchant/payment-requests', {
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
    const response = await fetch('http://merch.biya.com.ng:5000/api/v1/merchant/request-payment', {
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
    const response = await fetch('http://merch.biya.com.ng:5000/api/v1/merchant/refund', {
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
