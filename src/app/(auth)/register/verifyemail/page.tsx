import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  searchParams: Promise<{ key: string }>;
}

const VerifyEmailPage = async ({ searchParams }: Props) => {
  const { key } = await searchParams;

  const verifyKey = async () => {
    try {
      const response = await fetch(
        `https://merch.biya.com.ng/api/v1/auth/verifyemail?key=${key}`
      );
      return await response.json();
    } catch (error) {
      if (error) {
        notFound();
      }
    }
  };

  await verifyKey();

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
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className=" flex justify-center items-center pb-9">
                      <svg
                        width="91"
                        height="90"
                        viewBox="0 0 91 90"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_127_35837)">
                          <rect
                            x="-37.4531"
                            y="0.00488281"
                            width="166.649"
                            height="137.051"
                            fill="#0D67AA"
                          />
                          <g clipPath="url(#clip1_127_35837)">
                            <path
                              d="M42.12 50.9527L59.355 33.7158L62.0081 36.3671L42.12 56.2552L30.1875 44.3227L32.8388 41.6714L42.12 50.9527Z"
                              fill="white"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_127_35837">
                            <rect
                              width="90"
                              height="90"
                              fill="white"
                              transform="translate(0.546875 0.00488281)"
                            />
                          </clipPath>
                          <clipPath id="clip1_127_35837">
                            <rect
                              width="45"
                              height="45"
                              fill="white"
                              transform="translate(23.3711 22.5049)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="text-center mb-3">
                      <h1 className="text-6xl font-mono">Business Registered</h1>
                      <p>
                        Business has successfully been registered.
                      </p>
                    </div>
                    <div className="flex justify-center items-center">
                      <Link href={"/login"} className="text-blue-700 font-bold underline">Login</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailPage;
