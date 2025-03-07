import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTrainingsStatsStore } from '@/stores/trainingsStatsStore';
import { useTrainingsStore } from '@/stores/trainingsStore';

export const TrainingHistoryTable = () => {
  const stats = useTrainingsStatsStore((state) => state.stats);
  const trainings = useTrainingsStore((state) => state.trainings);

  const allSessions = stats.flatMap((stat) =>
    stat.sessions.map((session) => ({
      ...session,
      trainingId: stat.trainingId,
    }))
  );
  const sortedSessions = [...allSessions].sort((a, b) => b.startTime - a.startTime).slice(0, 50);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Дата</TableHead>
            <TableHead>Тренировка</TableHead>
            <TableHead>Длительность</TableHead>
            <TableHead>Выполнено</TableHead>
            <TableHead>Пропущено</TableHead>
            <TableHead>Эффективность</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedSessions.map((session) => {
            const training = trainings.find((t) => t.id === session.trainingId);
            return (
              <TableRow key={session.id}>
                <TableCell>{format(new Date(session.startTime), 'dd.MM.yyyy', { locale: ru })}</TableCell>
                <TableCell>{training?.title || 'Удалённая тренировка'}</TableCell>
                <TableCell>
                  {`${Math.floor((session.endTime - session.startTime) / 1000 / 60)}м ${Math.floor(
                    ((session.endTime - session.startTime) / 1000) % 60
                  )}с`}
                </TableCell>
                <TableCell>{session.completedExerciseIds.length}</TableCell>
                <TableCell>{session.skippedExerciseIds.length}</TableCell>
                <TableCell className="text-primary">{Math.round(session.efficiency)}%</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
