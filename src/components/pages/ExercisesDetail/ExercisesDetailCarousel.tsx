import { useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import * as motion from 'motion/react-m';
import { cardShadowClassname } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { IExercise } from '@/models/Stores/Exercises/IExercise';
import { useExercisesStore } from '@/stores/exercisesStore';

export const ExercisesDetailCarousel = ({ exercise }: { exercise: IExercise }) => {
  const navigate = useNavigate();
  const { exercises } = useExercisesStore();

  const similarExercises = useMemo(() => {
    return exercises
      .filter((ex) => {
        if (ex.id === exercise.id) return false;
        const commonBodyParts = ex.bodyParts.filter((part) => exercise.bodyParts.includes(part));
        return commonBodyParts.length > 0;
      })
      .slice(0, 10);
  }, [exercises, exercise]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className={`p-4 rounded-xl md:order-2 order-3 ${cardShadowClassname}`}
    >
      <h2 className="text-2xl font-semibold text-primary">Похожие упражнения</h2>
      <Separator className="mt-2 mb-6" />
      {similarExercises.length > 0 ? (
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="!max-w-[85vw] mx-auto"
        >
          <CarouselContent>
            {similarExercises.map((similarExercise, index) => (
              <CarouselItem key={similarExercise.id} className="sm:basis-1/2 h-full basis-5/6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  className="w-full h-full"
                >
                  <div
                    className="bg-muted p-4 rounded-lg cursor-pointer h-full hover:shadow-md transition-shadow relative"
                    onClick={() => {
                      navigate({
                        to: `/exercises/$id`,
                        params: { id: similarExercise.id.toString() },
                      });
                    }}
                  >
                    <div className="relative w-full h-[10rem] sm:h-36 mb-2">
                      <motion.img
                        src={similarExercise.photoUrl}
                        alt={similarExercise.title}
                        className="w-full h-full object-cover rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                    <h3 className="font-semibold text-primary mb-1">{similarExercise.title}</h3>
                    <div className="flex flex-wrap gap-1">
                      {similarExercise.bodyParts.map((part) => (
                        <span key={part} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 -translate-x-1/2 hover:scale-105 transition-transform" />
          <CarouselNext className="absolute right-0 translate-x-1/2 hover:scale-105 transition-transform" />
        </Carousel>
      ) : (
        <p className="text-left text-muted-foreground">Похожих упражнений не найдено</p>
      )}
    </motion.div>
  );
};
