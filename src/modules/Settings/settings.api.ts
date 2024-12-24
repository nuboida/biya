import { AddEmployeeRequest } from "./settings.model";

const getMerchant = async (token: string, merchantId: string, signal: AbortSignal) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}`, {
      signal,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

const addEmployeeRequest = async (token: string, merchantId: string, request: AddEmployeeRequest) => {
  try {
    const response = await fetch(`api/merchants/${merchantId}/addemployee`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

const getRoles = async (token: string, merchantId: string) => {
  try {
    const response = await fetch(`api/merchants/${merchantId}/getroles`, {
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

const removeEmployee = async (token: string, merchantId: string, employeeId: number) => {
  try {
    const response = await fetch(`api/merchants/${merchantId}/remove-employee`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({employeeId})
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export {
  getMerchant,
  addEmployeeRequest,
  getRoles,
  removeEmployee
}
