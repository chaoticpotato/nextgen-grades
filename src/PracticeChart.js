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

const PracticeChart = ({ data }) => {
  // Veriyi sprint ve gün numarasına göre sırala
  data.sort((a, b) => {
    if (a.sprint === b.sprint) {
      return a.day - b.day;
    }
    return a.sprint - b.sprint;
  });

  console.log(data, '***');
  // Veriyi Recharts'in anlayacağı formata dönüştür
  const chartData = data.map((item) => ({
    name: `S${item.sprint}D${item.day} `,
    'Practice Success': Math.ceil(item.avg_success * 100),
    'Solved Practices': item.avg_attendance * 100,
  }));

  return (
    <div>
      <h2 className="mb-2 text-lg">Pratikler</h2>
      <LineChart
        width={1000}
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
          dataKey="Practice Success"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Solved Practices" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default PracticeChart;
