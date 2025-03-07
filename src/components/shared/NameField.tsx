import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ILoginFormData } from '@/models/Schemas/LoginFormSchema';

export const NameField = ({ form }: { form: UseFormReturn<ILoginFormData> }) => (
  <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Имя</FormLabel>
        <FormControl>
          <Input placeholder="Иван" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
