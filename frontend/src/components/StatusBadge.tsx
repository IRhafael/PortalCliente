import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const statusConfig = {
  pending: {
    label: 'Pendente',
    className: 'bg-warning/10 text-warning border-warning/30',
    dotColor: 'bg-warning',
    icon: '⏳'
  },
  in_progress: {
    label: 'Em Análise',
    className: 'bg-primary/10 text-primary border-primary/30',
    dotColor: 'bg-primary',
    icon: '🔄'
  },
  completed: {
    label: 'Concluída',
    className: 'bg-success/10 text-success border-success/30',
    dotColor: 'bg-success',
    icon: '✅'
  },
  overdue: {
    label: 'Vencida',
    className: 'bg-danger/10 text-danger border-danger/30',
    dotColor: 'bg-danger',
    icon: '⚠️'
  }
};

const sizeVariants = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2.5 text-base'
};

export function StatusBadge({ status, size = 'md', className, animated = false }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <motion.span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border font-semibold backdrop-blur-sm shadow-sm',
        'transition-all duration-200 hover:shadow-md hover:scale-105',
        config.className,
        sizeVariants[size],
        className
      )}
      initial={animated ? { scale: 0, opacity: 0 } : undefined}
      animate={animated ? { scale: 1, opacity: 1 } : undefined}
      transition={animated ? {
        type: "spring",
        stiffness: 500,
        damping: 30
      } : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated dot indicator */}
      <motion.div
        className={cn('w-2 h-2 rounded-full', config.dotColor)}
        animate={animated && status === 'in_progress' ? {
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        } : undefined}
        transition={animated ? {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        } : undefined}
      />
      
      <span className="font-medium">{config.label}</span>
      
      {/* Optional emoji indicator for larger sizes */}
      {size !== 'sm' && (
        <span className="text-xs opacity-60">{config.icon}</span>
      )}
    </motion.span>
  );
}