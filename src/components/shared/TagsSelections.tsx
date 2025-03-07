import { UseFormReturn } from 'react-hook-form';
import * as motion from 'motion/react-m';
import { difficulties, exerciseTypes } from '@/helpers/ExercisesHelper';
import { IExerciseFormData } from '@/models/Schemas/ExerciseFormSchema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { itemAnimation } from './animations';

export const TagsSelections = ({ form }: { form: UseFormReturn<IExerciseFormData> }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <motion.div variants={itemAnimation}>
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Сложность</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите сложность" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
      <motion.div variants={itemAnimation}>
        <FormField
          control={form.control}
          name="exerciseType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Тип упражнения</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {exerciseTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </div>
  );
};
