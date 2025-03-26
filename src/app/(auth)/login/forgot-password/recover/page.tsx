import Image from "next/image";

const RecoverPage = () => {
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
                        width="100"
                        height="100"
                        viewBox="0 0 167 138"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_127_33773)">
                          <rect
                            x="0.207031"
                            y="0.62207"
                            width="166.649"
                            height="137.051"
                            fill="#0D67AA"
                          />
                          <g clipPath="url(#clip1_127_33773)">
                            <path
                              d="M116.866 73.6175C113.305 72.3561 109.46 72.1291 105.775 72.9627C102.09 73.7963 98.7173 75.6563 96.046 78.3276C93.3748 80.9988 91.5147 84.372 90.6811 88.0566C89.8475 91.7412 90.0746 95.5865 91.3359 99.1475H53.5326C52.6485 99.1475 51.8007 98.7963 51.1755 98.1712C50.5504 97.546 50.1992 96.6982 50.1992 95.8141V42.4808C50.1992 41.5967 50.5504 40.7489 51.1755 40.1238C51.8007 39.4987 52.6485 39.1475 53.5326 39.1475H113.533C114.417 39.1475 115.264 39.4987 115.89 40.1238C116.515 40.7489 116.866 41.5967 116.866 42.4808V73.6175ZM83.7326 68.0908L62.3592 49.9408L58.0426 55.0208L83.7759 76.8708L109.046 55.0041L104.686 49.9608L83.7359 68.0908H83.7326ZM113.533 89.1475H123.533V95.8141H113.533V105.814H106.866V95.8141H96.8659V89.1475H106.866V79.1475H113.533V89.1475Z"
                              fill="white"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_127_33773">
                            <rect
                              width="166.649"
                              height="137.051"
                              fill="white"
                              transform="translate(0.207031 0.62207)"
                            />
                          </clipPath>
                          <clipPath id="clip1_127_33773">
                            <rect
                              width="80"
                              height="80"
                              fill="white"
                              transform="translate(43.5312 29.1475)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="text-center mb-3">
                      <h1 className="text-6xl font-mono">Check Your Mail</h1>
                      <p>
                        We have sent a link to your email to help you recover
                        your password
                      </p>
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

export default RecoverPage;
