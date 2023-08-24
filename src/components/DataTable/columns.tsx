import type { Product } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../ui/checkbox';
import { TextCell } from './TextCell';
import dayjs from 'dayjs';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Pen, Trash } from 'lucide-react';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => <TextCell>{row.getValue('name')}</TextCell>,
  },
  {
    accessorKey: 'unit',
    header: 'Unidade de Medida',
    cell: ({ row }) => <TextCell>{row.getValue('unit')}</TextCell>,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantidade',
    cell: ({ row }) => row.getValue('quantity'),
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    cell: ({ row }) => <TextCell>{row.getValue('price')}</TextCell>,
  },
  {
    accessorKey: 'perishable',
    header: 'Perecível',
    cell: ({ row }) => <Checkbox checked={row.getValue('perishable')} />,
  },
  {
    accessorKey: 'validationDate',
    header: 'Data de validade',
    cell: ({ row }) => {
      const value = row.getValue('validationDate');
      return (
        <TextCell>
          {value ? dayjs(new Date(value as string)).format('DD/MM/YYYY') : '-'}
        </TextCell>
      );
    },
  },
  {
    accessorKey: 'fabricationDate',
    header: 'Data de fabricação',
    cell: ({ row }) => {
      const date = new Date(row.getValue('fabricationDate'));
      return <TextCell>{dayjs(date).format('DD/MM/YYYY')}</TextCell>;
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              console.log(row.index);
            }}
            variant="destructive"
          >
            <Trash className="w-4 mr-2" />
            Excluir
          </Button>

          <Button variant="secondary" asChild>
            <Link href={`/register/${row.index}`}>
              <Pen className="w-4 mr-2" />
              Editar
            </Link>
          </Button>
        </div>
      );
    },
  },
];
