import ChartView from "@/components/chart-view";
import KpiCardGrid from "@/components/kpi-card-grid";
import { Text, Title } from "@tremor/react";

export default function Dashboard() {
  return (
    <>
      <Title>Dashboard</Title>
      <Text>
        Dashboard page showing some important information about the app.
      </Text>

      <KpiCardGrid />

      <div className="mt-6">
        <ChartView />
      </div>
    </>
  );
}
