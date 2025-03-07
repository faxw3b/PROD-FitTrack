import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ILoginFormData } from '@/models/Schemas/LoginFormSchema';

export const HeightField = ({ form }: { form: UseFormReturn<ILoginFormData> }) => (
  <FormField
    control={form.control}
    name="height"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Рост (см)</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="175"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : '')}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
