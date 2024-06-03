"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { AccordionDetailRow } from "./accordion-detail-row";
import { AccordionSummaryRow } from "./accordion-summary-row";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isDesktop: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isDesktop,
}: DataTableProps<TData, TValue>) {
  const [columnsMenuVisibility, setColumnsMenuVisibility] =
    React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "shotDate",
      desc: true,
    },
  ]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      beans: false,
      roaster: false,
      roastDate: false,
    });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
    },
    defaultColumn: {
      minSize: 0,
      size: 0,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  });

  return (
    <div>
      <div className="flex items-center m-4">
        <Input
          placeholder="Filter..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm mr-2"
        />
        <DropdownMenu
          open={columnsMenuVisibility}
          onOpenChange={() => setColumnsMenuVisibility(!columnsMenuVisibility)}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto"
              onClick={() => setColumnsMenuVisibility(!columnsMenuVisibility)}
              disabled={!isDesktop}
            >
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className=""
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isDesktop ? (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width:
                          header.getSize() === Number.MAX_SAFE_INTEGER
                            ? "auto"
                            : header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width:
                          cell.column.getSize() === Number.MAX_SAFE_INTEGER
                            ? "auto"
                            : cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <Accordion type="multiple" className="border-t">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <AccordionItem value={row.id} key={row.id}>
                <AccordionTrigger className="p-2 hover:no-underline hover:bg-accent">
                  <AccordionSummaryRow row={row} key={`summary-${row.id}`} />
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <AccordionDetailRow row={row} key={`detail-${row.id}`} />
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <AccordionItem value="noResultsId">
              <AccordionTrigger>No results.</AccordionTrigger>
            </AccordionItem>
          )}
        </Accordion>
      )}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
