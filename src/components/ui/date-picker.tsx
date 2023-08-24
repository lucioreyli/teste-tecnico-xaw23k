'use client';

import React, { type FC } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar, type CalendarProps } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import dayjs from 'dayjs';

type Props = Omit<CalendarProps, 'selected' | 'onSelect'> & {
  selected: string | undefined;
  onChange: (date: string | undefined) => void;
};

export const DatePicker: FC<Props> = (props) => {
  const { id, selected } = props;
  const date = selected && new Date(selected);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          data-date={!!selected}
          className={
            'justify-start text-left font-normal text-muted-foreground' +
            'data-[date=false]:text-neutral-500 data-[date=false]:dark:text-neutral-400'
          }
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {typeof selected !== 'undefined' ? (
            dayjs(date).format('DD/MM/YYYY')
          ) : (
            <span>Escolha uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          initialFocus
          {...props}
          selected={date instanceof Date ? date : undefined}
          onSelect={(date: Date) => props.onChange(date?.toISOString())}
        />
      </PopoverContent>
    </Popover>
  );
};
