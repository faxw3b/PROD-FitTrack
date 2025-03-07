import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className={cn(`flex items-center justify-center w-full h-full`, className)}>
      <Loader className="animate-spin h-10 w-10 transition-all duration-1500 text-gray-500" />
    </div>
  );
};

export default Spinner;
