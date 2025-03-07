import { FieldError, Merge } from 'react-hook-form';
import * as motion from 'motion/react-m';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { itemAnimation } from './animations';

interface InstructionsFieldProps {
  instructions: string[];
  newInstruction: string;
  setNewInstruction: (value: string) => void;
  addInstruction: () => void;
  removeInstruction: (index: number) => void;
  errors: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}

export const InstructionsField = ({
  instructions,
  newInstruction,
  setNewInstruction,
  addInstruction,
  removeInstruction,
  errors,
}: InstructionsFieldProps) => {
  return (
    <motion.div variants={itemAnimation} className="space-y-3">
      <FormLabel className="font-medium">Инструкции</FormLabel>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          value={newInstruction}
          onChange={(e) => setNewInstruction(e.target.value)}
          placeholder="Введите инструкцию"
          className="flex-1"
        />
        <Button type="button" scaling="sm" onClick={addInstruction} className="whitespace-nowrap">
          Добавить
        </Button>
      </div>
      <motion.div layout className="space-y-2">
        {instructions.map((instruction, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-2 bg-secondary/50 backdrop-blur-sm p-3 rounded-lg hover:bg-secondary transition-colors duration-200"
          >
            <span>{instruction}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeInstruction(index)}
              className="hover:scale-110 transition-transform duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </motion.div>
      <span className="text-sm text-destructive">{errors?.message}</span>
    </motion.div>
  );
};
