import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as motion from 'motion/react-m';
import { ExerciseInfoFields } from '@/components/shared/ExerciseInfoFields';
import { FileUploadFields } from '@/components/shared/FileUploadFields';
import { InstructionsField } from '@/components/shared/InstructionsField';
import { ExerciseRangeFields } from '@/components/shared/RangeFields';
import { TagsMultiSelections } from '@/components/shared/TagsMultiSelections';
import { TagsSelections } from '@/components/shared/TagsSelections';
import { formAnimation, itemAnimation } from '@/components/shared/animations';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { uploadToImgBB } from '@/lib/imgBB';
import { cn } from '@/lib/utils';
import { IEditExerciseFormData, editExerciseFormSchema } from '@/models/Schemas/ExerciseFormSchema';
import { IExercise, IExerciseBodyPart, IExerciseEquipment } from '@/models/Stores/Exercises/IExercise';
import { useExercisesStore } from '@/stores/exercisesStore';

interface IExerciseFormProps {
  onFormClose: () => void;
  editExerciseVal: IExercise;
}

export const EditExerciseForm = ({ onFormClose, editExerciseVal }: IExerciseFormProps) => {
  const editExercise = useExercisesStore((store) => store.editExercise);
  const form = useForm<IEditExerciseFormData>({
    resolver: zodResolver(editExerciseFormSchema),
    mode: 'onSubmit',
    defaultValues: { ...editExerciseVal },
  });
  const [instructions, setInstructions] = useState<string[]>(form.getValues('instructions') || []);
  const [newInstruction, setNewInstruction] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: IEditExerciseFormData) => {
    setIsSubmitting(true);
    try {
      const photoUrl = data.photo?.length ? await uploadToImgBB(data.photo) : editExerciseVal.photoUrl;
      const gifUrl = data.gif?.length ? await uploadToImgBB(data.gif) : editExerciseVal.gifUrl;
      const newExercise: IExercise = {
        id: editExerciseVal.id,
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        exerciseType: data.exerciseType,
        minValue: data.minValue,
        maxValue: data.maxValue,
        photoUrl,
        gifUrl,
        equipment: data.equipment as IExerciseEquipment[],
        bodyParts: data.bodyParts as IExerciseBodyPart[],
        instructions: instructions,
      };

      editExercise(editExerciseVal.id, newExercise);

      toast({
        title: 'Успешно',
        description: 'Упражнение успешно обновлено',
        action: (
          <ToastAction
            altText="Try again"
            className="text-background bg-foreground hover:bg-accent hover:text-accent-foreground "
          >
            Закрыть
          </ToastAction>
        ),
      });
      form.reset();
      setInstructions([]);
      setNewInstruction('setNewInstruction');
      onFormClose();
    } catch (err) {
      toast({
        title: 'Ошибка',
        description: err instanceof Error ? err.message : 'Неизвестная ошибка',
        variant: 'destructive',
        action: (
          <div className="flex flex-col sm:flex-row gap-4">
            <ToastAction altText="Try again" className="!bg-foreground" onClick={form.handleSubmit(onSubmit)}>
              Повторить
            </ToastAction>
            <ToastAction altText="Close" className="!bg-foreground">
              Закрыть
            </ToastAction>
          </div>
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addInstruction = () => {
    if (newInstruction.trim()) {
      const updatedInstructions = [...instructions, newInstruction.trim()];
      setInstructions(updatedInstructions);
      form.setValue('instructions', updatedInstructions);
      setNewInstruction('');
    }
  };

  const removeInstruction = (index: number) => {
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(updatedInstructions);
    form.setValue('instructions', updatedInstructions);
  };

  return (
    <Form {...form}>
      <motion.div initial="hidden" animate="visible" variants={formAnimation} className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-1">
          <ExerciseInfoFields form={form} />
          <TagsSelections form={form} />
          <TagsMultiSelections form={form} />

          <InstructionsField
            instructions={instructions}
            newInstruction={newInstruction}
            setNewInstruction={setNewInstruction}
            addInstruction={addInstruction}
            removeInstruction={removeInstruction}
            errors={form.formState.errors.instructions}
          />
          <FileUploadFields form={form} />
          <div className="p-4 px-2 bg-gray-100 rounded-lg shadow-md">
            <p className="text-sm text-muted-foreground mb-2">
              Укажите рекомендуемые мин. и макс. значения повторений/веса(кг.)/времени(сек.), чтобы мы лучше подбирали
              для вас упражнения
            </p>
            <ExerciseRangeFields form={form} />
          </div>

          <motion.div variants={itemAnimation} className="pt-4">
            <Button
              type="submit"
              scaling="sm"
              className={cn(
                'relative overflow-hidden transition-all duration-300 w-full',
                'disabled:opacity-50',
                'before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/50 before:to-primary',
                'before:opacity-0 before:transition-opacity hover:!rounded-lg'
              )}
            >
              <span className="relative z-10">{isSubmitting ? 'Загрузка...' : 'Редактировать упражнение'}</span>
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </Form>
  );
};
