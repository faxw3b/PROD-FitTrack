import { useState } from 'react';
import * as motion from 'motion/react-m';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ISearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchInput = ({ searchQuery, setSearchQuery }: ISearchInputProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <motion.div className="relative w-full lg:w-[300px]" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Input
        placeholder="Поиск упражнений"
        className={cn(
          'w-full bg-background/50 backdrop-blur-sm transition-all duration-300',
          isSearchFocused && 'ring-2 ring-primary shadow-lg'
        )}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          isMotioned={false}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 hover:bg-transparent"
          onClick={() => setSearchQuery('')}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </motion.div>
  );
};
