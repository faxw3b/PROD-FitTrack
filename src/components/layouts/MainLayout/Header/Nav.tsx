import { Link } from '@tanstack/react-router';
import * as motion from 'motion/react-m';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { navItems } from './navItems';

export const Nav = ({ pathname }: { pathname: string }) => {
  return (
    <div className="hidden md:block">
      <motion.div
        className="ml-2 flex items-baseline space-x-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Button
              variant="ghost"
              key={item.name}
              asChild
              className="text-foreground-500 hover:bg-background-300 hover:text-foreground-900"
            >
              <Link
                to={item.href}
                className={cn(
                  `relative rounded-md px-4 py-2 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent ${pathname === item.href ? 'text-foreground' : ''}`
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary rounded-full"
                    layoutId="navbar-underline"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                      bounce: 0.25,
                    }}
                  />
                )}
              </Link>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
