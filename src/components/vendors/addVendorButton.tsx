"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button";

export const AddVendorButton = () => {
  const router = useRouter();
  return (
    <div>
      <Button size="default" className="bg-accent hover:bg-accent/60 active:bg-primary-100 text-white px-10" onClick={() => {
        router.push("/vendors/add-vendor")
      }}>
        Add Vendor
      </Button>
    </div>
  )
}
