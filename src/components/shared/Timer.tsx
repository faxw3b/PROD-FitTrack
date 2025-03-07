import { useEffect, useState } from 'react';
import * as motion from 'motion/react-m';
import { Check, ChevronDown, ChevronUp, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimerProps {
  duration: number;
  onComplete: () => void;
  onDurationChange?: (newDuration: number) => void;
  showControls?: boolean;
  isStarted?: boolean;
}

export const Timer = ({
  duration,
  onComplete,
  onDurationChange,
  showControls = true,
  isStarted = true,
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(!isStarted);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    if (isPaused) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete, isPaused]);

  useEffect(() => {
    setIsPaused(!isStarted);
  }, [isStarted]);

  const adjustTime = (adjustment: number) => {
    if (!onDurationChange) return;
    const newDuration = Math.max(1, timeLeft + adjustment);
    onDurationChange(newDuration);
    setTimeLeft(newDuration);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <motion.div className="space-y-4 sm:space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
      <motion.div className="text-center space-y-4" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
        <motion.div
          className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-primary/10" />
          <svg className="w-full h-full -rotate-90" viewBox="0 0 256 256">
            <circle className="text-muted/20 stroke-current" strokeWidth="12" fill="none" r="120" cx="128" cy="128" />
            <motion.circle
              className="text-primary stroke-current"
              strokeWidth="12"
              fill="none"
              r="120"
              cx="128"
              cy="128"
              strokeDasharray={754}
              strokeDashoffset={754 - (754 * timeLeft) / duration}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 0 }}
              animate={{
                strokeDashoffset: 754 - (754 * timeLeft) / duration,
                transition: { duration: 0.5 },
              }}
            />
          </svg>
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            animate={{ scale: isHovered && showControls ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.div
              className="text-4xl sm:text-5xl font-bold"
              key={timeLeft}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {timeLeft}
            </motion.div>
            <motion.div
              className="text-sm sm:text-base text-muted-foreground"
              animate={{ opacity: isHovered && showControls ? 0.7 : 1 }}
            >
              секунд
            </motion.div>
          </motion.div>
        </motion.div>
        {showControls && (
          <motion.div
            className="flex items-center justify-center gap-4 sm:gap-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => adjustTime(-10)}
                className="rounded-full w-12 h-12 sm:w-14 sm:h-14 group hover:bg-primary/10 hover:border-primary/20"
              >
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <ChevronDown className="h-6 w-6 sm:h-7 sm:w-7 group-hover:text-primary" />
                </motion.div>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={togglePause}
                className={cn(
                  'rounded-full w-12 h-12 sm:w-14 sm:h-14 transition-all duration-300',
                  isPaused
                    ? 'bg-primary/10 hover:bg-primary/20 border-primary/20'
                    : 'hover:bg-primary/10 hover:border-primary/20'
                )}
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isPaused ? 1.1 : 1,
                    rotate: isPaused ? 0 : 360,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 10,
                  }}
                >
                  {isPaused ? (
                    <Play className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  ) : (
                    <Pause className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  )}
                </motion.div>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => adjustTime(10)}
                className="rounded-full w-12 h-12 sm:w-14 sm:h-14 group hover:bg-primary/10 hover:border-primary/20"
              >
                <motion.div whileHover={{ y: 2 }} whileTap={{ y: 0 }}>
                  <ChevronUp className="h-6 w-6 sm:h-7 sm:w-7 group-hover:text-primary" />
                </motion.div>
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={onComplete}
              className={cn(
                'rounded-full w-12 h-12 sm:w-14 sm:h-14 transition-all duration-300',
                'hover:bg-primary/10 hover:border-primary/20'
              )}
            >
              <motion.div
                initial={false}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 10,
                }}
              >
                <Check className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </motion.div>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
