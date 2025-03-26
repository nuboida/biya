import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
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
                        viewBox="0 0 59 57"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.4019 46.4039L0.513672 56.5294V3.00919C0.513672 2.24193 0.818467 1.50609 1.36101 0.963546C1.90355 0.421006 2.63939 0.116211 3.40666 0.116211H55.4804C56.2476 0.116211 56.9835 0.421006 57.526 0.963546C58.0685 1.50609 58.3733 2.24193 58.3733 3.00919V43.511C58.3733 44.2782 58.0685 45.0141 57.526 45.5566C56.9835 46.0992 56.2476 46.4039 55.4804 46.4039H13.4019ZM33.5371 23.2601L40.6943 16.0999L36.6036 12.0093L29.4435 19.1694L22.2834 12.0064L18.1927 16.0999L25.3528 23.2601L18.1898 30.4202L22.2805 34.5109L29.4435 27.3508L36.6036 34.5109L40.6943 30.4202L33.5342 23.2601H33.5371Z"
                          fill="#0D67AA"
                        />
                      </svg>
                    </div>
                    <div className="text-center mb-3">
                      <h1 className="text-6xl font-mono">
                        Please Verify Email
                      </h1>
                      <p>
                        Key cannot be verified... try registering business and
                        click link sent to email.
                      </p>
                    </div>
                    <div className="flex justify-center items-center">
                      <Link href={"/register"} className="text-blue-700 font-bold underline">Go to signup</Link>
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

export default NotFound;
