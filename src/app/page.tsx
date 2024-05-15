import { AuthGuard } from "@/context/authContext"
import Dashboard from "@/modules/Dashboard"
import DefaultLayout from "@/modules/layouts/DefaultLayouts/DefaultLayout"

export default function Home() {
  return (
    <>
    <AuthGuard>
      <DefaultLayout name="Dashboard">
        <Dashboard name="dashboard" />
      </DefaultLayout>
    </AuthGuard>
    </>
  )
}
