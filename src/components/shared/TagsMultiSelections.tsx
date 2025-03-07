import { UseFormReturn } from 'react-hook-form';
import * as motion from 'motion/react-m';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { bodyParts, equipment } from '@/helpers/ExercisesHelper';
import { IExerciseFormData } from '@/models/Schemas/ExerciseFormSchema';
import { MultiSelect } from '../ui/multi-select';
import { itemAnimation } from './animations';

export const TagsMultiSelections = ({ form }: { form: UseFormReturn<IExerciseFormData> }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <motion.div variants={itemAnimation}>
        <FormField
          control={form.control}
          name="bodyParts"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium">Части тела</FormLabel>
              <MultiSelect
                options={bodyParts.map((part) => ({ label: part, value: part }))}
                selected={field.value || []}
                onChange={field.onChange}
                placeholder="Выберите части тела"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
      <motion.div variants={itemAnimation}>
        <FormField
          control={form.control}
          name="equipment"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium">Оборудование</FormLabel>
              <MultiSelect
                options={equipment.map((item) => ({ label: item, value: item }))}
                selected={field.value || []}
                onChange={field.onChange}
                placeholder="Выберите оборудование"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </div>
  );
};
