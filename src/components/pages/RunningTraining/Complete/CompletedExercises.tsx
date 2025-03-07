import * as motion from 'motion/react-m';
import { Dumbbell, XCircle } from 'lucide-react';
import { IExercise } from '@/models/Stores/Exercises/IExercise';

interface ICompletedExercisesProps {
  completedExercises: IExercise[];
  skippedExercises: IExercise[];
}

export const CompletedExercises = ({ completedExercises, skippedExercises }: ICompletedExercisesProps) => {
  return (
    <motion.div
      className="bg-primary/5 rounded-xl p-4 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 }}
    >
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Dumbbell className="w-4 h-4 text-primary" />
        Выполненные упражнения
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {completedExercises.map((exercise, index) => (
          <motion.div
            key={exercise.id}
            className="flex items-center gap-3 bg-primary/10 rounded-lg p-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7 + index * 0.1 }}
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-green-500" />
            </div>
            <span className="font-medium">{exercise.title}</span>
          </motion.div>
        ))}
        {skippedExercises.map((exercise, index) => (
          <motion.div
            key={exercise.id}
            className="flex items-center gap-3 bg-primary/10 rounded-lg p-3 text-muted-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7 + (completedExercises.length + index) * 0.1 }}
          >
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-4 h-4 text-red-500" />
            </div>
            <span>{exercise.title}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
