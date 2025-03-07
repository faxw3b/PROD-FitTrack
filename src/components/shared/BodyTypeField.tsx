import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ILoginFormData } from '@/models/Schemas/LoginFormSchema';

export const BodyTypeField = ({ form }: { form: UseFormReturn<ILoginFormData> }) => (
  <FormField
    control={form.control}
    name="bodyType"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Тип телосложения</FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Худое">Худое</SelectItem>
            <SelectItem value="Атлетичное">Атлетичное</SelectItem>
            <SelectItem value="Среднее">Среднее</SelectItem>
            <SelectItem value="Полное">Полное</SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>Тип телосложения помогает нам давать более точные рекомендации</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);
