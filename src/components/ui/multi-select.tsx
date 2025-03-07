import { Check, ChevronsUpDown, X } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({ options, selected, onChange, placeholder = 'Выберите опции...' }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2 max-w-3xl">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            scaling="none"
            aria-expanded={open}
            className={cn('w-full justify-between', !selected.length && 'text-muted-foreground')}
          >
            {selected.length === 0 ? placeholder : `Выбрано: ${selected.length}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          sideOffset={5}
          alignOffset={0}
          className="w-72 max-w-[70vw]"
          avoidCollisions={false}
        >
          <div className="flex flex-col gap-1">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center cursor-pointer hover:bg-muted transition-colors duration-200 rounded-md px-2 py-1"
                onClick={() => {
                  const newValue = selected.includes(option.value)
                    ? selected.filter((item) => item !== option.value)
                    : [...selected, option.value];
                  onChange(newValue);
                }}
              >
                <Check className={cn('mr-2 h-4 w-4', selected.includes(option.value) ? 'opacity-100' : 'opacity-0')} />
                <span className="text-sm">{option.label}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex gap-1 flex-wrap">
        {selected.map((value) => {
          const option = options.find((opt) => opt.value === value);
          if (!option) return null;

          return (
            <Badge key={value} variant="secondary" className="hover:bg-secondary">
              {option.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 px-2 hover:bg-transparent"
                onClick={() => {
                  onChange(selected.filter((item) => item !== value));
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
