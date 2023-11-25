import React from "react";
import { useState, useEffect } from "react";
import StockHistoryChart from "../Acciones";
import TablaHistorial from "../Tablahistorial";

const Historial = () => {
  return (
    <div className="h-full w-full overflow-y-auto">
      
      <section className="grid grid-cols-1 bg-gray-200  h-full place-content-center p-10 gap-8">
      <h1 className="font-semibold capitalize text-xl text-center">
        Historial
      </h1>
        <div className="p-4 bg-white rounded-xl h-96 drop-shadow-2xl">
            <TablaHistorial />
        </div>
      </section>
    </div>
  );
};

export default Historial;