import Sidebar from "./components/Sidebar";
import React from "react";
import {useState,useEffect} from "react"
import Graficas from "./components/pages/Graficas";

function App() {
  const [tipo, setTipo] = useState("Graficas");
  const Contenido = () => {
    switch (tipo) {
      case "Graficas":
        return <Graficas />;
        default:
          return <p>No se ha especificado un tipo de contenido válido</p>;
    }
  }

  return (
    <div className="w-full flex">
      <Sidebar setTipo={setTipo} />
      <main className="h-screen flex-1 border-2 ">  
         <Contenido />
      </main>
    </div>
  );
}

export default App;
