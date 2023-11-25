import React, { useState, useEffect } from "react";
import axios from "axios";

const TablaHistorial = () => {
  const [historialData, setHistorialData] = useState(null);

  useEffect(() => {
    // Realizar la petición a la API para obtener los datos del historial
    axios
      .get("https://modelos-2ecbf-default-rtdb.firebaseio.com/STOCK.json")
      .then((response) => {
        setHistorialData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="overflow-y-auto h-full">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Código</th>
              <th>Fecha</th>
              <th>Número de Acciones</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {historialData &&
              Object.keys(historialData).map((key, index) => (
                <tr key={key}>
                  <th>{index + 1}</th>
                  <td>{historialData[key].codigo}</td>
                  <td>{historialData[key].fecha}</td>
                  <td>{historialData[key].numero_acciones}</td>
                  <td>{historialData[key].precio}</td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Código</th>
              <th>Fecha</th>
              <th>Número de Acciones</th>
              <th>Precio</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default TablaHistorial;
