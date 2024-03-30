import Dashboard from "@/modules/Dashboard";
import DefaultLayout from "@/modules/layouts/DefaultLayouts/DefaultLayout";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  )
}
