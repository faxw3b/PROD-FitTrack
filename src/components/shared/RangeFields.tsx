import { UseFormReturn } from 'react-hook-form';
import * as motion from 'motion/react-m';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IExerciseFormData } from '@/models/Schemas/ExerciseFormSchema';
import { itemAnimation } from './animations';

export const ExerciseRangeFields = ({ form }: { form: UseFormReturn<IExerciseFormData> }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <motion.div variants={itemAnimation}>
        <FormField
          control={form.control}
          name="minValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Минимальное значение</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
      <motion.div variants={itemAnimation}>
        <FormField
          control={form.control}
          name="maxValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Максимальное значение</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </div>
  );
};
