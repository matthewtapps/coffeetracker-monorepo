import { Row, flexRender } from "@tanstack/react-table";
import { format } from "date-fns";
import { CogIcon, HourglassIcon, MoveDownIcon, MoveUpIcon } from "lucide-react";
import React from "react";


const SUMMARY_DATA = [
  "shotDate",
  "weightInGrams",
  "weightOutGrams",
  "brewTimeSeconds",
  "grindSetting",
  "ratio"
]

interface AccordionSummaryRowProps<TData> {
  row: Row<TData>
}

export function AccordionSummaryRow<TData>({ row }: AccordionSummaryRowProps<TData>) {
  return <div className="grid grid-cols-5 w-full" key={`summary-${row.id}`}>
    {row.getAllCells().map((cell) => {
      if (SUMMARY_DATA.includes(cell.column.id)) {
        return (
          <div className="text-sm" key={`summary-${cell.id}`}>
            {cell.column.id === "shotDate" ? <RowItem value={format(row.getValue("shotDate"), "dd MMM")} />
              : cell.column.id === "weightInGrams" ? <RowItem value={flexRender(cell.column.columnDef.cell, cell.getContext())} title={<MoveDownIcon className="size-5" />} />
                : cell.column.id === "weightOutGrams" ? <RowItem value={flexRender(cell.column.columnDef.cell, cell.getContext())} title={<MoveUpIcon className="size-5" />} />
                  : cell.column.id === "brewTimeSeconds" ? <RowItem value={flexRender(cell.column.columnDef.cell, cell.getContext())} title={<HourglassIcon className="size-5" />} />
                    : cell.column.id === "grindSetting" ? <RowItem value={flexRender(cell.column.columnDef.cell, cell.getContext())} title={<CogIcon className="size-5" />} />
                      : null
            }
          </div>
        )
      }
      return null;
    })}
  </div>
}

interface RowItemProps {
  value: string | JSX.Element | React.ReactNode
  title?: string | JSX.Element | React.ReactNode
}

function RowItem({ value, title }: RowItemProps) {
  return (
    <div className="flex">
      {title}{value}
    </div>
  )
}
