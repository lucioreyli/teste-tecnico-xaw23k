import type { Product } from '@/types';
import type { KeyboardEvent } from 'react';

const moneyFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 3,
});

const numberRegex = /\D/g;

export const formatQuantity = (type: Product['unit'], value: string) => {
  value = value.replace('.', '').replace(',', '').replace(numberRegex, '');

  const result =
    type === 'un'
      ? Number(value || 0)
      : moneyFormatter.format(Number(value) / 1000);

  return result + ` ${type}`;
};

type DeleteKey = {
  type: Product['unit'];
  value: string | undefined;
  setValue: (val: string | undefined) => void;
};

export const deleteKey =
  ({ type, value, setValue }: DeleteKey) =>
  (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Backspace') {
      return;
    }

    value = (
      value?.replace('.', '').replace(',', '').replace(numberRegex, '') || '0'
    ).slice(0, -1);

    const result =
      type === 'un'
        ? Number(value || '0')
        : moneyFormatter.format(Number(value) / 1000);

    if (Number(value) === 0) return setValue('');

    setValue(result + ` ${type}`);
  };
