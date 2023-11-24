import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

const FinancialMonitor = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.worldbank.org/v2/countries/CO/indicators/NY.GDP.MKTP.CD?format=json'
        );

        // La API de World Bank devuelve datos en una estructura específica
        // Aquí asumimos que los datos que necesitas están en response.data[1]

        // Ordenar los datos por fecha de forma ascendente
        const sortedData = response.data[1].sort((a, b) => a.date.localeCompare(b.date));

        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Este efecto se ejecutará solo una vez al montar el componente

  return (
    <div className='text-center'>
      <h2 className='text-xl'>P.I.B </h2>
      {data.length > 0 ? (
        <Chart
          width={'100%'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[['Year', 'GDP'], ...data.map(item => [item.date, item.value])]}
          options={{
            title: 'GDP Over Time',
            hAxis: {
              title: 'Year',
            },
            vAxis: {
              title: 'GDP',
            },
          }}
        />
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
};

export default FinancialMonitor;
