import Sidebar from "./components/Sidebar";
import React from "react";
import {useState,useEffect} from "react"
import Graficas from "./components/pages/Graficas";
import FinancialData from "./components/pages/FinancialData";
import Stock from "./components/pages/Stock";

function App() {
  const [tipo, setTipo] = useState("Graficas");
  const Contenido = () => {
    switch (tipo) {
      case "Graficas":
        return <Graficas />;
        case "Data":
          return <FinancialData />;
          case "Stock":
            return <Stock />;
        default:
          return <p>No se ha especificado un tipo de contenido válido</p>;
    }
  }

  return (
    <div className="w-full flex">
      <Sidebar setTipo={setTipo} />
      <main className="h-screen flex-1 ">  
         <Contenido />
      </main>
    </div>
  );
}

export default App;
