'use client';

import React from 'react'
import DefaultLayout from '@/modules/layouts/DefaultLayouts/DefaultLayout'
import { AuthGuard } from '@/context/authContext'

const BatchesPage = () => {
  return (
    <AuthGuard>
      <DefaultLayout name="Batches">
        <div>Batches Page</div>
      </DefaultLayout>
    </AuthGuard>
  )
}

export default BatchesPage;
