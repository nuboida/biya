"use client"

import { BiyaButton } from "@/components/BiyaButton"
import { BiyaInput } from "@/components/BiyaInput"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

const ForgotPasswordEmail = () => {
  const {register, handleSubmit} = useForm({
    mode: 'onChange'
  });

  const onSubmit = (req: FieldValues): void => {
    console.log(req);
  }

  return (
    <div className="lg:p-14 2xl:p-28 max-lg:px-5">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10 grid grid-cols-6 lg:gap-8 2xl:gap-12 max-lg:flex max-lg:flex-col">
            <BiyaInput
              name="email"
              type="text"
              required
              label="Email"
              register={register("email")}
            />
          </div>
          <div className="py-10">
            <BiyaButton label="Submit" />
          </div>
        </form>
      </div>
  )
}

export default ForgotPasswordEmail;
