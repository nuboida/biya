"use client";
import React, { useContext } from "react";
import { DashboardLayoutProps } from "./dashboard.models";
import { BiyaInput } from "@/components/BiyaInput";
import { BiyaButton } from "@/components/BiyaButton";
import { BiyaSelect } from "@/components/BiyaSelect";
import BiyaTable from "@/components/Table";

const Dashboard = ({name: string}: DashboardLayoutProps) => {
  return (
    <div className="mt-4 grid grid-cols-12 grid-rows-5 gap-4">

      {/* Item 1 */}

      <div className="dashboard lg:col-span-7 rounded border border-stroke bg-primary px-5 pb-5 pt-7 2xl:col-span-8">
        <div className="flex flex-col flex-wrap items-start justify-between gap-3 pl-8 pb-12">
          <h6 className="text-white text-l">WALLET BALANCE</h6>
          <h1 className="text-white text-5xl font-extrabold">&#x20A6;100,000</h1>
        </div>
      </div>

      {/* Item 2 */}
      <div className="lg:col-span-5 2xl:col-span-4 rounded border border-stroke bg-white p-7 row-span-2 shadow-default border-black border-1">
        <div className="mb-4 justify-between gap-4">
          <div>
            <h4 className="text-xl font-semibold text-black pb-5">
              Create New Transaction
            </h4>
          </div>
          <div className="flex flex-col">
            <BiyaSelect name="csvSelect" label="Select An Option"/>
          </div>
          <div className="flex flex-col">
            <BiyaInput name="uplodad csv" label="Upload CSV"/>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm underline mb-1 text-primary">Download Sample CSV for Data</p>
              <p className="text-sm underline text-primary">Download Sample CSV for Airtime</p>
            </div>
            <BiyaButton label="Upload Csv"/>
          </div>
        </div>
      </div>

      {/* Item 3 */}
      <div className="lg:col-span-7 2xl:col-span-8 rounded border border-stroke bg-white py-7 px-2 row-span-4 shadow-default border-black border-1">
        <BiyaTable />
      </div>

      {/* Item 4 */}
      <div className="lg:col-span-5 2xl:col-span-4 rounded border border-stroke bg-white p-7 row-span-3 shadow-default border-black border-1">
        <div className="mb-4 justify-between gap-4">
          <div>
            <h4 className="text-xl font-semibold text-black pb-5">
              Single Recharge
            </h4>
          </div>
          <div className="flex flex-col">
            <BiyaInput name="uplodad csv" label="Upload CSV"/>
          </div>
          <div className="flex flex-col">
            <BiyaSelect name="csvSelect" label="Select An Option"/>
          </div>
          <div className="flex flex-col">
            <BiyaInput name="uplodad csv" label="Upload CSV"/>
          </div>
          <div className="flex flex-row-reverse">
            <BiyaButton label="Upload Csv"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
