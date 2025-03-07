import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as motion from 'motion/react-m';
import { LogOut } from 'lucide-react';
import { AgeField } from '@/components/shared/AgeField';
import { BodyTypeField } from '@/components/shared/BodyTypeField';
import { GoalField } from '@/components/shared/GoalField';
import { HeightField } from '@/components/shared/HeightField';
import { NameField } from '@/components/shared/NameField';
import { SexField } from '@/components/shared/SexField';
import { WeightField } from '@/components/shared/WeightField';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { type ILoginFormData, loginFormSchema } from '@/models/Schemas/LoginFormSchema';
import { useExercisesStore } from '@/stores/exercisesStore';
import { useTrainingsStatsStore } from '@/stores/trainingsStatsStore';
import { useTrainingsStore } from '@/stores/trainingsStore';
import { useUserStore } from '@/stores/userStore';

export const SettingsPage = () => {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const resetUser = useUserStore((state) => state.resetUser);
  const resetExercises = useExercisesStore((state) => state.resetExercises);
  const resetTrainings = useTrainingsStore((state) => state.resetTrainings);
  const resetTrainingsStats = useTrainingsStatsStore((state) => state.resetTrainingsStats);
  const form = useForm<ILoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: user,
  });
  const { toast } = useToast();

  function onSubmit(data: ILoginFormData) {
    updateUser(data);
    toast({
      title: 'Настройки сохранены',
      action: (
        <ToastAction
          altText="Try again"
          className="text-background bg-foreground hover:bg-accent hover:text-accent-foreground "
        >
          Закрыть
        </ToastAction>
      ),
    });
  }

  const handleLogout = () => {
    resetUser();
    resetExercises();
    resetTrainings();
    resetTrainingsStats();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, boxShadow: 'none' }}
      animate={{ opacity: 1, y: 0, boxShadow: 'var(--box-shadow)' }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-2xl my-2 mb-8 sm:my-8 rounded-lg"
    >
      <Card>
        <CardHeader className="px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <motion.div initial={{ x: -20 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
              <CardTitle className="text-2xl font-bold ">Настройки</CardTitle>
            </motion.div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <motion.div initial={{ x: 15 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
                  <Button scaling="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Выйти
                  </Button>
                </motion.div>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-md max-w-[96vw] sm:max-w-[32rem]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Вы уверены что хотите выйти?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Это действие нельзя отменить. Ваш аккаунт будет удален, а все данные будут стерты с наших серверов.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отменить</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>Выйти</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:px-4">
          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <NameField form={form} />
              <div className="grid gap-6 md:grid-cols-2">
                <AgeField form={form} />
                <SexField form={form} isDisabled={true} />
                <HeightField form={form} />
                <WeightField form={form} />
              </div>
              <BodyTypeField form={form} />
              <GoalField form={form} />
              <Button scaling="sm" type="submit" className="w-full">
                Сохранить изменения
              </Button>
            </motion.form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
