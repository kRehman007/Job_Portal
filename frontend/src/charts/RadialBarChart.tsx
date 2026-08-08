import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetAppliedJobsQuery } from "../JOB_SEEKER/Redux/API/JobsAPI";
import { useFavourite } from "../JOB_SEEKER/zustand/useFavourite";

interface TooltipPayload {
  name?: string;
  value?: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          padding: "10px 14px",
          boxShadow: "0 8px 20px rgba(30,41,59,0.12)",
          fontSize: "13px",
        }}
      >
        <strong style={{ color: "#1e293b" }}>{payload[0].name}</strong>
        <div style={{ color: "#6d28d9", fontWeight: 600, marginTop: 4 }}>
          {payload[0].value}
        </div>
      </div>
    );
  }
  return null;
};

const CustomRadialBarChart = () => {
  const { data: Applied_Jobs } = useGetAppliedJobsQuery();
  const { FavouriteList: Favourite_Jobs } = useFavourite();

  const Pending_Jobs = Applied_Jobs?.filter(
    (job: any) => job.status === "pending"
  ).length;
  const Accepted_Jobs = Applied_Jobs?.filter(
    (job: any) => job.status === "approved"
  ).length;
  const Rejected_Jobs = Applied_Jobs?.filter(
    (job: any) => job.status === "rejected"
  ).length;

  const jobStats = [
    { name: "Total Applied Jobs", value: Applied_Jobs?.length || 0, fill: "#4f46e5" },
    { name: "Pending Jobs", value: Pending_Jobs, fill: "#f59e0b" },
    { name: "Favourite Jobs", value: Favourite_Jobs?.length || 0, fill: "#ec4899" },
    { name: "Accepted Jobs", value: Accepted_Jobs, fill: "#22c55e" },
    { name: "Rejected Jobs", value: Rejected_Jobs, fill: "#ef4444" },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadialBarChart
        data={jobStats}
        cx="40%"
        cy="50%"
        innerRadius="28%"
        outerRadius="85%"
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          label={{ fill: "#94a3b8", fontSize: 11, position: "insideStart" }}
          background={{ fill: "#eef2f7" }}
          dataKey="value"
          cornerRadius={6}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          align="right"
          width={170}
          formatter={(value) => (
            <span style={{ color: "#475569", fontSize: 13 }}>{value}</span>
          )}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default CustomRadialBarChart;
