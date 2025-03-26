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

export interface SingleEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface GetMerchantResponse {
  id: string;
  merchantId: number;
  businessName: string;
  employees: Employee[]
}
