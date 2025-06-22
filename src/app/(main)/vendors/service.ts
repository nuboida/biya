import { VendorResponse } from "./models";

const apiUrl = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_API : process.env.DEVELOPMENT_API;

export const getSingleVendor = async (token: string, vendorId: string): Promise<VendorResponse> => {
  try {
    const response = await fetch(`${apiUrl}/merchants/vendor/${vendorId}`, {
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
    const response = await fetch(`${apiUrl}/banks`, {
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
