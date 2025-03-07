import * as motion from 'motion/react-m';
import { Award } from 'lucide-react';
import { IUser } from '@/models/Stores/User/IUser';

interface UserStatsProps {
  user: IUser;
}

export const UserStats = ({ user }: UserStatsProps) => {
  return (
    <motion.div
      className="flex items-center space-x-2 text-foreground-700 bg-secondary rounded-full px-3 py-2 text-sm font-medium [@media(max-width:340px)]:hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2,
        duration: 0.4,
        type: 'spring',
        stiffness: 120,
      }}
    >
      <Award className="h-5 w-5" />
      <motion.span
        key={user.points}
        className="font-semibold text-foreground text-nowrap text-sm"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {user.points} очков
      </motion.span>
    </motion.div>
  );
};
