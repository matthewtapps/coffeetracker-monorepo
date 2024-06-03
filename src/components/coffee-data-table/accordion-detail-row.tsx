import { Row, flexRender } from "@tanstack/react-table";
import { format } from "date-fns";
import React from "react";


interface AccordionDetailRowProps<TData> {
    row: Row<TData>
}

export function AccordionDetailRow<TData>({ row }: AccordionDetailRowProps<TData>) {
    return <div className="flex-col grow [&>*:nth-child(even)]:bg-secondary border-t">
        {row.getAllCells().map((cell) => {
            return (
                <div className="flex grow border-b last:border-b-0 p-1" key={`details-${cell.id}`}>
                    {cell.column.id === "roaster" ? <RowItem value={flexRender(cell.column.columnDef.cell, cell.getContext())} title="Roaster" />
                    : cell.column.id === "beans" ? <RowItem value={flexRender(cell.column.columnDef.cell, cell.getContext())} title="Origin" />
                    : cell.column.id === "roastDate" ? <RowItem value={format(row.getValue("roastDate"), "yyyy/MM/dd")} title="Roast Date" />
                    : cell.column.id === "shotDate" ? <RowItem value={format(row.getValue("roastDate"), "yyyy/MM/dd")} title="Shot Date" />
                    : cell.column.id === "grindSetting" ? <RowItem value={flexRender(cell.column.columnDef.cell, cell.getContext())} title="Grind Setting" />
                    : cell.column.id === "brewTimeSeconds" ? <RowItem value={flexRender(cell.column.columnDef.cell, cell.getContext())} title="Brew Time" />
                    : cell.column.id === "weightInGrams" ? <RowItem value={flexRender(cell.column.columnDef.cell, cell.getContext())} title="Weight In" />
                    : cell.column.id === "weightOutGrams" ? <RowItem value={flexRender(cell.column.columnDef.cell, cell.getContext())} title="Weight Out" />
                    : cell.column.id === "notes" ? <RowItem value={flexRender(cell.column.columnDef.cell, cell.getContext())} title="Notes" />
                    : cell.column.id === "ratio" ? <RowItem value={flexRender(cell.column.columnDef.cell, cell.getContext())} title="Ratio"/>
                    : null
                    }
                </div>
            )
        }
        )}
    </div>
}

interface RowItemProps {
    value: string | JSX.Element | React.ReactNode
    title: string | JSX.Element | React.ReactNode
}

function RowItem({ value, title }: RowItemProps) {
    return (
        <div className="flex grow">
            <div className="flex-1 w-max justify-start text-left">{title}</div>
            <div className="flex-1 w-max justify-end text-right">{value}</div>
        </div>
    )
}