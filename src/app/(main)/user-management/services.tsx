import { GetMerchantResponse, SingleEmployee } from "./models";

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

export const getSingleEmployee = async (
  token: string,
  employeeId: string
): Promise<SingleEmployee | void> => {
  const response = await fetch(
    `https://merch.biya.com.ng/api/v1/employees/${employeeId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};
