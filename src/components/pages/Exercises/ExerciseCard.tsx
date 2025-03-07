import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import * as motion from 'motion/react-m';
import { Clock, Dumbbell, Repeat } from 'lucide-react';
import Spinner from '@/components/ui/Spinner';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, cardShadowClassname } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getDifficultyColor } from '@/helpers/ExercisesHelper';
import { IExercise } from '@/models/Stores/Exercises/IExercise';

export const ExerciseCard = ({ exercise }: { exercise: IExercise }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/exercises/$id`} params={{ id: exercise.id.toString() }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        whileHover={{ scale: 1.02 }}
        className="h-full rounded-xl"
      >
        <Card
          className={`overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-300 ${cardShadowClassname}`}
        >
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background/95 to-transparent z-10" />
            {!imageLoaded && <Spinner />}
            <motion.img
              src={`${exercise.photoUrl}`}
              alt={exercise.title}
              className={`w-full h-full object-cover ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <Separator />
          <div className="flex flex-col flex-grow">
            <CardHeader className="relative z-20 -mt-2 pb-2">
              <CardTitle className="text-xl font-bold leading-tight line-clamp-2 mb-2">{exercise.title}</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">{exercise.description}</p>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end pt-0 gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={`${getDifficultyColor(exercise.difficulty)} transition-colors duration-200`}>
                  {exercise.difficulty}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  {exercise.exerciseType === 'Повторения' ? (
                    <Repeat className="h-4 w-4" />
                  ) : exercise.exerciseType === 'Время' ? (
                    <Clock className="h-4 w-4" />
                  ) : (
                    <Dumbbell className="h-4 w-4" />
                  )}
                  <span className="ml-1">{exercise.exerciseType}</span>
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {exercise.bodyParts.map((part) => (
                  <Badge
                    key={part}
                    variant="secondary"
                    className="text-xs hover:bg-secondary/80 transition-colors duration-200"
                  >
                    {part}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};
