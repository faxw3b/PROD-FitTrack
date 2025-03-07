import { Suspense, lazy, useState } from 'react';
import { Activity, Award, Crown, TrendingUp, Trophy } from 'lucide-react';
import Spinner from '@/components/ui/Spinner';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getCharacterBodyType } from '@/helpers/CharacterHelper';
import { ICharacter } from '@/models/Stores/User/IUser';
import { useUserStore } from '@/stores/userStore';
import { CustomizationPanel } from './Customization/CustomizationPanel';

const CharacterCanvas = lazy(() => import('./CharacterCanvas'));

export const CharacterPage = () => {
  const user = useUserStore((state) => state.user);

  const [appearance, setAppearance] = useState<Omit<ICharacter, 'modelPath'>>({
    sex: user.sex,
    bodyType: getCharacterBodyType(user),
    hairStyle: user.appearance.hairStyle,
    clothes: user.appearance.clothes,
    hat: user.appearance.hat,
  });

  const nextUpgradeLevel = user.level < 5 ? 5 : user.level < 10 ? 10 : user.level < 15 ? 15 : null;
  const levelsUntilUpgrade = nextUpgradeLevel ? nextUpgradeLevel - user.level : null;

  return (
    <div className="w-full min-h-screen py-6 flex flex-col lg:flex-row gap-6 container mx-auto">
      <div className="lg:w-2/3 flex flex-col gap-6 h-[500px] sm:h-[900px] order-2 md:order-1">
        <Card className="flex-grow shadow-lg border border-border h-full">
          <CardContent className="p-0 rounded-lg h-full overflow-hidden">
            <Suspense fallback={<Spinner />}>{appearance && <CharacterCanvas appearance={appearance} />}</Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="lg:w-1/3 flex flex-col gap-6 min-w-[300px] order-1 md:order-2">
        <Card className="shadow-lg border border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span>Прогресс персонажа</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-4 sm:px-6">
            <div className="bg-card/50 rounded-xl p-4 border border-border/50 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-primary" />
                  <span className="font-medium">Текущий уровень</span>
                </div>
                <span className="text-xl font-bold text-primary">{user.level}</span>
              </div>
            </div>

            <div className="bg-card/50 rounded-xl p-4 space-y-3 border border-border/50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="font-medium">Опыт</span>
                </div>
                <Badge variant="secondary" className="bg-primary/10">
                  {user.experience} / 100
                </Badge>
              </div>
              <div className="relative">
                <Progress value={user.experience} className="h-2" />
              </div>
            </div>

            <div className="bg-card/50 rounded-xl p-4 border border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="font-medium">Очки кастомизации</span>
                </div>
                <span className="text-xl font-bold text-primary">{user.points}</span>
              </div>
            </div>

            {nextUpgradeLevel && (
              <div className="bg-card/50 rounded-xl p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <p className="font-medium">Следующее улучшение персонажа</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Цель</span>
                    <span className="font-semibold">{nextUpgradeLevel}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Уровней до цели</span>
                    <span className="font-semibold">{levelsUntilUpgrade}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Опыта до цели</span>
                    <span className="font-semibold">
                      {nextUpgradeLevel * 100 - (user.level * 100 + user.experience)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <CustomizationPanel appearance={appearance} setAppearance={setAppearance} />
      </div>
    </div>
  );
};
