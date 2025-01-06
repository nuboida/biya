import { MerchantPaymentRequest,  RefundRequest, WithdrawFundsRequest } from "./dashboard.models";

const getEmployee = async (token: string, employeeId: string) => {
  try {
    const response = await fetch(`/api/employee/${employeeId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    console.log(error)
  }
}

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

const merchantRequestPayment = async (request: MerchantPaymentRequest, token: string, merchantId: string) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/request-payment`, {
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

const refundCustomerRequest = async (token: string, merchantId: string, request: RefundRequest) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/refund`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

const withdrawFunds = async (token: string, merchantId: string, request: WithdrawFundsRequest) => {
  try {
    const response = await fetch(`api/merchants/${merchantId}/withdraw`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });
    return await response.json();
  } catch (error) {
    console.log(error)
  }
}

const getMerchantAccounts = async (token: string, merchantId: string) => {
  try {
    const response = await fetch(`api/merchants/${merchantId}/get-accounts`, {
      method : "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

const getBanks = async (token: string) => {
  try {
    const response = await fetch(`api/banks`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}



export {
  getEmployee,
  getWalletBalance,
  getPaymentRequests,
  merchantRequestPayment,
  refundCustomerRequest,
  withdrawFunds,
  getMerchantAccounts,
  getBanks
}
