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

export const Form: FC = () => {
  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors },
  } = useForm<Product>({
    // @ts-expect-error
    resolver: zodResolver(productSchema),
  });
  console.log(errors);

  const onSubmit = (res: Product) => {
    console.log(res);
    /**/
  };

  const isPerishable = watch('perishable');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-3 flex flex-col gap-y-4 md:w-3/5"
    >
      <div className="grid gap-1.5">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" {...register('name')} placeholder="Nome do produto" />
        <small>{errors?.name?.message}</small>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Preço</Label>
        <Input
          id="price"
          {...register('price')}
          placeholder="Preço do produto"
          type="number"
        />
        <small>{errors?.price?.message}</small>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="quantity">Quantidade (apenas número)*</Label>
        <Input
          id="quantity"
          {...register('quantity')}
          placeholder="Preço do produto"
          type="number"
        />
        <small>{errors?.quantity?.message}</small>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="unit">Unidade</Label>
        <Controller
          control={control}
          name="unit"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione a unidade" />
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
        <small>{errors?.unit?.message}</small>
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
        <small>{errors?.fabricationDate?.message}</small>
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
        <small>{errors?.perishable?.message}</small>
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
          <p>hoje eu fico até mais tarde</p>
          <p>{errors?.validationDate?.message}</p>
        </div>
      )}
      <Button type="submit">Salvar</Button>
    </form>
  );
};
