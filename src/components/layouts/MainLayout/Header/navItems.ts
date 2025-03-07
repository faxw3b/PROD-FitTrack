interface INavItem {
  name: string;
  href: string;
}

export const navItems: INavItem[] = [
  { name: 'Тренировки', href: '/trainings' },
  { name: 'Упражнения', href: '/exercises' },
  { name: 'Статистика', href: '/statistics' },
  { name: 'Персонаж', href: '/character' },
  { name: 'Настройки', href: '/settings' },
];
