import React, { useState } from "react";
// Icons
import {
  RiHome3Line,
  RiFileCopyLine,
  RiWalletLine,
  RiPieChartLine,
  RiMore2Fill,
  RiCloseFill,
} from "react-icons/ri";

const Sidebar = ({setTipo}) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div
        className=" hidden md:flex flex-col justify-between gap-8  bg-gray-100 min-h-screen max-h-screen w-80 "
      >
        {/* Profile */}
        {/* Nav */}
        <div className="bg-primary-300 p-8  h-full overflow-y-scroll flex flex-col justify-around">
          <h1 className="text-2xl font-bold text-center text-white">Menu de navegacion</h1>
          <nav className="flex flex-col gap-8">
            <button 
              onClick={() => setTipo("Graficas")}
              href="#"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiHome3Line /> Monitores financieros
            </button>
            <a
              href="#"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiFileCopyLine /> Graficas
            </a>
            <a
              href="#"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiWalletLine /> Predicciones
            </a>
            <a
              href="#"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiPieChartLine /> Historial
            </a>
          </nav>
          <div className="bg-primary-900/50 text-white p-4 rounded-xl">
            <p className="text-gray-400">Problemas?</p>
            <a href="#">No nos llame</a>
          </div>
        </div>
      </div>
      {/* Button mobile */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="lg:hidden fixed right-4 bottom-4 text-2xl bg-primary-900 p-2.5 rounded-full text-white z-50"
      >
        {showMenu ? <RiCloseFill /> : <RiMore2Fill />}
      </button>
    </>
  );
};

export default Sidebar;
