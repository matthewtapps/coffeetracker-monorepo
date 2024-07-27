import { Row, flexRender } from "@tanstack/react-table";
import { format } from "date-fns";
import React from "react";


interface AccordionDetailRowProps<TData> {
  row: Row<TData>
}

export function AccordionDetailRow<TData>({ row }: AccordionDetailRowProps<TData>) {
  return (
    <div className="flex-col grow [&>*:nth-child(even)]:bg-secondary border-t text-wrap">
      {row.getAllCells().map((cell) => {
        const value = cell.column.id === "roastDate"
          ? row.getValue("roastDate") ? format(new Date(row.getValue("roastDate")), "yyyy/MM/dd") : "N/A"
          : cell.column.id === "shotDate"
            ? format(new Date(row.getValue("shotDate")), "yyyy/MM/dd")
            : flexRender(cell.column.columnDef.cell, cell.getContext());

        const title = cell.column.id === "roaster" ? "Roaster"
          : cell.column.id === "beans" ? "Origin"
            : cell.column.id === "roastDate" ? "Roast Date"
              : cell.column.id === "shotDate" ? "Shot Date"
                : cell.column.id === "grindSetting" ? "Grind Setting"
                  : cell.column.id === "brewTimeSeconds" ? "Brew Time"
                    : cell.column.id === "weightInGrams" ? "Weight In"
                      : cell.column.id === "weightOutGrams" ? "Weight Out"
                        : cell.column.id === "notes" ? "Notes"
                          : cell.column.id === "rating" ? "Rating"
                            : cell.column.id === "acidityBitterness" ? "Extraction"
                              : cell.column.id === "muddyWatery" ? "Body"
                                : cell.column.id === "ratio" ? "Ratio"
                                  : "";

        return (
          <div className="flex grow border-b last:border-b-0 p-1" key={`details-${cell.id}`}>
            <RowItem value={value} title={title} />
          </div>
        );
      })}
    </div>
  );
}

interface RowItemProps {
  value: string | JSX.Element | React.ReactNode
  title: string | JSX.Element | React.ReactNode
}

function RowItem({ value, title }: RowItemProps) {
  return (
    <div className="flex grow">
      <div className="justify-start text-left">{title}</div>
      <div className="flex-1 justify-end text-right whitespace-pre-wrap pr-3 pl-8">{value}</div>
    </div>
  )
}
