import React from "react";
import { BaseContainer } from "@/components/base-container";
import { getDummyData } from "../test/dummyData";
import { columns } from "@/components/coffee-data-table/columns";
import { DataTable } from "@/components/coffee-data-table/data-table";

export default function CoffeeDataTablePage() {
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
      <DataTable
        columns={columns}
        data={getDummyData()}
        isDesktop={isDesktop}
      />
    </BaseContainer>
  );
}
