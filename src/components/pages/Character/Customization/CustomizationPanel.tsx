import { Award, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { ICharacter } from '@/models/Stores/User/IUser';
import { useUserStore } from '@/stores/userStore';
import { ICustomizationOption, ICustomizationOptions, customizationOptions } from './customizationOptions';

interface ICustomizationPanelProps {
  appearance: Omit<ICharacter, 'modelPath'>;
  setAppearance: (appearance: Omit<ICharacter, 'modelPath'>) => void;
}

export const CustomizationPanel = ({ appearance, setAppearance }: ICustomizationPanelProps) => {
  const user = useUserStore((state) => state.user);
  const buyCustomization = useUserStore((state) => state.buyCustomization);
  const setUserAppearance = useUserStore((state) => state.setUserAppearance);
  const { toast } = useToast();

  const handleCustomizationChange = (type: keyof ICustomizationOptions, id: number) => {
    if (user.points >= customizationOptions[type][user.sex][id % 2].price || user.boughtCustomization.includes(id)) {
      if (!user.boughtCustomization.includes(id)) buyCustomization(type, id);
      setUserAppearance(type, id);
      setAppearance({
        ...appearance,
        [type]: id % 2,
      });
    } else {
      toast({
        title: 'Ошибка',
        description: 'Недостаточно очков кастомизации',
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
  };

  return (
    <Card className="shadow-lg border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="w-5 h-5 text-primary" />
          Кастомизация
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 px-4 sm:px-6">
        {Object.entries(customizationOptions).map(([type, genderOptions]) => (
          <div key={type} className="space-y-3">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">
                  {type === 'hairStyle' ? 'Прическа' : type === 'clothes' ? 'Одежда' : 'Головной убор'}
                </p>
              </div>
            </div>
            <div className="flex justify-start gap-6">
              {genderOptions[user.sex].map((option: ICustomizationOption) => {
                const isSelected = appearance[type as keyof typeof appearance] === option.id % 2;
                return (
                  <Button
                    key={option.id}
                    variant="outline"
                    scaling="sm"
                    className={`
                      relative h-32 w-full p-0 overflow-hidden transition-all group
                      ${user.points < option.price && !user.boughtCustomization.includes(option.id) ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    onClick={() => handleCustomizationChange(type as keyof ICustomizationOptions, option.id)}
                    disabled={!user.boughtCustomization.includes(option.id) && user.points < option.price}
                  >
                    <img
                      src={option.url}
                      alt={`${type} ${option.id + 1}`}
                      className={`w-full h-full object-contain bg-accent/50 p-2 transition-transform duration-300`}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-between opacity-75">
                      <Badge
                        variant="outline"
                        className={`backdrop-blur-sm ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-background/80'}`}
                      >
                        {!user.boughtCustomization.includes(option.id) && <Award />}{' '}
                        {user.boughtCustomization.includes(option.id) ? 'Куплено' : option.price}
                      </Badge>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 left-2 opacity-75">
                        <Badge variant="default" className="bg-primary text-xs">
                          Выбрано
                        </Badge>
                      </div>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
