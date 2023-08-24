'use client';
import type { FC } from 'react';
import { Label } from '../ui/label';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product, productSchema } from '@/types';
import { Input } from '../ui/input';
import { DatePicker } from '../ui/date-picker';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { unitInput } from './unit-input';
import { ErrorText } from '../ui/error-text';
import { formatMoney } from './format-money';
import { deleteKey, formatQuantity } from './format-quantity';
import Link from 'next/link';
import { useSubmit } from './use-submit';
import { useProductsStore } from '@/store';

type Props = { productIndex?: number };

export const Form: FC<Props> = ({ productIndex }) => {
  const products = useProductsStore((state) => state.products);
  const {
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    ...(typeof productIndex === 'number' && {
      defaultValues: products[productIndex],
    }),
  });
  const { onSubmit } = useSubmit(productIndex);

  const isPerishable = watch('perishable');
  const unit = watch('unit');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-3 flex flex-col gap-y-2 md:w-3/5"
    >
      <div className="grid gap-1.5">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" {...register('name')} placeholder="Nome do produto" />
        <ErrorText>{errors?.name?.message}</ErrorText>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Preço</Label>
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <Input
              id="price"
              placeholder="Preço do produto"
              {...field}
              onChange={(val) => field.onChange(formatMoney(val.target.value))}
            />
          )}
        />
        <ErrorText>{errors?.price?.message}</ErrorText>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="unit">Unidade</Label>
        <Controller
          control={control}
          name="unit"
          render={({ field }) => (
            <Select
              onValueChange={(...e) => {
                field.onChange(...e);
                setValue('quantity', '');
              }}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione a unidade" id="unit" />
              </SelectTrigger>
              <SelectContent>
                {unitInput.map<JSX.Element>((field) => (
                  <SelectItem key={field.value} value={field.value}>
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <ErrorText>{errors?.unit?.message}</ErrorText>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="quantity">Quantidade (apenas número)</Label>
        <Controller
          control={control}
          name="quantity"
          render={({ field }) => (
            <Input
              id="quantity"
              placeholder="Quantidade"
              disabled={!unit}
              {...field}
              onChange={({ target }) =>
                field.onChange(formatQuantity(unit, target.value))
              }
              onKeyDownCapture={deleteKey({
                type: unit,
                setValue: field.onChange,
                value: field.value,
              })}
            />
          )}
        />
        <ErrorText>{errors?.quantity?.message}</ErrorText>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="fabricationDate">Data de fabricação</Label>
        <Controller
          control={control}
          name="fabricationDate"
          render={({ field }) => (
            <DatePicker
              id="fabricationDate"
              selected={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <ErrorText>{errors?.fabricationDate?.message}</ErrorText>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="perishable">Produto perecível</Label>
        <Controller
          control={control}
          name="perishable"
          render={({ field }) => (
            <Checkbox
              id="perishable"
              checked={field.value}
              onCheckedChange={field.onChange as (a: boolean) => void}
            />
          )}
        />
        <ErrorText>{errors?.perishable?.message}</ErrorText>
      </div>

      {isPerishable && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="validationDate">Data de validade</Label>
          <Controller
            control={control}
            name="validationDate"
            render={({ field }) => (
              <DatePicker
                id="validationDate"
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <ErrorText>{errors?.validationDate?.message}</ErrorText>
        </div>
      )}
      <div className="flex w-full gap-4">
        <Button asChild className="flex-1" variant="outline" type="submit">
          <Link href="/">Cancelar</Link>
        </Button>
        <Button className="flex-1" type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
};
