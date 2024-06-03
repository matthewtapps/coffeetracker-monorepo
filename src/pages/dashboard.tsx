import { BaseContainer } from "@/components/base-container";
import { Charts } from "@/components/dashboard/charts";
import { getDummyData } from "@/test/dummyData";

export default function DashboardPage() {
  return (
    <BaseContainer route="dashboard">
      <Charts data={getDummyData()} />
    </BaseContainer>
  );
}
