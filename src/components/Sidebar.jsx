import React, { useState } from "react";
// Icons
import {
  RiShoppingCartLine ,
  RiBarChart2Line ,
   RiPieChartLine,
   RiMoneyDollarBoxLine ,

} from "react-icons/ri";

const Sidebar = ({ setTipo }) => {
  return (
    <>
      <div className="flex flex-col  gap-8 h-screen w-80 ">
        {/* Profile */}
        {/* Nav */}
        <div className=" pt-2 pr-2 pl-2 rounded-t-xl h-full flex flex-col ">
          <nav className="flex flex-col gap-8 justify-around bg-base rounded-t-3xl  h-full  p-4 pt-20">
            <h1 className="font-semibold capitalize text-xl text-center">
              Monitor financiero
            </h1>
            <button
              onClick={() => setTipo("Graficas")}
              href="#"
              className="flex items-center gap-4 py-2 px-4 rounded-xl btn btn-outline  transition-colors"
            >
              <RiBarChart2Line /> Monitores financieros
            </button>
            <button
              onClick={() => setTipo("Data")}
              href="#"
              className="flex items-center gap-4 py-2 px-4 rounded-xl btn btn-outline  transition-colors"
            >
              <RiMoneyDollarBoxLine  /> Dolar
            </button>
            <button
              onClick={() => setTipo("Stock")}
              href="#"
              className="flex items-center gap-4 py-2 px-4 rounded-xl btn btn-outline  transition-colors"
            >
              <RiShoppingCartLine  /> StockMarket
            </button>
            
            <a
              href="#"
              className="flex items-center gap-4 py-2 px-4 rounded-xl btn btn-outline  transition-colors"
            >
              <RiPieChartLine /> Historial
            </a>
            <label className="flex self-center cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                value="dark"
                className="toggle theme-controller"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
