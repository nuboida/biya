"use client";
import React from 'react';
import DefaultLayout from '@/modules/layouts/DefaultLayouts/DefaultLayout';
import Dashboard from '@/modules/Dashboard';
import { AuthGuard } from '@/context/authContext';

const DashboardPage = () => {
  return (
      <AuthGuard>
        <DefaultLayout name='Dashboard'>
          <Dashboard name={'Dashboard'} />
        </DefaultLayout>
      </AuthGuard>
  )
}

export default DashboardPage;
