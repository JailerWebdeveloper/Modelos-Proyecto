import React from "react";
// Icons
import { RiSearch2Line } from "react-icons/ri";

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold">
        Projecto de Modelos <span className="text-primary-100">Supuestamente predictivo</span>
      </h1>
    </header>
  );
};

export default Header;
