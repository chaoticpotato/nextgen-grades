import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

const ProjectChartNew = ({ userId, currentSprint }) => {
  // Queries
  const {
    data: taskLogs,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [userId],
    queryFn: () =>
      axios.get(
        `https://coursey-gpt-backend.herokuapp.com/nextgen/taskLog/getUserTaskAvgNew/${userId}/`
      ),
  });

  // Veriyi Recharts'in anlayacağı formata dönüştür
  const chartData = taskLogs?.data?.taskLogs
    .filter((s) => s.sprint <= 5)
    .map((item) => ({
      name: `S${item.sprint} - D${item.day}`,
      "Proje Ortalaması": Math.ceil(
        Number(
          item.max_grades_arr.reduce((a, b) => a + (b === null ? 0 : b), 0)
        ) / item.max_grades_arr.length
      ),
    }));

  console.log(chartData);

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
        <XAxis dataKey="name" interval={0} style={{ fontSize: "10px" }} />
        <YAxis domain={[0, 100]} />
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

export default ProjectChartNew;
