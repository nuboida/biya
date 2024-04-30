"use client";

import React from "react";
import DefaultLayout from "@/modules/layouts/DefaultLayouts/DefaultLayout";
import { AuthGuard } from "@/context/authContext";

const SettingsPage = () => {
  return (
    <AuthGuard>
      <DefaultLayout name="Settings">
        <div>Settings Page</div>
      </DefaultLayout>
    </AuthGuard>
  )
};

export default SettingsPage;
