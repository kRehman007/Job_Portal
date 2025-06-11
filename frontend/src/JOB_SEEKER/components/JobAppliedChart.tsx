import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useGetAppliedJobsQuery } from "../Redux/API/JobsAPI";

// Function to get job applications per month
const getMonthlyJobCounts = (applications: any[]) => {
  const currentYear = new Date().getFullYear();
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

  // Initialize all months with 0 jobs
  const monthCounts = allMonths.reduce(
    (acc: { [key: string]: number }, month) => {
      acc[month] = 0; // Store only the month name (not year)
      return acc;
    },
    {}
  );

  // Count jobs for each month
  applications?.forEach((app) => {
    const date = new Date(app.createdAt);
    const month = date.toLocaleString("en-US", { month: "short" });
    if (monthCounts[month] !== undefined) {
      monthCounts[month] += 1;
    }
  });

  return Object.entries(monthCounts).map(([month, jobs]) => ({
    month,
    jobs,
    year: currentYear,
  }));
};

export default function JobAppliedChart() {
  const { data } = useGetAppliedJobsQuery();
  const dataset = getMonthlyJobCounts(data);

  const chartParams: BarChartProps = {
    yAxis: [
      {
        label: "Jobs Applied",
        min: 0,
        max: 30, // Set Y-axis max to 30 jobs
        sx: {
          fontWeight: "bold", // Make the Y-axis label bold
        },
      },
    ],
    series: [
      {
        label: "Jobs",
        dataKey: "jobs",
        valueFormatter: (v) => `${v} Jobs`,
      },
    ],
    slotProps: { legend: { hidden: true } },
    dataset,
    width: 800,
    height: 400,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  return (
    <BarChart
      xAxis={[
        {
          scaleType: "band",
          dataKey: "month", // Displaying only month names on X-axis
        },
      ]}
      {...chartParams}
    />
  );
}
