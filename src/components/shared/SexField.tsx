import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ILoginFormData } from '@/models/Schemas/LoginFormSchema';

interface ISexFieldProps {
  form: UseFormReturn<ILoginFormData>;
  isDisabled?: boolean;
}

export const SexField = ({ form, isDisabled = false }: ISexFieldProps) => (
  <FormField
    control={form.control}
    name="sex"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Пол</FormLabel>
        <Select disabled={isDisabled} onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Выберите ваш пол" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Мужской">Мужской</SelectItem>
            <SelectItem value="Женский">Женский</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
