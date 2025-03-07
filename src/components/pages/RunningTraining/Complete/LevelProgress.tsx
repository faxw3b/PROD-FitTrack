import * as motion from 'motion/react-m';
import { Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ITrainingSession } from '@/models/Stores/TrainingsStats/ITrainingStats';
import { useUserStore } from '@/stores/userStore';

interface ILevelProgressProps {
  experienceGained: number;
  session: ITrainingSession;
}

export const LevelProgress = ({ experienceGained, session }: ILevelProgressProps) => {
  const user = useUserStore((state) => state.user);

  const prevExperience =
    user.experience - experienceGained >= 0
      ? user.experience - experienceGained
      : 100 + (user.experience - experienceGained);
  const experienceToNextLevel = 100 - user.experience;

  return (
    <div className="bg-primary/5 rounded-xl p-4 backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Activity className="w-4 h-4 text-primary" />
        Прогресс уровня
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-base font-medium">Уровень {user.level}</span>
          <span className="text-primary font-medium">{user.experience}% / 100%</span>
        </div>
        <motion.div className="relative h-2">
          <Progress className="h-2 bg-primary/10" />
          {prevExperience > user.experience ? (
            <>
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary rounded-full"
                initial={{ width: `${prevExperience}%`, opacity: 1 }}
                animate={{ width: '100%', opacity: [1, 1, 0] }}
                transition={{
                  duration: 2,
                  delay: 1,
                  times: [0, 0.9, 1],
                }}
              />
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary rounded-full second-progress"
                initial={{ width: '0%', opacity: 0 }}
                animate={{ width: `${user.experience}%`, opacity: [0, 0, 1, 1] }}
                transition={{
                  duration: 2,
                  delay: 3,
                  times: [0, 0.1, 0.2, 1],
                }}
              />
            </>
          ) : (
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary rounded-full"
              initial={{ width: `${prevExperience}%` }}
              animate={{ width: `${user.experience}%` }}
              transition={{ duration: 3, delay: 0.5 }}
            />
          )}
        </motion.div>
        <motion.div
          className="text-sm text-muted-foreground text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {experienceToNextLevel > 0 ? (
            <>
              До следующего уровня осталось:{' '}
              <span className="font-medium text-primary">{experienceToNextLevel} опыта</span>
              <div className="text-xs mt-1">
                (≈
                {session.efficiency > 0 ? Math.ceil(experienceToNextLevel / (session.efficiency / 2)) : '∞'} тренировок
                с такой же эффективностью)
              </div>
            </>
          ) : (
            <span className="text-primary font-medium">Поздравляем с получением нового уровня! 🎉</span>
          )}
        </motion.div>
      </div>
    </div>
  );
};
