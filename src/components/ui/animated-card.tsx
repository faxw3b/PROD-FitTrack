import * as motion from 'motion/react-m';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends any {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export const AnimatedCard = ({ children, className, index = 0, ...props }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
