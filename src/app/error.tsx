"use client";

export default function GlobalError() {
  return (
    <>
      <div className="w-[75%] max-w-[700px] my-6 mx-auto flex flex-col items-center">
        <div className="w-[75%] h-52 py-4 px-0">
          <svg className="max-w-full max-h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.5 74.769">
            <path
              fill="#C7CCDB"
              d="M58.073 74.769H32.426l6.412-19.236h12.824z"
            />
            <path
              fill="#373F45"
              d="M90.5 52.063c0 1.917-2.025 3.471-4.525 3.471H4.525C2.025 55.534 0 53.98 0 52.063V3.471C0 1.554 2.026 0 4.525 0h81.449c2.5 0 4.525 1.554 4.525 3.471v48.592z"
            />
            <path
              fill="#F1F2F2"
              d="M84.586 46.889c0 1.509-1.762 2.731-3.936 2.731H9.846c-2.172 0-3.933-1.223-3.933-2.731V8.646c0-1.508 1.761-2.732 3.933-2.732H80.65c2.174 0 3.936 1.225 3.936 2.732v38.243z"
            />
            <path
              fill="#A2A7A5"
              d="M16.426 5.913L8.051 23h13l-6.875 12.384L26.75 46.259l-8.375-11.375L26.75 20H14.625l6.801-14.087zM68.551 49.62l-8.375-17.087h13l-6.875-12.384L78.875 9.274 70.5 20.649l8.375 14.884H66.75l6.801 14.087z"
            />
          </svg>
        </div>
        <h1 className="text-red-500 text-5xl font-semibold text-center">500 ERROR</h1>
        <div className="bg-[#FEFEFE] w-[80%] h-auto p-4 border border-[#DCDCDC] border-r-8">
          <h2 className="text-xl">
            Sorry, something went wrong on our end. We are currently trying to
            fix the problem.
          </h2>

          <div className="flex flex-row w-full h-6 my-2 mx-0">
            <svg
              className="w-5 h-5 self-center"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 60 60"
            >
              <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30   S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"></path>
              <path d="M30,6c-0.552,0-1,0.447-1,1v23H14c-0.552,0-1,0.447-1,1s0.448,1,1,1h16c0.552,0,1-0.447,1-1V7C31,6.447,30.552,6,30,6z"></path>
            </svg>
            <p className="inline-block w-[80%] pl-2">Try again later</p>
          </div>
        </div>
      </div>
    </>
  );
}
