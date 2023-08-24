import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Product } from '@/types';
import { flexRender, type Table } from '@tanstack/react-table';
import type { FC } from 'react';

type Props = { table: Table<Product> };

export const THeader: FC<Props> = ({ table }) => (
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <TableHead key={header.id}>
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
);
