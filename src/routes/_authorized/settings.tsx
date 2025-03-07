import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@/components/pages/Settings/SettingsPage';

export const Route = createFileRoute('/_authorized/settings')({
  component: SettingsRoute,
});

function SettingsRoute() {
  return <SettingsPage />;
}
