import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-m';
import { ChevronRight, Clock, Dumbbell, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ToastAction } from '@/components/ui/toast';
import { getDifficultyColor } from '@/helpers/ExercisesHelper';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ITraining } from '@/models/Stores/Trainings/ITraining';
import { useTrainingsStore } from '@/stores/trainingsStore';
import { TrainingsForm } from '../Create/TrainingsForm';
import { TrainingCardDialog } from './TrainingCardDialog';

export const TrainingCard = ({ training }: { training: ITraining }) => {
  const navigate = useNavigate();
  const deleteTraining = useTrainingsStore((state) => state.deleteTraining);
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleStartTraining = () => {
    navigate({ to: `/trainings/$id/run`, params: { id: training.id.toString() } });
  };

  const handleDeleteTraining = () => {
    deleteTraining(training.id);
    setShowDetails(false);
    toast({
      title: 'Тренировка успешно удалена',
      action: (
        <ToastAction
          altText="Try again"
          className="text-background bg-foreground hover:bg-accent hover:text-accent-foreground "
        >
          Закрыть
        </ToastAction>
      ),
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowDetails(false);
  };

  return (
    <div className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="h-full"
      >
        <Card
          className={cn(
            'h-full flex flex-col overflow-hidden group transition-all duration-300',
            isHovered && 'shadow-lg'
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex flex-col flex-1"
            animate={isHovered ? { scale: 1.02, y: -4 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardHeader className="flex-none">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-xl line-clamp-2">{training.title}</CardTitle>
                <CardDescription className="line-clamp-2 min-h-[40px]">{training.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{Math.ceil(training.duration / 60)} мин</span>
                  <Dumbbell className="h-4 w-4 ml-2" />
                  <span>{training.exercises.length} упражнений</span>
                </div>
                <div className="flex flex-wrap gap-1 min-h-[24px] items-center">
                  <Badge
                    variant="outline"
                    className={cn('text-bold border-none h-[20px]', getDifficultyColor(training.difficulty))}
                  >
                    {training.difficulty}
                  </Badge>
                  <AnimatePresence>
                    {training.targetBodyParts.map((part) => (
                      <motion.div
                        key={part}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge variant="secondary" className="h-[20px]">
                          {part}
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex justify-stretch gap-2 mt-auto pt-2">
                <Button variant="outline" className="flex-1 group w-full" onClick={() => setShowDetails(true)}>
                  Детали
                  <motion.div animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </motion.div>
                </Button>
                <Button className="flex-1 group w-full" variant="default" onClick={handleStartTraining}>
                  <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                    <Play className="h-4 w-4 mr-2" />
                  </motion.div>
                  Начать
                </Button>
              </div>
            </CardContent>
          </motion.div>
        </Card>
      </motion.div>
      <AnimatePresence mode="wait">
        {isEditing && (
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] mt-10 sm:mt-0 overflow-y-auto p-3 pt-0 pb-14 sm:p-6 flex flex-col">
              <DialogHeader className="p-6 pb-2 bg-background/50 border-b border-border/10 flex-shrink-0 flex items-center">
                <DialogTitle className="text-2xl font-bold text-foreground">Редактирование тренировки</DialogTitle>
              </DialogHeader>
              <div className="pt-4 overflow-y-auto">
                <TrainingsForm onFormClose={() => setIsEditing(false)} editMode={true} trainingToEdit={training} />
              </div>
            </DialogContent>
          </Dialog>
        )}
        {showDetails && (
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] mt-10 sm:mt-0 h-full sm:h-auto overflow-y-auto p-3 pt-0 pb-14 sm:p-6 sm:pb-0 flex flex-col">
              <TrainingCardDialog
                training={training}
                handleDeleteTraining={handleDeleteTraining}
                handleEdit={handleEdit}
                handleStartTraining={handleStartTraining}
              />
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};
