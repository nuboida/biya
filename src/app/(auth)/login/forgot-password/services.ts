export const getEmployeeByToken = async (token: string) => {
  try {
    const response = await fetch(`https://merch.biya.com.ng/api/v1/auth/${token}`)
    return await response.json();
  } catch (error) {
    throw new Error(String(error))
  }
}
