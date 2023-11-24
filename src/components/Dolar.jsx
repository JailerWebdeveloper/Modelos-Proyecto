import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const getTimeInterval = (startDate, endDate) => {
  const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

  if (diffInDays <= 1) {
    return 'diaria';
  } else if (diffInDays <= 30) {
    return 'mensual';
  } else if (diffInDays <= 365) {
    return 'anual';
  } else {
    return 'diaria';
  }
};

const filterDataByInterval = (data, interval) => {
  if (interval === 'diaria') {
    return data; // No se aplica ningún filtro para "diaria"
  }

  const now = new Date();
  const startDate = new Date(now);

  if (interval === 'mensual') {
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    startDate.setDate(1);
    startDate.setMonth(now.getMonth() - 1);
  } else if (interval === 'anual') {
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    startDate.setDate(1);
    startDate.setMonth(now.getMonth() - 12);
  }

  return data.filter(({ vigenciadesde }) => new Date(vigenciadesde) >= startDate);
};

const groupDataByInterval = (data, interval) => {
  const groupedData = [];
  const map = new Map();

  data.forEach(({ vigenciadesde, valor }) => {
    const date = new Date(vigenciadesde);

    let key;

    if (interval === 'diaria') {
      key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    } else if (interval === 'mensual') {
      key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    } else if (interval === 'anual') {
      key = `${date.getFullYear()}`;
    }

    if (!map.has(key)) {
      map.set(key, { date, values: [] });
      groupedData.push(map.get(key));
    }

    map.get(key).values.push(parseFloat(valor));
  });

  return groupedData;
};

const FinancialChart = () => {
  const [timeInterval, setTimeInterval] = useState('mensual');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('https://www.datos.gov.co/resource/mcec-87by.json')
      .then((response) => {
        const dataFromApi = response.data;

        if (Array.isArray(dataFromApi)) {
          const filteredData = filterDataByInterval(dataFromApi, timeInterval);
          const groupedData = groupDataByInterval(filteredData, timeInterval);

          const formattedData = groupedData.map(({ date, values }) => [
            date,
            values.reduce((sum, value) => sum + value, 0) / values.length,
          ]);

          setChartData([['Time', 'Value'], ...formattedData]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [timeInterval]);

  return (
    <div>
      <div>
        <label>Select Time Interval:</label>
        <select
          value={timeInterval}
          onChange={(e) => setTimeInterval(e.target.value)}
        >
          <option value="diaria">Diaria</option>
          <option value="mensual">Mensual</option>
          <option value="anual">Anual</option>
        </select>
      </div>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          title: 'Financial Data',
          hAxis: { title: 'Time', format: 'MMM dd, yyyy' },
          vAxis: { title: 'Value' },
          curveType: 'function',
          legend: { position: 'bottom' },
        }}
      />
    </div>
  );
};

export default FinancialChart;
