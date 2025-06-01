import { Icons } from "@/components/ui/Icons"
import Link from "next/link"

const VendorPage = async () => {
  return (
    <>
      <section>
        <div className="px-10 mb-10">
          <div className="flex justify-between items-center pt-10">
            <div className="mr-auto flex items-center gap-5">
              <Link href="/vendors">
                <Icons.chevronLeft className="mt-2" />
              </Link>
              <h1 className="text-3xl font-semibold">Vendor</h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="px-10 mb-10">
          <div className="w-full max-h-full bg-slated-100">
            <div className="relative rounded-lg min-h-[60vh] flex flex-col justify-center items-center py-10">
              <div className="w-1/2 flex flex-col gap-6 bg-white py-10 px-2">
                <div className="flex justify-between px-8">
                  <h4 className="font-semibold">Name:</h4>
                  <h6>Laurence</h6>
                </div>
                <div className="flex justify-between px-8">
                  <h4 className="font-semibold">Email:</h4>
                  <h6>Fill Email</h6>
                </div>
                <div className="flex justify-between px-8">
                  <h4 className="font-semibold">Phone:</h4>
                  <h6>Fill Phone</h6>
                </div>
                <div className="flex justify-between items-center px-8">
                  <h4 className="font-semibold">Account:</h4>
                  <div className="text-black mb-4 flex items-center border border-blue-500 gap-4 py-4 pl-8 pr-2">
                    <div className="w-[30px] h-[30px] border relative"></div>
                    <h1 className="mr-auto text-lg">Bank name</h1>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default VendorPage
