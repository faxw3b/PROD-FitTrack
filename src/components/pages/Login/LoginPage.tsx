import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as motion from 'motion/react-m';
import { Dumbbell } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { defaultLoginFormValues } from '@/helpers/LoginFormHelper';
import { type ILoginFormData, loginFormSchema } from '@/models/Schemas/LoginFormSchema';
import { LoginForm } from './LoginForm';

export const LoginPage = () => {
  const [showMobileForm, setShowMobileForm] = useState(false);
  const form = useForm<ILoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: defaultLoginFormValues,
    mode: 'onChange',
  });

  return (
    <Form {...form}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="min-h-screen w-full flex justify-center items-center dark:bg-gradient-to-br dark:from-background dark:to-muted bg-gradient-to-br from-background to-zinc-200 p-4"
      >
        <div className="container flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 -mt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left lg:w-1/3"
          >
            {!showMobileForm ? (
              <>
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-6 ">
                  <Dumbbell className="h-12 w-12 text-primary" />
                  <h1 className="text-4xl font-bold">
                    Fit<span className="text-muted-foreground">Track</span>
                  </h1>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Добро пожаловать в мир фитнеса!</h2>
                <p className="text-muted-foreground text-lg max-w-md mb-6">
                  Начните свой путь к здоровому образу жизни вместе с FitTrack. Отслеживайте тренировки, достигайте
                  целей и становитесь лучше каждый день.
                </p>
                <button
                  onClick={() => setShowMobileForm(true)}
                  className="lg:hidden w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Зарегистрироваться
                </button>
              </>
            ) : null}
          </motion.div>
          <LoginForm form={form} className={showMobileForm ? 'flex' : 'hidden lg:flex'} />
        </div>
      </motion.div>
    </Form>
  );
};
