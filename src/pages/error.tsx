import { BaseContainer } from "@/components/base-container";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }
  return (
    <BaseContainer route="error">
      <Card>
        <CardTitle>Error</CardTitle>
        <CardContent>{errorMessage}</CardContent>
      </Card>
    </BaseContainer>
  );
}
