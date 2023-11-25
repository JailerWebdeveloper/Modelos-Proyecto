import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-google-charts";

const StockHistoryChart = () => {
  const [stockData, setStockData] = useState(null);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    Seleccionado: "AAPL",
  });

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
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, [formData.Seleccionado]);

  const getChartData = () => {
    if (!stockData || !stockData.body) return [];

    const chartData = [['Date', 'Open']];
    const bodyData = stockData.body;

    Object.keys(bodyData).forEach((timestamp) => {
      const dataPoint = bodyData[timestamp];
      const date = new Date(dataPoint.date_utc * 1000);
      const open = dataPoint.open;

      chartData.push([date, open]);
    });

    return chartData;
  };

  return (
    <div>
      <select
        onChange={(event) => setFormData({ ...formData, Seleccionado: event.target.value })}
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

      {stockData && (
        <Chart
          width={'100%'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={getChartData()}
          options={{
            title: `Stock Price Over Time - ${formData.Seleccionado}`,
            hAxis: {
              title: 'Date',
            },
            vAxis: {
              title: 'Open Price',
            },
          }}
        />
      )}
    </div>
  );
};

export default StockHistoryChart;
