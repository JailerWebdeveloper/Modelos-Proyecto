import React, { useState, useEffect } from "react";
import axios from "axios";

const StockHistoryChart = () => {
  const [stockData, setStockData] = useState(null);
  const [selectStock, setSelectStock] = useState("TSLA");
  const [formData, setFormData] = useState({
    Seleccionado: "TSLA", // Set default value to a valid stock code
  });

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
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, [formData.Seleccionado]);

  useEffect(() => {
    axios
      .get("https://modelos-2ecbf-default-rtdb.firebaseio.com/EMPRESAS.json")
      .then((response) => {
        setStockData(response.data); // Assuming the data structure is an object with properties like 'meta' and 'body'
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData.Seleccionado);

  return (
    <div>
      <select
        onChange={handleInputChange}
        value={formData.Seleccionado}
        name="Seleccionado"
        className="select select-primary w-full"
      >
        {stockData &&
          Object.keys(stockData).map((key) => (
            <option key={key} value={stockData[key]}>
              {key}
            </option>
          ))}
      </select>
    </div>
  );
};

export default StockHistoryChart;
