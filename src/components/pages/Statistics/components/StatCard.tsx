import * as motion from 'motion/react-m';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
  delay: number;
}

export const StatCard = ({ title, value, icon: Icon, description, delay }: StatCardProps) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay }}
      className="h-full"
    >
      <Card className="p-6 relative overflow-hidden h-full">
        <div className="absolute right-2 top-2 text-primary/10">
          <Icon className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
};
