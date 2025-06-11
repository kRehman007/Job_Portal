import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";
import { useGetAppliedJobsQuery } from "../JOB_SEEKER/Redux/API/JobsAPI";
import { useFavourite } from "../JOB_SEEKER/zustand/useFavourite";

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
    { name: "Pending Jobs", value: Pending_Jobs, fill: "#ffc658" },
    {
      name: "Favourite Jobs",
      value: Favourite_Jobs?.length || 0,
      fill: "#83a6ed",
    },
    { name: "Accepted Jobs", value: Accepted_Jobs, fill: "#8dd1e1" },
    { name: "Rejected Jobs", value: Rejected_Jobs, fill: "#82ca9d" },
    {
      name: "Total Applied Jobs",
      value: Applied_Jobs?.length || 0,
      fill: "#a4de6c",
    },
  ];

  return (
    <RadialBarChart
      width={370}
      height={250}
      cx={90}
      innerRadius="30%"
      outerRadius="100%"
      data={jobStats}
      startAngle={180}
      endAngle={0}
    >
      <RadialBar
        label={{ fill: "#666", position: "insideTop" }}
        background
        dataKey="value"
      />
      <Legend
        wrapperStyle={{ right: -10, top: 40 }}
        iconSize={10}
        width={160}
        height={140}
        layout="vertical"
        verticalAlign="middle"
        align="right"
      />
      <Tooltip />
    </RadialBarChart>
  );
};

export default CustomRadialBarChart;
