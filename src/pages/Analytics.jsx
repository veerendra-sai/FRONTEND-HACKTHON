import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import { getData } from "../data";

export default function Analytics() {
  const students = getData("students");
  const marks = getData("marks");

  const performance = students.slice(0, 10).map(s => {
    const records = marks.filter(
      m => m.studentId === s.id
    );

    const average = records.length
      ? Math.round(
          records.reduce(
            (sum, m) =>
              sum + (m.marks / m.maxMarks) * 100,
            0
          ) / records.length
        )
      : 0;

    return {
      name: s.id,
      average
    };
  });

  const departments = ["CSE", "ECE", "IT", "EEE"].map(d => ({
    name: d,
    value: students.filter(s => s.department === d).length
  }));

  const colors = [
    "#5369d8",
    "#16a085",
    "#e67e22",
    "#9366d5"
  ];

  return (
    <div className="page">

      <h1>Academic Analytics</h1>
      <p>Analyze student performance and department statistics.</p>

      <div className="chart-grid">

        <div className="dashboard-panel">

          <h2>Student Performance</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performance}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis domain={[0, 100]} />

              <Tooltip />

              <Bar
                dataKey="average"
                fill="#5369d8"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>

        <div className="dashboard-panel">

          <h2>Department Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={departments}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {departments.map((d, index) => (
                  <Cell
                    key={d.name}
                    fill={colors[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}