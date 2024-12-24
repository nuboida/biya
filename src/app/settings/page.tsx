"use client";

import React from "react";
import DefaultLayout from "@/modules/layouts/DefaultLayouts/DefaultLayout";
import { AuthGuard } from "@/context/authContext";
import Settings from "@/modules/Settings";

const SettingsPage = () => {
  return (
    <AuthGuard>
      <DefaultLayout name="Settings">
        <Settings />
      </DefaultLayout>
    </AuthGuard>
  )
};

export default SettingsPage;
