import { UseFormReturn } from 'react-hook-form';
import * as motion from 'motion/react-m';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { IExerciseFormData } from '@/models/Schemas/ExerciseFormSchema';
import { itemAnimation } from './animations';

export const ExerciseInfoFields = ({ form }: { form: UseFormReturn<IExerciseFormData> }) => {
  return (
    <>
      <motion.div variants={itemAnimation}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Название</FormLabel>
              <FormControl>
                <Input placeholder="Жим лежа" {...field} className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={itemAnimation}>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="Опишите технику выполнения..." {...field} className=" min-h-[100px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </>
  );
};
