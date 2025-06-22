import { GetMerchantResponse, PaymentRequestModel, WalletBalanceResponse } from "./model";

const apiUrl = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_API : process.env.DEVELOPMENT_API

export const getPaymentRequests = async (token: string, merchantId: string): Promise<PaymentRequestModel[]> => {
  try {
    const response = await fetch(`${apiUrl}/merchants/${merchantId}/payment-requests?employeeId=`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return await response.json()
  } catch (error) {
    throw new Error(String(error))
  }
}

export const getWalletBalance = async (token: string, merchantId: string): Promise<WalletBalanceResponse> => {
  try {
    const response = await fetch(`${apiUrl}/merchants/${merchantId}/wallet-balance`, {
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

export const getMerchant = async (
  token: string,
  merchantId: string
): Promise<GetMerchantResponse> => {
  const response = await fetch(
    `${apiUrl}/merchants/${merchantId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};
