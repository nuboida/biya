import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-9999 flex w-full bg-white">
      <div className="flex flex-grow items-center justify-between px-4 py-12 md:px-6 2xl:px-11">
        <h1 className="text-4xl font-semibold">Header</h1>
      </div>
    </header>
  )
}

export default Header;
