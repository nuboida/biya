import React from "react";

interface HeaderPageProps {
  name: string;
}

const Header: React.FC<HeaderPageProps> = ({name}) => {
  return (
    <header className="top-0 z-9999 flex w-full bg-white">
      <div className="flex flex-grow items-center justify-between px-4 py-12 md:px-6 2xl:px-11">
        <h1 className="text-4xl font-semibold">{name}</h1>
      </div>
    </header>
  )
}

export default Header;
