import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Bean, Citrus, Scale, Waves, Weight } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";

export type Coffee = {
  id: string;
  beans: string;
  roaster: string;
  roastDate: Date;
  shotDate: Date;
  grindSetting: number;
  brewTimeSeconds: number;
  weightInGrams: number;
  weightOutGrams: number;
  rating: number;
  acidityBitterness: number;
  muddyWatery: number;
  notes: string;
  updatedAt: Date;
};

export const columns: ColumnDef<Coffee>[] = [
  {
    accessorKey: "shotDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 w-auto"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Shot Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("shotDate"));
      const formatted = format(date, "yyyy-MM-dd");

      return formatted;
    },
  },
  {
    accessorKey: "beans",
    header: "Beans",
    size: 150,
  },
  {
    accessorKey: "roaster",
    header: "Roaster",
    size: 150,
  },
  {
    accessorKey: "roastDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Roast Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("roastDate"));
      const formatted = format(date, "yyyy-MM-dd");

      return formatted;
    },
  },
  {
    accessorKey: "grindSetting",
    header: "Grind Size",
    size: 100,
    cell: ({ row }) => {
      const grindSetting = Number(row.getValue("grindSetting"));
      const formatted = grindSetting;

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "brewTimeSeconds",
    header: "Brew Time",
    size: 100,
    cell: ({ row }) => {
      const brewTime = Number(row.getValue("brewTimeSeconds"));
      const formatted = brewTime.toFixed(1);

      return <div className="text-right">{formatted}s</div>;
    },
  },
  {
    accessorKey: "weightInGrams",
    header: "Weight In",
    size: 100,
    cell: ({ row }) => {
      const weightIn = Number(row.getValue("weightInGrams"));
      const formatted = weightIn.toFixed(1);

      return <div className="text-right">{formatted}g</div>;
    },
  },
  {
    accessorKey: "weightOutGrams",
    header: "Weight Out",
    size: 110,
    cell: ({ row }) => {
      const weightOut = Number(row.getValue("weightOutGrams"));
      const formatted = weightOut.toFixed(1);

      return <div className="text-right">{formatted}g</div>;
    },
  },
  {
    accessorKey: "ratio",
    header: "Ratio",
    id: "ratio",
    cell: ({ row }) => {
      const weightIn = Number(row.getValue("weightInGrams"));
      const weightOut = Number(row.getValue("weightOutGrams"));
      const ratio = weightOut / weightIn;
      const formatted = ratio.toFixed(2);

      return <div className="text-right">1 : {formatted}</div>;
    },
    size: 80,
  },
  {
    accessorKey: "acidityBitterness",
    header: "Extraction",
    id: "acidityBitterness",
    cell: ({ row }) => {
      const rating = Number(row.getValue("acidityBitterness"));
      const formatted = Math.abs(rating).toFixed(0);
      let icon;
      if (rating < 0) {
        icon = <Citrus className="pr-1 size-6" />;
      } else if (rating > 0) {
        icon = <Bean className="pr-1 size-6" />;
      } else {
        icon = <Scale className="pr-1 size-6 mr-2" />;
      }
      return (
        <div className="flex justify-end">
          {icon}
          {rating !== 0 ? formatted : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "muddyWatery",
    header: "Body",
    id: "muddyWatery",
    cell: ({ row }) => {
      const rating = Number(row.getValue("muddyWatery"));
      const formatted = Math.abs(rating).toFixed(0);
      let icon;
      if (rating < 0) {
        icon = <Weight className="pr-1 size-6" />;
      } else if (rating > 0) {
        icon = <Waves className="pr-1 size-6" />;
      } else {
        icon = <Scale className="pr-1 size-6 mr-2" />;
      }
      return (
        <div className="flex justify-end">
          {icon}
          {rating !== 0 ? formatted : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    id: "rating",
    cell: ({ row }) => {
      const rating = Number(row.getValue("rating"));
      const formatted = rating.toFixed(0);
      return <div className="text-right">{formatted}/10</div>;
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    size: Number.MAX_SAFE_INTEGER,
  },
];
