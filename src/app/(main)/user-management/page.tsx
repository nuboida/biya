import { InviteUserButton } from "@/components/user-management/inviteUserButton";
import { Button } from "@/components/ui/button";
import { verifySession } from "@/dal";
import { getMerchant } from "./services";
import { Employee } from "./models";
import { ActivateButton } from "@/components/user-management/activateButton";
import Link from "next/link";

const UserManagementPage = async () => {
  const { token, merchantId } = await verifySession();
  const merchant = await getMerchant(token!, merchantId);

  return (
    <>
      <section>
        <div className="px-10 mb-10 max-md:px-5">
          <div className="flex justify-between items-center pt-10">
            <div className="mr-auto">
              <h1 className="text-3xl font-semibold max-lg:text-xl">Assign Agents</h1>
              <p className="max-lg:w-10/12">Invite agents from your business to manage transactions</p>
            </div>
            <InviteUserButton />
          </div>
        </div>
      </section>
      <section className="mt-10">
        <div className="px-10 mb-10 max-md:px-5">
          <div className="w-full max-h-full bg-slated-100">
            <div className="relative rounded-lg min-h-[80vh]">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold dark:text-white">
                  All Agents
                </h3>
              </div>
              <div className="flex min-w-full flex-col rounded-xl">
                <div className="grow overflow-auto max-h-[68vh] scrollbar">
                  <table className="table w-full table-auto border-collapse border-0 text-left align-middle leading-5">
                    <thead className="text-xs">
                      <tr>
                        <th className="w-[50px] tableHeader">#</th>
                        <th className="min-w-[50px] tableHeader">Name</th>
                        <th className="min-w-[50px] tableHeader">Employee Id</th>
                        <th className="min-w-[120px] tableHeader">
                          Email Address
                        </th>
                        <th className="min-w-[100px] tableHeader">
                          Phone Number
                        </th>
                        <th className="min-w-[50px] tableHeader">
                          Role
                        </th>
                        <th className="min-w-[50px] tableHeader">Status</th>
                        <th className="tableHeader w-[200px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {merchant.employees.map((employee: Employee, i) => (
                        <tr key={employee.id}>
                          <td className="tableData">{i + 1}</td>
                          <td className="tableData">{`${employee.firstName} ${employee.lastName}`}</td>
                          <td className="tableData">{employee.employeeId}</td>
                          <td className="tableData">{employee.email}</td>
                          <td className="tableData">{employee.phone}</td>
                          <td className="tableData">{employee.role}</td>
                          <td className="tableData">{employee.active ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>}</td>
                          <td className="tableData flex gap-1">
                            {
                              employee.role !== "Owner" && (
                                <Link href={`/user-management/edit-user/${employee.id}`}>
                                  <Button className="bg-accent text-white">
                                    Edit
                                  </Button>
                                </Link>
                              )
                            }
                            {
                              employee.role !== "Owner" && (
                                <ActivateButton name={`${employee.firstName} ${employee.lastName}`} active={employee.active} token={String(token)} merchantId={merchantId} employeeId={employee.id} />
                              )
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserManagementPage;
