import { Icons } from "@/components/ui/Icons";
import { InviteUserForm } from "@/components/user-management/inviteUserForm";
import { verifySession } from "@/dal";
import Link from "next/link";
import { getSingleEmployee } from "../../services";

interface Props {
  params: Promise<{employeeId: string}>
}

const EditUserPage = async ({ params }: Props) => {
  const { token, merchantId } = await verifySession();
  const {employeeId} = await params;
  const employee = await getSingleEmployee(String(token), employeeId)

  return (
    <>
      <section>
        <div className="px-10 mb-10 max-md:px-5">
          <div className="flex justify-between items-center pt-10">
            <div className="mr-auto flex items-center gap-5">
              <Link href="/user-management">
                <Icons.chevronLeft className="mt-2" />
              </Link>
              <h1 className="text-3xl font-semibold">Edit Employee</h1>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="px-10 mb-10 max-md:px-5">
          <div className="w-full max-h-full bg-slated-100">
            <div className="relative rounded-lg min-h-[80vh] flex justify-center items-center">
              <InviteUserForm token={String(token)} merchantId={merchantId} edit employee={employee ? employee : {firstName: '', lastName: '', phone: '', email: '', id: ''}} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditUserPage;
