import { BaseContainer } from "@/components/base-container";
import { Charts } from "@/components/dashboard/charts";
import { useGetShotsQuery } from "@/app/api/api";
import Spinner from "@/components/loading-spinner";
import { useAuth } from "@/lib/BasicAuth";

export default function DashboardPage() {
  const { userId } = useAuth();
  const { data, isLoading, isSuccess } = useGetShotsQuery({ userId });
  return (
    <BaseContainer route="dashboard">
      {isLoading ? <Spinner /> : isSuccess && <Charts data={data} />}
    </BaseContainer>
  );
}
