import { VendorResponse } from "./models";

export const getSingleVendor = async (token: string, vendorId: string): Promise<VendorResponse> => {
  try {
    const response = await fetch(`https://merch.biya.com.ng/api/v1/merchants/vendor/${vendorId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    return await response.json();
  } catch (error) {
    throw new Error(String(error))
  }
}

export const getBanks = async (token: string) => {
  try {
    const response = await fetch(`https://merch.biya.com.ng/api/v1/banks`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
