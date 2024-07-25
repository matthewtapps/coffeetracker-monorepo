import { useGetLatestShotQuery } from "@/app/api/api";
import { BaseContainer } from "@/components/base-container";
import EspressoShotForm from "@/components/espresso-shot-form/espresso-shot-form";
import Spinner from "@/components/loading-spinner";
import { useAuth } from "@/lib/BasicAuth";

export default function EspressoShotFormPage() {
  const { userId } = useAuth();
  const { data, isLoading, isSuccess } = useGetLatestShotQuery({ userId });
  return (
    <BaseContainer route="shotForm">
      {isLoading ? (
        <Spinner />
      ) : (
        isSuccess && <EspressoShotForm latestShot={data} />
      )}
    </BaseContainer>
  );
}
