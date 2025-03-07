import { UseFormReturn } from 'react-hook-form';
import * as motion from 'motion/react-m';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IEditExerciseFormData, IExerciseFormData } from '@/models/Schemas/ExerciseFormSchema';
import { itemAnimation } from './animations';

export const FileUploadFields = ({ form }: { form: UseFormReturn<IExerciseFormData | IEditExerciseFormData> }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <motion.div variants={itemAnimation}>
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Фото упражнения</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                  className="file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer border-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
      <motion.div variants={itemAnimation}>
        <FormField
          control={form.control}
          name="gif"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">GIF упражнения</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/gif"
                  onChange={(e) => field.onChange(e.target.files)}
                  className="file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer border-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </div>
  );
};
