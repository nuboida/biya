import { PaymentRequestsResponse } from "./models";

const apiUrl = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_API : process.env.DEVELOPMENT_API;

export const getPaymentRequests = async (token: string, merchantId: string, employeeId?: string): Promise<PaymentRequestsResponse[]> => {
  try {
    let response;
    if (!employeeId) {
      response = await fetch(`${apiUrl}/merchants/${merchantId}/payment-requests?employeeId=`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
    } else {
      response = await fetch(`${apiUrl}/merchants/${merchantId}/payment-requests?employeeId=${employeeId}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
    }
    return await response.json();
  } catch (err) {
    throw new Error(String(err))
  }
}

export const getSinglePaymentRequest = async (token: string, merchantId: string, paymentRequestId: string): Promise<PaymentRequestsResponse> => {
  try {
    const response = await fetch(`${apiUrl}/merchants/${merchantId}/${paymentRequestId}/payment-request`, {
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
