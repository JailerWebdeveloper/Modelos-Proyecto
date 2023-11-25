import React from "react";
import { useState, useEffect } from "react";
import StockHistoryChart from "../Acciones";

const Stock = () => {
  return (
    <div className="h-full w-full overflow-y-auto">
      <section className="grid grid-cols-3 bg-gray-200  h-full place-content-center p-10 gap-8">
        <div className="p-4 bg-white rounded-xl drop-shadow-2xl">
          <StockHistoryChart />
        </div>
      </section>
    </div>
  );
};

export default Stock;
