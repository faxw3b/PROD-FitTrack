import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import * as motion from 'motion/react-m';
import { Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { IExercise } from '@/models/Stores/Exercises/IExercise';
import { useExercisesStore } from '@/stores/exercisesStore';
import { EditExerciseForm } from './EditExerciseForm';

interface IDetailHeaderProps {
  exercise: IExercise;
}

export const DetailHeader = ({ exercise }: IDetailHeaderProps) => {
  const navigate = useNavigate();
  const deleteExercise = useExercisesStore((state) => state.deleteExercise);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDeleteExercise = () => {
    deleteExercise(exercise.id);
    navigate({
      to: '/exercises',
    });
    toast({
      title: 'Упражнение успешно удалено',
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8"
    >
      <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left">{exercise.title}</h1>
      <div className="flex gap-2 sm:gap-3 mt-4 md:mt-0 w-full md:w-auto">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 md:flex-none">
              <Button scaling="sm" variant="outline" className="shadow-md w-full md:w-auto">
                <Pencil className="w-4 h-4 mr-2" />
                Редактировать
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] mt-10 sm:mt-0 overflow-y-auto p-3 pt-0 pb-14 sm:p-6 flex flex-col">
            <DialogHeader className="p-6 pb-2 bg-background/50 border-b border-border/10 flex-shrink-0 flex items-center">
              <DialogTitle className="text-2xl font-bold text-foreground">Редактирование упражнения</DialogTitle>
            </DialogHeader>
            <div className="pt-4 overflow-y-auto">
              <EditExerciseForm onFormClose={() => setIsDialogOpen(false)} editExerciseVal={exercise} />
            </div>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 md:flex-none">
              <Button scaling="sm" variant="destructive" className="shadow-md w-full md:w-auto">
                <Trash2 className="w-4 h-4 mr-2" />
                Удалить
              </Button>
            </motion.div>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-md max-w-[96vw] sm:max-w-[32rem]">
            <AlertDialogHeader>
              <AlertDialogTitle>Вы уверены что хотите удалить упражнение?</AlertDialogTitle>
              <AlertDialogDescription>
                Это действие нельзя отменить. Упражнение будет удалено, также будут удалены все тренировки и статистика,
                связанные с ним.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отменить</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteExercise}>Удалить</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  );
};
