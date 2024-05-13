'use client';

import React from "react";
import DefaultLayout from "@/modules/layouts/DefaultLayouts/DefaultLayout";
import { AuthGuard } from "@/context/authContext";
import Wallet from "@/modules/Wallet";

const WalletPage = () => {
  return (
    <AuthGuard>
      <DefaultLayout name="Wallet">
        <Wallet />
      </DefaultLayout>
    </AuthGuard>
  )
}

export default WalletPage
