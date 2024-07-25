import React from "react";
import { BaseContainer } from "@/components/base-container";
import { columns } from "@/components/coffee-data-table/columns";
import { DataTable } from "@/components/coffee-data-table/data-table";
import { useGetShotsQuery } from "@/app/api/api";
import Spinner from "@/components/loading-spinner";
import { useAuth } from "@/lib/BasicAuth";

export default function CoffeeDataTablePage() {
  const { userId } = useAuth();
  const { data, isLoading, isSuccess } = useGetShotsQuery({ userId });
  const [isDesktop, setDesktop] = React.useState(window.innerWidth > 1350);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1350);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <BaseContainer route="shotTable">
      {isLoading ? (
        <Spinner />
      ) : (
        isSuccess && (
          <DataTable columns={columns} data={data} isDesktop={isDesktop} />
        )
      )}
    </BaseContainer>
  );
}
