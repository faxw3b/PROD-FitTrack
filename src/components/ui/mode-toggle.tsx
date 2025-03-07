import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ui/theme-provider';
import { cn } from '@/lib/utils';

interface IModeToggleProps {
  className?: string;
  children?: React.ReactNode;
}

export function ModeToggle({ className, children }: IModeToggleProps) {
  const { setTheme, theme } = useTheme();

  return (
    <>
      {children ? (
        <Button variant="secondary" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={className}>
          {children}
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className={cn('rounded-full bg-accent text-foreground transition-colors hover:text-foreground', className)}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all" />
        </Button>
      )}
    </>
  );
}
