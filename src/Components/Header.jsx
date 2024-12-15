import React from "react";

function Header() {
  return (
    <header className="py-8">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center text-[#39ff14] tracking-wider">
          Rick and Morty Characters
        </h1>
        <div className="w-full max-w-lg mx-auto h-0.5 mt-4 bg-gradient-to-r from-transparent via-[#39ff14] to-transparent"></div>
      </div>
    </header>
  );
}

export default Header;
