'use client';

import React from "react";
import DefaultLayout from "@/modules/layouts/DefaultLayouts/DefaultLayout";
import { AuthGuard } from "@/context/authContext";

const TransactionsPage = () => {
  return (
    <AuthGuard>
      <DefaultLayout name="Transactions">
        <div>Transactions Page</div>
      </DefaultLayout>
    </AuthGuard>
  )
};

export default TransactionsPage;
