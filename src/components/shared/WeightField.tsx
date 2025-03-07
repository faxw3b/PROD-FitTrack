import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ILoginFormData } from '@/models/Schemas/LoginFormSchema';

export const WeightField = ({ form }: { form: UseFormReturn<ILoginFormData> }) => (
  <FormField
    control={form.control}
    name="weight"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Вес (кг)</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="70"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : '')}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
