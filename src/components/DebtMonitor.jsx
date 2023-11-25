import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

const DebtMonitor = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.worldbank.org/v2/countries/CO/indicators/DT.DOD.DECT.CD?format=json'
        );

        // La API de World Bank devuelve datos en una estructura específica
        // Aquí asumimos que los datos que necesitas están en response.data[1]

        // Filtrar y ordenar los datos válidos por fecha de forma ascendente
        const validData = response.data[1].filter(item => item.value !== null);
        const sortedData = validData.sort((a, b) => a.date.localeCompare(b.date));

        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Este efecto se ejecutará solo una vez al montar el componente

  return (
    <div>
      <h2 className='text-center text-xl'>Deuda externa</h2>
      {data.length > 0 ? (
        <Chart
          width={'100%'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[['Year', 'Debt'], ...data.map(item => [item.date, item.value])]}
          options={{
            title: 'Debt Over Time',
            hAxis: {
              title: 'Year',
            },
            vAxis: {
              title: 'Debt',
            },
          }}
        />
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
};

export default DebtMonitor;
