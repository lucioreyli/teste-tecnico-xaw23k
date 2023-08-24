import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { Product } from '@/types';
import { flexRender, type Table } from '@tanstack/react-table';
import { useState, type FC, useEffect } from 'react';
import { columns } from '../columns';

type Props = { table: Table<Product> };

export const TBody: FC<Props> = ({ table }) => {
  const rowModel = table.getRowModel();
  const [haveItems, setHaveItems] = useState(false);

  useEffect(() => {
    setHaveItems(!!rowModel.rows?.length);
  }, [table, rowModel.rows?.length]);

  if (!haveItems) {
    return (
      <TableBody>
        <TableRow key="not-found-row">
          <TableCell
            key="not-found"
            colSpan={columns.length}
            className="h-24 text-center"
          >
            Sem resultados
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  return (
    <TableBody>
      {rowModel.rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};
