import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

export function GlassCard({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'glass-panel p-6 relative overflow-hidden',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
