import { useState } from 'react';
import * as motion from 'motion/react-m';
import Spinner from '@/components/ui/Spinner';
import { cardShadowClassname } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useExercisesStore } from '@/stores/exercisesStore';
import { DetailHeader } from './DetailHeader';
import { ExercisesDetailCarousel } from './ExercisesDetailCarousel';

export const ExerciseDetailPage = ({ id }: { id: number }) => {
  const exercises = useExercisesStore((state) => state.exercises);
  const [isGifLoaded, setIsGifLoaded] = useState(false);
  const exercise = exercises.find((ex) => ex.id === id);

  if (!exercise) {
    return <div className="p-4">Упражнение не найдено</div>;
  }

  return (
    <div className="min-h-screen relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto p-4 px-0 sm:p-6 max-w-full"
      >
        <DetailHeader exercise={exercise} />
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
          <div className="space-y-4 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative group order-1"
            >
              <div className="overflow-hidden rounded-xl shadow-xl sm:h-[400px] relative">
                {!isGifLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                )}
                <motion.img
                  src={exercise.gifUrl}
                  alt={`${exercise.title} анимация`}
                  onLoad={() => setIsGifLoaded(true)}
                  className="w-full object-cover sm:h-full max-w-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>
            <div className="hidden md:block">
              <ExercisesDetailCarousel exercise={exercise} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 sm:space-y-6 order-2"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`p-4 sm:p-6 rounded-xl ${cardShadowClassname}`}
            >
              <h2 className="text-2xl font-semibold text-primary">Описание</h2>
              <Separator className="mt-2 mb-4" />
              <p className="text-muted-foreground leading-relaxed">{exercise.description}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`p-4 sm:p-6 rounded-xl ${cardShadowClassname}`}
            >
              <h2 className="text-2xl font-semibold text-primary">Характеристики</h2>
              <Separator className="mt-2 mb-4" />
              <ul className="space-y-3">
                {[
                  { label: 'Сложность', value: exercise.difficulty },
                  { label: 'Тип упражнения', value: exercise.exerciseType },
                  { label: 'Оборудование', value: exercise.equipment.join(', ') },
                  { label: 'Части тела', value: exercise.bodyParts.join(', ') },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <span className="font-medium text-primary mr-2 mb-1 sm:mb-0">{item.label}:</span>
                    <span className="text-muted-foreground">{item.value}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`p-4 sm:p-6 rounded-xl ${cardShadowClassname}`}
            >
              <h2 className="text-2xl font-semibold text-primary">Инструкция по выполнению</h2>
              <Separator className="mt-2 mb-4" />
              <ol className="space-y-3">
                {exercise.instructions.map((instruction, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <span className="font-bold text-primary">{index + 1}.</span>
                    <span className="text-muted-foreground text-wrap">{instruction}</span>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
            <div className="block md:hidden">
              <ExercisesDetailCarousel exercise={exercise} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
