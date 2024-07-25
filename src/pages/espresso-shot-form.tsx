import { useGetLatestShotQuery } from "@/app/api/api";
import { BaseContainer } from "@/components/base-container";
import EspressoShotForm from "@/components/espresso-shot-form/espresso-shot-form";
import Spinner from "@/components/loading-spinner";

export default function EspressoShotFormPage() {
  // TODO: Implement real user ID
  const userId = "static_user_id"
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
