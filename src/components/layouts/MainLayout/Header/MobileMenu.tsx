import { useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-m';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { cn } from '@/lib/utils';
import { navItems } from './navItems';

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, pathname, onClose }: MobileMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="md:hidden"
        >
          <div className="flex flex-col gap-3 px-2 pb-3 pt-2 sm:px-3">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                onClick={onClose}
              >
                <Link
                  to={item.href}
                  className={cn(
                    `block rounded-md px-3 py-2 text-base font-medium transition-colors`,
                    pathname === item.href
                      ? 'bg-foreground text-secondary'
                      : 'bg-secondary text-primary hover:bg-foreground hover:text-secondary'
                  )}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex items-center justify-center gap-2 self-end"
            >
              <ModeToggle>
                <span className="text-foreground">Сменить тему</span>
              </ModeToggle>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
