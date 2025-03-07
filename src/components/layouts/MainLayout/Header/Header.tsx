import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import * as motion from 'motion/react-m';
import { Dumbbell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useUserStore } from '@/stores/userStore';
import { MobileMenu } from './MobileMenu';
import { Nav } from './Nav';
import { UserStats } from './UserStats';

export const Header = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore((store) => store.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'unset' : 'hidden';
  };

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      initial={{ boxShadow: 'none', opacity: 0, y: -20 }}
      animate={{ boxShadow: 'var(--box-shadow)', opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/trainings" className="text-2xl font-bold text-foreground flex space-x-2 items-center">
                <Dumbbell className="h-8 w-8 text-foreground" />
                <span className="text-foreground text-xl md:text-2xl">
                  Fit<span className="text-muted-foreground">Track</span>
                </span>
              </Link>
            </motion.div>
          </div>

          <Nav pathname={pathname} />

          <div className="flex items-center space-x-2 md:space-x-4">
            <UserStats user={user} />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.4,
                type: 'spring',
                stiffness: 120,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <ModeToggle />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.4,
                type: 'spring',
                stiffness: 120,
              }}
            >
              <Button size="icon" variant="secondary" className="md:hidden" onClick={toggleMenu}>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {isOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} pathname={pathname} onClose={toggleMenu} />
    </motion.nav>
  );
};
