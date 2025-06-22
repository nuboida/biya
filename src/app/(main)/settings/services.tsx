import { GetMerchantResponse } from "./model";
// const apiUrl = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_API : process.env.DEVELOPMENT_API;

const apiUrl = "https://merchant.biyabot.com.ng/api/v1";
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
