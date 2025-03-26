import { Icons } from "@/components/ui/Icons";
import { InviteUserForm } from "@/components/user-management/inviteUserForm";
import { verifySession } from "@/dal";
import Link from "next/link";

const InviteUserPage = async () => {
  const { token, merchantId } = await verifySession();

  return (
    <>
      <section>
        <div className="px-10 mb-10">
          <div className="flex justify-between items-center pt-10">
            <div className="mr-auto flex items-center gap-5">
              <Link href="/user-management">
                <Icons.chevronLeft className="mt-2" />
              </Link>
              <h1 className="text-3xl font-semibold">Invite User</h1>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="px-10 mb-10">
          <div className="w-full max-h-full bg-slated-100">
            <div className="relative rounded-lg min-h-[80vh] flex justify-center items-center">
              <InviteUserForm token={String(token)} merchantId={merchantId} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InviteUserPage;
