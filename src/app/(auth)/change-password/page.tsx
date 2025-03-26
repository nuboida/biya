import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { verifySession } from "@/dal";
import Image from "next/image";
import { redirect } from "next/navigation";

const ChangePasswordPage = async () => {
  const session = await verifySession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="relative flex p-0 overflow-hidden bg-full bg-no-repeat bg-cover bg-[url('/auth-bg.png')] h-screen">
        <div className="container z-10 mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="flex items-center justify-center pb-6">
                <Image
                  src={"/logo-white.png"}
                  alt="logo"
                  width={150}
                  height={30}
                />
              </div>
              <ChangePasswordForm token={String(session.token)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
