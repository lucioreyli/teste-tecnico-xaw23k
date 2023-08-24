'use client';
import type { FC } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table } from '@/components/ui/table';
import { columns } from './columns';
import { useProductsStore } from '@/store';
import { THeader } from './THeader';
import { TBody } from './TBody';

const coreRowModel = getCoreRowModel();

export const DataTable: FC = () => {
  const data = useProductsStore((state) => state.products);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: coreRowModel,
  });

  return (
    <div className="rounded-md border overflow-auto">
      <Table>
        <THeader table={table} />
        <TBody table={table} />
      </Table>
    </div>
  );
};
