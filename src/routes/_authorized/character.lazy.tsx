import { createLazyFileRoute } from '@tanstack/react-router';
import { CharacterPage } from '@/components/pages/Character/CharacterPage';

export const Route = createLazyFileRoute('/_authorized/character')({
  component: CharacterRoute,
});

function CharacterRoute() {
  return <CharacterPage />;
}
