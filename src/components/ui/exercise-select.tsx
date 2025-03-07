'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Option {
  label: string;
  value: string;
}

interface ExerciseSelectProps {
  options: Option[];
  onSelect: (value: string) => void;
  selectedValues?: string[];
  placeholder?: string;
}

export function ExerciseSelect({
  options,
  onSelect,
  selectedValues = [],
  placeholder = 'Выберите упражнение...',
}: ExerciseSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const availableOptions = options.filter((option) => !selectedValues.includes(option.value));
  const filteredOptions = availableOptions.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          scaling="none"
          className={cn('w-full justify-between', !availableOptions.length && 'text-muted-foreground')}
        >
          {!availableOptions.length ? 'Все упражнения добавлены' : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 max-w-[80vw] p-0" side="top" align="start" avoidCollisions={false}>
        <Command shouldFilter={false}>
          <CommandInput placeholder="Поиск упражнения..." value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>Упражнения не найдены</CommandEmpty>
            <ScrollArea className="h-[150px] max-h-[150px]">
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onSelect(option.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedValues.includes(option.value) ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
