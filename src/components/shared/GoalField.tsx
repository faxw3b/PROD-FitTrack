import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ILoginFormData } from '@/models/Schemas/LoginFormSchema';

export const GoalField = ({ form }: { form: UseFormReturn<ILoginFormData> }) => (
  <FormField
    control={form.control}
    name="goal"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Цель</FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Выберите цель" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Набор мышечной массы">Набор мышечной массы</SelectItem>
            <SelectItem value="Похудение">Похудение</SelectItem>
            <SelectItem value="Поддержка текущей фигуры">Поддержка текущей фигуры</SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>Ваша цель помогает нам составить подходящий план тренировок</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);
