import React from "react";
import { dummyData } from "../../test/dummyData";
import { columns } from "./columns";
import { DataTable } from "./data-table";


export default function CoffeeDataTable() {
    const [isDesktop, setDesktop] = React.useState(window.innerWidth > 1350);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 1350);
    };

    React.useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });


    return (
        <>
            <DataTable columns={columns} data={dummyData} isDesktop={isDesktop} />
        </>
    )
}
