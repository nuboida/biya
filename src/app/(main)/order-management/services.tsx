import { PaymentRequestsResponse } from "./models";

export const getPaymentRequests = async (token: string, merchantId: string): Promise<PaymentRequestsResponse[]> => {
  try {
    const response = await fetch(`https://merch.biya.com.ng/api/v1/merchants/${merchantId}/payment-requests`, {
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

export const getSinglePaymentRequest = async (token: string, merchantId: string, paymentRequestId: string): Promise<PaymentRequestsResponse> => {
  try {
    const response = await fetch(`https://merch.biya.com.ng/api/v1/merchants/${merchantId}/${paymentRequestId}/payment-request`, {
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
