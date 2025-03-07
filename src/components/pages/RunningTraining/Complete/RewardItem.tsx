import * as motion from 'motion/react-m';
import { LucideProps } from 'lucide-react';

interface IRewardItemProps {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
  title: string;
  value: number;
  delay?: number;
}

export const RewardItem = ({ icon: Icon, title, value, delay = 0 }: IRewardItemProps) => (
  <motion.div
    className="flex items-center gap-3 bg-primary/10 rounded-lg p-3"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="p-2 bg-primary/20 rounded-lg">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <div className="text-xs text-muted-foreground">{title}</div>
      <div className="text-lg font-bold">+{value}</div>
    </div>
  </motion.div>
);
