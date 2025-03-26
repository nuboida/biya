import { RegisterForm } from "@/components/auth/register-form";
import Image from "next/image";
import Link from "next/link";


const SignupPage = async () => {

  return (
    <>
        <div className="relative flex p-0 overflow-hidden bg-center bg-cover h-screen 2xl:py-10 lg:py-5">
          <div className="container z-10">
            <div className="flex flex-wrap mt-0 -mx-3">
            <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
              <div>
                <Image src={"/logo.png"} alt="logo" width={150} height={30} />
              </div>
                <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                  <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                    <h3 className="relative z-10 2xl:text-7xl lg:text-5xl font-mono">Let&apos;s Get You Started</h3>
                    <p className="mb-0">Already have an account? <Link href="/login" className="text-accent font-semibold">Log In</Link></p>
                  </div>
                  <RegisterForm />
                </div>
              </div>
              <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
                <div className="lg:w-[80%] 2xl:w-full">
                  <Image src={"/auth-image.png"} alt="image" width={665.53} height={850.87} className="min-w-[60%] h-full"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default SignupPage;
