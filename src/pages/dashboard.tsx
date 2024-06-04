import { BaseContainer } from "@/components/base-container";
import { Charts } from "@/components/dashboard/charts";
import { useGetShotsQuery } from "@/app/api/api";
import Spinner from "@/components/loadingSpinner";

export default function DashboardPage() {
  const { data, isLoading, isSuccess } = useGetShotsQuery();
  return (
    <BaseContainer route="dashboard">
      {isLoading ? <Spinner /> : isSuccess && <Charts data={data} />}
    </BaseContainer>
  );
}
