import React from 'react';
import DefaultLayout from '@/modules/layouts/DefaultLayouts/DefaultLayout';
import Dashboard from '@/modules/Dashboard';

const DashboardPage = () => {
  return (
    <DefaultLayout>
      <Dashboard name={'Dashboard'} />
    </DefaultLayout>
  )
}

export default DashboardPage;
