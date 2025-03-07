import { UseFormReturn } from 'react-hook-form';
import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-m';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getFieldsForStep } from '@/helpers/LoginFormHelper';
import { cn } from '@/lib/utils';
import { ILoginFormData } from '@/models/Schemas/LoginFormSchema';
import { useUserStore } from '@/stores/userStore';
import { loginSteps } from './LoginSteps';

interface LoginFormProps {
  form: UseFormReturn<ILoginFormData>;
  className?: string;
}

export const LoginForm = ({ form, className }: LoginFormProps) => {
  const loginUser = useUserStore((state) => state.loginUser);
  const [step, setStep] = useState(1);
  const totalSteps = loginSteps.length;
  const progress = (step / totalSteps) * 100;

  const handleNext = async () => {
    const fields = getFieldsForStep(step);
    const isValid = await form.trigger(fields);
    if (isValid) {
      setStep(step + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (data: ILoginFormData) => {
    loginUser(data);
    form.reset();
    setStep(1);
  };

  const isStepValid = (step: number) => {
    const fields = getFieldsForStep(step);
    return fields.every((field) => !form.getFieldState(field).invalid);
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step < totalSteps) {
      e.preventDefault();
      await handleNext();
    } else if (e.key === 'Enter' && step === totalSteps) {
      e.preventDefault();
      form.handleSubmit(handleSubmit)();
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      onKeyDown={handleKeyPress}
      className={cn('justify-center items-center w-full lg:w-1/2', className)}
    >
      <Card className="w-full max-w-[500px] mx-4 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <Progress
            value={progress}
            className={cn('w-full h-2 transition-all duration-300', progress === 100 && 'bg-green-500')}
          />
        </CardHeader>
        <AnimatePresence mode="wait">
          {loginSteps[step - 1] && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
              }}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{loginSteps[step - 1].title}</CardTitle>
                <CardDescription className="text-muted-foreground">{loginSteps[step - 1].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="grid w-full items-center gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.4,
                    ease: 'easeOut',
                  }}
                >
                  {(() => {
                    const { Component } = loginSteps[step - 1];
                    return <Component form={form} />;
                  })()}
                </motion.div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
        <CardFooter className="flex justify-between gap-4 pt-6">
          <AnimatePresence>
            {step > 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
              >
                <Button type="button" variant="outline" onClick={handleBack}>
                  Назад
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.2,
              ease: 'easeOut',
            }}
          >
            {step < totalSteps ? (
              <Button type="button" onClick={handleNext} disabled={!isStepValid(step)}>
                Далее
              </Button>
            ) : (
              <Button type="submit" disabled={!form.formState.isValid}>
                Готово!
              </Button>
            )}
          </motion.div>
        </CardFooter>
      </Card>
    </form>
  );
};
