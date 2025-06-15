"use client";

import Link from "next/link"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { ChangeEvent, useState } from "react";
import { Icons } from "../ui/Icons";
import toast from "../ui/toast";
import { redirect } from "next/navigation";

interface AddVendorFormProps {
  token: string;
  merchantId: string;
}

interface AddVendorRequest {
  name: string;
  phone: string;
  email: string;
}

const addVendorRequest = async (
  token: string,
  merchantId: string,
  request: AddVendorRequest
) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/addvendor`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });

    return await response.json()
  } catch (error) {
    console.log(error);
  }
}

export const AddVendorForm = ({ token, merchantId }: AddVendorFormProps) => {
  const [vendorCred, setVendorCred] = useState<AddVendorRequest>({
    name: '',
    phone: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVendorCred({...vendorCred, [event.target.name]: event.target.value});
  }

  const onSubmit = () => {
    setIsLoading(true);

    addVendorRequest(token, merchantId, vendorCred).then(res => {
      if ('error' in res) {
        toast({
          message: res.error,
          type: "error"
        });
        setIsLoading(false);
      } else {
        toast({
          message: "Vendor successfully added",
          type: "success"
        });
        setIsLoading(false);
        redirect("/vendors");
      }
    })
  }

  return (
    <div className="w-96 flex flex-col gap-6 max-md:w-[90%]">
      <div>
        <Input
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
          defaultValue={vendorCred.name}
        />
      </div>
      <div>
        <Input
          placeholder="Phone"
          name="phone"
          onChange={handleInputChange}
          defaultValue={vendorCred.phone}
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          defaultValue={vendorCred.email}
        />
      </div>
      <div className="flex justify-between items-center">
        <div></div>
        <div className="flex gap-2">
          <Link href="/vendors/add-vendor">
            <Button>Cancel</Button>
          </Link>
          <Button className="bg-accent" disabled={isLoading} onClick={onSubmit}>
            { isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
            Add Vendor
          </Button>
        </div>
      </div>
    </div>
  )
}
