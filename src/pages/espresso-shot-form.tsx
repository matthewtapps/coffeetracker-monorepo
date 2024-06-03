import { BaseContainer } from "@/components/base-container";
import EspressoShotForm from "@/components/espresso-shot-form/espresso-shot-form";

export default function EspressoShotFormPage() {
  return (
    <BaseContainer route="shotForm">
      <EspressoShotForm />
    </BaseContainer>
  );
}
