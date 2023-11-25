import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-google-charts";
import moment from "moment"; // Importa moment


const StockHistoryChart = () => {
  const [stockData, setStockData] = useState(null);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    Seleccionado: "AAPL",
  });
  const [currentPrice, setCurrentPrice] = useState(null);
  const [cantidad, setCantidad] = useState("");

  useEffect(() => {
    axios
      .get("https://modelos-2ecbf-default-rtdb.firebaseio.com/EMPRESAS.json")
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/history?symbol=${formData.Seleccionado}&interval=5m&diffandsplits=false`;
      const apiKey = "3d1831fe92mshea6674bb53d4369p17d7b4jsn2a3626ea0f6f";

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
          },
        });

        setStockData(response.data);

        // Log the last price to the console
        if (response.data.body) {
          const lastDataPoint =
            response.data.body[Object.keys(response.data.body).pop()];
          const lastPrice = lastDataPoint.open;
          console.log("Last Price:", lastPrice);
          setCurrentPrice(lastPrice);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, [formData.Seleccionado]);

  const getChartData = () => {
    if (!stockData || !stockData.body) return [];

    const chartData = [["Date", "Open"]];
    const bodyData = stockData.body;

    Object.keys(bodyData).forEach((timestamp) => {
      const dataPoint = bodyData[timestamp];
      const date = new Date(dataPoint.date_utc * 1000);
      const open = dataPoint.open;

      chartData.push([date, open]);
    });

    return chartData;
  };

  const handleCompraClick = async () => {
    try {
      const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss"); // Obtiene la fecha y hora actual

      // Construye el objeto de datos a enviar
      const compraData = {
        codigo: formData.Seleccionado,
        fecha: formattedDate,
        numero_acciones: parseInt(cantidad),
        precio: parseFloat(currentPrice),
      };

      // Realiza la petición POST para guardar la información
      const response = await axios.post(
        "https://modelos-2ecbf-default-rtdb.firebaseio.com/STOCK.json",
        compraData
      );

      console.log("Respuesta de la petición POST:", response.data);
      // Aquí puedes agregar más lógica según sea necesario

    } catch (error) {
      console.error("Error en la petición POST:", error);
    }
  };
  const handleVentaClick = async () => {
    try {
      // Realiza una petición GET para obtener todos los registros de acciones
      const response = await axios.get(
        "https://modelos-2ecbf-default-rtdb.firebaseio.com/STOCK.json"
      );
  
      // Convierte los registros a un array
      const accionesRegistradas = Object.entries(response.data);
  
      // Busca el registro correspondiente al código seleccionado
      const registroSeleccionado = accionesRegistradas.find(
        ([_, data]) => data.codigo === formData.Seleccionado
      );
  
      if (!registroSeleccionado) {
        console.error("No hay acciones disponibles para vender.");
        return;
      }
  
      // Extrae el identificador y la información del registro
      const [id, registro] = registroSeleccionado;
      const accionesDisponibles = parseInt(registro.numero_acciones);
  
      if (accionesDisponibles < cantidad) {
        console.error("No hay suficientes acciones para vender.");
        return;
      }
  
      // Calcula las ganancias o pérdidas
      const gananciasPerdidas =
        cantidad * (currentPrice - parseFloat(registro.precio));
  
      // Actualiza el input de cantidad con la cantidad disponible para vender
      setCantidad(accionesDisponibles);
  
      // Muestra las ganancias o pérdidas en la consola
      console.log(`Ganancias/Perdidas: ${gananciasPerdidas}`);
  
      // Actualiza la base de datos según si se deben restar o eliminar acciones
      if (accionesDisponibles === cantidad) {
        // Elimina el registro si se van a vender todas las acciones
        await axios.delete(
          `https://modelos-2ecbf-default-rtdb.firebaseio.com/STOCK/${id}.json`
        );
      } else {
        // Actualiza el número de acciones si se van a vender solo algunas
        await axios.patch(
          `https://modelos-2ecbf-default-rtdb.firebaseio.com/STOCK/${id}.json`,
          {
            numero_acciones: accionesDisponibles - cantidad,
          }
        );
      }
  
      console.log("Venta Exitosa.");
    } catch (error) {
      console.error("Error en la petición de venta:", error);
    }
  };
  return (
    <div>
      <select
        onChange={(event) =>
          setFormData({ ...formData, Seleccionado: event.target.value })
        }
        value={formData.Seleccionado}
        name="Seleccionado"
        className="select select-primary w-full"
      >
        {options &&
          Object.keys(options).map((key) => (
            <option key={key} value={options[key]}>
              {key}
            </option>
          ))}
      </select>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          placeholder="Precio Actual"
          value={currentPrice !== null ? currentPrice : ""}
          className="flex mx-4 input  input-bordered input-warning w-full max-w-xs"
          readOnly
        />

        <input
          type="text"
          placeholder="Cantidad a Comprar o vender"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          className="flex mx-4 input  input-bordered input-warning w-full max-w-xs"
        />

        <button
          onClick={handleCompraClick}
          className="btn btn-success mx-4"
        >
          Comprar
        </button>
        <button  onClick={handleVentaClick}  className="btn btn-error mx-4">Vender</button>
      </div>

      {stockData && (
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={getChartData()}
          options={{
            title: `Stock Price Over Time - ${formData.Seleccionado}`,
            hAxis: {
              title: "Date",
            },
            vAxis: {
              title: "Open Price",
            },
          }}
        />
      )}
    </div>
  );
};

export default StockHistoryChart;
