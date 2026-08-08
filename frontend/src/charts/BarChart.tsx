import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { useGetAllJobsQuery } from "../JOB_SEEKER/Redux/API/JobsAPI";

const allMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface TooltipPayload {
  value?: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
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
        <strong style={{ color: "#1e293b" }}>{label}</strong>
        <div style={{ color: "#6d28d9", fontWeight: 600, marginTop: 4 }}>
          {payload[0].value} job{payload[0].value === 1 ? "" : "s"} posted
        </div>
      </div>
    );
  }
  return null;
};

const CustomBarChart = () => {
  const { data: Jobs } = useGetAllJobsQuery();
  const jobCountsByMonth = Jobs?.reduce(
    (
      acc: { month: string; jobs: number }[],
      job: { createdAt: string | number | Date }
    ) => {
      if (!job.createdAt) return acc;

      const month = new Date(job.createdAt).toLocaleString("en-US", {
        month: "short",
      });

      const existingMonth = acc.find((item) => item.month === month);

      if (existingMonth) {
        existingMonth.jobs++;
      } else {
        acc.push({ month, jobs: 1 });
      }

      return acc;
    },
    [] as { month: string; jobs: number }[]
  );

  const finalJobCounts = allMonths.map((month) => {
    const existingData = jobCountsByMonth?.find(
      (item: any) => item.month === month
    );
    return existingData ? existingData : { month, jobs: 0 };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={finalJobCounts} barCategoryGap="20%">
        <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: "#64748b", fontSize: 12 }}
          axisLine={{ stroke: "#e2e8f0" }}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
        <Bar
          dataKey="jobs"
          fill="url(#jobGradient)"
          radius={[8, 8, 0, 0]}
          maxBarSize={34}
        />
        <defs>
          <linearGradient id="jobGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
