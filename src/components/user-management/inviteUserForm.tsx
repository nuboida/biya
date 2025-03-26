"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dropdown } from "../ui/dropdown";
import toast from "../ui/toast";
import { Icons } from "../ui/Icons";
import { redirect } from "next/navigation";
import { SingleEmployee } from "@/app/(main)/user-management/models";
import { ResetPasswordButton } from "./resetPasswordButton";

interface InviteUserFormProps {
  token: string;
  merchantId: string;
  edit?: boolean;
  employee?: SingleEmployee
}

interface AddEmployeeRequest {
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}

const addEmployeeRequest = async (
  token: string,
  merchantId: string,
  request: AddEmployeeRequest
) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/addemployee`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const InviteUserForm = ({ token, merchantId, edit, employee }: InviteUserFormProps) => {
  const [employeeCred, setEmployeeCred] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
  }>({
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    phone: employee?.phone || '',
    role: "Staff",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEmployeeCred({
      ...employeeCred,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    setIsLoading(true);

    if (!edit) {
      addEmployeeRequest(token, merchantId, employeeCred).then((res) => {
        if ("error" in res) {
          toast({
            message: res.error,
            type: "error",
          });
          setIsLoading(false);
        } else {
          toast({
            message: "Employee successfully added",
            type: "success"
          });
          setIsLoading(false);
          redirect("/user-management");
        }
      });
    } else {

    }
  };

  return (
    <div className="w-96 flex flex-col gap-6">
      <div>
        <Input
          placeholder="First Name"
          name="firstName"
          onChange={handleInputChange}
          defaultValue={employeeCred.firstName}
        />
      </div>
      <div>
        <Input
          placeholder="Last Name"
          name="lastName"
          onChange={handleInputChange}
          defaultValue={employeeCred.lastName}
        />
      </div>
      <div>
        <Input
          placeholder="Phone Number"
          name="phone"
          onChange={handleInputChange}
          defaultValue={employeeCred.phone}
        />
      </div>
      <div>
        <Dropdown
          name="role"
          options={[
            { label: "Staff", value: "Staff" },
            { label: "Admin", value: "Admin" },
          ]}
          defaultValue={employeeCred.role}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          {
            edit && (
              <ResetPasswordButton token={token} employeeId={String(employee?.id)} name={`${employee?.firstName} ${employee?.lastName}`} />
            )
          }
        </div>
        <div className="flex gap-2">
          <Link href="/user-management">
            <Button>Cancel</Button>
          </Link>
          <Button className="bg-accent" onClick={onSubmit}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {
              edit ? "Edit User" : "Create User"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};
