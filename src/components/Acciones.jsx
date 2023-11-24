import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockHistoryChart = () => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/history';
      const apiKey = '3d1831fe92mshea6674bb53d4369p17d7b4jsn2a3626ea0f6f';

      try {
        const response = await axios.get(apiUrl, {
          params: {
            symbol: 'TSLA',
            interval: '5m',
            diffandsplits: 'false'
          },
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
          }
        });

        setStockData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default StockHistoryChart;
