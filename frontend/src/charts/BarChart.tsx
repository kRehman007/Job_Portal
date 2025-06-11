import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
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
const CustomBarChart = () => {
  const { data: Jobs } = useGetAllJobsQuery();
  //   const data: { month: string; count: number }[] = [];

  //   Jobs.forEach(job=>({
  //   if(data?.length>0){
  //      data?.forEach((data)=>({
  //     if(data.month===job.createdAt){
  //         data.count++;
  //         return
  //     }
  //      }))
  // data.push[...data,{month:job.createdAt,count:1}]
  //   }
  //   data.psuh({month:job.createdAt,count:1})
  //   data.push({month:Jobs.createdAt,count:1})
  //   }))
  const jobCountsByMonth = Jobs?.reduce(
    (
      acc: { month: string; jobs: number }[],
      job: { createdAt: string | number | Date }
    ) => {
      if (!job.createdAt) return acc;

      // Extract the month (formatted as "Jan", "Feb", etc.)
      const month = new Date(job.createdAt).toLocaleString("en-US", {
        month: "short",
      });

      // Find if the month already exists in the array
      const existingMonth = acc.find((item) => item.month === month);

      if (existingMonth) {
        existingMonth.jobs++;
      } else {
        acc.push({ month, jobs: 1 });
      }

      return acc;
    },
    [] as { month: string; count: number }[]
  );
  const finalJobCounts = allMonths.map((month) => {
    const existingData = jobCountsByMonth?.find(
      (item: any) => item.month === month
    );
    return existingData ? existingData : { month, count: 0 };
  });

  return (
    <BarChart width={350} height={250} data={finalJobCounts} barCategoryGap={0}>
      <CartesianGrid strokeDasharray="3" />
      <XAxis dataKey="month" />
      <YAxis domain={[0, 20]} />
      <Tooltip />
      <Legend wrapperStyle={{ padding: 0, margin: 0 }} />

      <Bar dataKey="jobs" fill="#82ca9d" />
    </BarChart>
  );
};

export default CustomBarChart;
