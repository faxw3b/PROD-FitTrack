import * as motion from 'motion/react-m';
import { LucideProps } from 'lucide-react';

interface IStatsCardProps {
  title: string;
  value: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
  delay?: number;
}

export const StatsCard = ({ title, value, icon: Icon, delay = 0 }: IStatsCardProps) => (
  <motion.div
    className="relative overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className="p-4 bg-primary/5 rounded-xl backdrop-blur-sm hover:bg-primary/10 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">{title}</div>
          <div className="text-lg font-bold">{value}</div>
        </div>
      </div>
    </div>
  </motion.div>
);
