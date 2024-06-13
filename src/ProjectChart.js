import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const ProjectChart = ({ data }) => {
  // Veriyi sprint ve gün numarasına göre sırala
  data.sort((a, b) => {
    if (a.sprint === b.sprint) {
      return a.day - b.day;
    }
    return a.sprint - b.sprint;
  });
  console.log(data, '***---');

  // Veriyi Recharts'in anlayacağı formata dönüştür
  const chartData = data.map((item) => ({
    name: `S${item.sprint}D${item.day}`,
    'Proje Ortalaması': Math.ceil(Number(item.avg || 0)),
  }));

  return (
    <div>
      <h2 className="mb-2 text-lg">Projeler</h2>
      <LineChart
        width={1400}
        height={250}
        data={chartData}
        margin={{
          top: 5,
          right: 15,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} style={{ fontSize: '10px' }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Proje Ortalaması"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default ProjectChart;
