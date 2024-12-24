export const getEmployee = async (token: string, employeeId: string) => {
  try {
    const response = await fetch(`/api/employee/${employeeId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    console.log(error)
  }
}
