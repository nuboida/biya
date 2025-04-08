export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  active: boolean;
  role: string;
}


export interface GetMerchantResponse {
  id: string;
  merchantId: string;
  businessName: string;
  businessEmail: string;
  employees: Employee[]
}
