export interface Employee {
  id: string;
  employeeId: string;
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

export interface RolesResponse {
  merchant: string;
  employee: string;
  role: string;
}

export interface ErrorResponse {
  error: string;
}

export interface AddEmployeeRequest {
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}

export interface GeneralResponse {
  message: string;
}
