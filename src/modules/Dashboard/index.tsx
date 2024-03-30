import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="mt-4 grid grid-cols-12 grid-rows-5 gap-4">

      {/* Item 1 */}

      <div className="col-span-8 rounded-sm border border-stroke bg-black px-5 pb-5 pt-7">
        <div className="flex flex-col flex-wrap items-start justify-between gap-3 pl-8 pb-12">
          <h6 className="text-white text-l">Wallet</h6>
          <h1 className="text-white text-4xl font-extrabold">$100,000</h1>
        </div>
      </div>

      {/* Item 2 */}
      <div className="col-span-4 rounded-sm border border-stroke bg-white p-7 row-span-3 shadow-default border-black border-1">
        <div className="mb-4 justify-between gap-4">
          <div>
            <h4 className="text-xl font-semibold text-black">
              Create New Transaction
            </h4>
          </div>
          <div className="flex flex-col">
            <label htmlFor="option">Select An Option</label>
            <select className="border border-1 border-black">
              <option value="">Airtime</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="csv">Upload Csv</label>
            <input type="text" className="border border-1 border-black" />
          </div>
          <div>
            <button className="border border-1 border-black bg-black text-white">Upload Csv</button>
          </div>
        </div>
      </div>

      {/* Item 3 */}
      <div className="col-span-8 rounded-sm border border-stroke bg-white p-7 row-span-12 shadow-default border-black border-1">

      </div>

      {/* Item 4 */}
      <div className="col-span-4 rounded-sm border border-stroke bg-white p-7 row-span-10 shadow-default border-black border-1">
        <div className="mb-4 justify-between gap-4">
          <div>
            <h4 className="text-xl font-semibold text-black">
              Create New Transaction
            </h4>
          </div>
          <div className="flex flex-col">
            <label htmlFor="option">Select An Option</label>
            <select className="border border-1 border-black">
              <option value="">Airtime</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="csv">Upload Csv</label>
            <input type="text" className="border border-1 border-black" />
          </div>
          <div>
            <button className="border border-1 border-black bg-black text-white">Upload Csv</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
