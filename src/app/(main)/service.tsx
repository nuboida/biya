import { GetMerchantResponse } from "./models";

const apiUrl = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_API : process.env.DEVELOPMENT_API;

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
