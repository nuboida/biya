'use client';

import React from "react";
import DefaultLayout from "@/modules/layouts/DefaultLayouts/DefaultLayout";
import { AuthGuard } from "@/context/authContext";

const WalletPage = () => {
  return (
    <AuthGuard>
      <DefaultLayout name="Wallet">
        <div>Wallet page</div>
      </DefaultLayout>
    </AuthGuard>
  )
}

export default WalletPage
