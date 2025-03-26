import { MainHeader } from "@/components/main-header";
import { verifySession } from "@/dal";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import { getMerchant } from "./service";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = async ({ children }) => {
  const session = await verifySession();
  const merchant = await getMerchant(session.token!, session.merchantId);

  if (!session) {
    redirect("/login")
  }

  if (session.set) {
    redirect("/change-password");
  }

  return (
    <>
      <MainHeader role={session.role} merchant={{businessName: merchant.businessName, merchantId: merchant.merchantId}}/>
      <main className="pt-20 container">{children}</main>
    </>
  );
};

export default MainLayout;
