import * as React from "react"
import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef,
    SortingState,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table';

import { Input } from "@/components/ui/input"
interface DataTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    className?: string;
}

export function DataTable<T>({ columns, data, className }: DataTableProps<T>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
      )
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
          sorting,
          columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div>
                  <div className="flex justify-between py-4 mx-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-72"
        />
      </div>
        <table className={`min-w-full border-collapse ${className}`}>
            <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b"
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="odd:bg-gray-50 even:bg-white hover:bg-gray-100">
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={cell.id}
                                className="px-6 py-4 text-sm text-gray-700 border-b"
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}
