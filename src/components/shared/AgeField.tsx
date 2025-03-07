import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ILoginFormData } from '@/models/Schemas/LoginFormSchema';

export const AgeField = ({ form }: { form: UseFormReturn<ILoginFormData> }) => (
  <FormField
    control={form.control}
    name="age"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Возраст</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="25"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : '')}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
