import { GetMerchantResponse } from "./models";

export const getMerchant = async (
  token: string,
  merchantId: string
): Promise<GetMerchantResponse> => {
  const response = await fetch(
    `https://merch.biya.com.ng/api/v1/merchants/${merchantId}`,
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
