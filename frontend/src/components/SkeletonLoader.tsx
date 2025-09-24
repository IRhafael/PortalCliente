import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'card' | 'text' | 'circle' | 'rectangle';
  lines?: number;
  animate?: boolean;
}

const skeletonVariants = {
  card: 'h-32 w-full rounded-2xl',
  text: 'h-4 w-3/4 rounded',
  circle: 'h-12 w-12 rounded-full',
  rectangle: 'h-20 w-full rounded-lg'
};

export function SkeletonLoader({ 
  className, 
  variant = 'rectangle', 
  lines = 1, 
  animate = true 
}: SkeletonLoaderProps) {
  const Wrapper = animate ? motion.div : 'div';
  
  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: lines }, (_, i) => (
          <Wrapper
            key={i}
            className={cn(
              'skeleton bg-gradient-to-r from-muted via-muted/50 to-muted rounded',
              i === lines - 1 ? 'w-1/2' : 'w-full',
              'h-4',
              className
            )}
            {...(animate && {
              initial: { opacity: 0.3 },
              animate: { opacity: [0.3, 0.8, 0.3] },
              transition: {
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1
              }
            })}
          />
        ))}
      </div>
    );
  }

  return (
    <Wrapper
      className={cn(
        'skeleton bg-gradient-to-r from-muted via-muted/50 to-muted',
        skeletonVariants[variant],
        className
      )}
      {...(animate && {
        initial: { opacity: 0.3 },
        animate: { opacity: [0.3, 0.8, 0.3] },
        transition: {
          duration: 1.5,
          repeat: Infinity
        }
      })}
    />
  );
}

// Dashboard specific skeleton
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <SkeletonLoader variant="text" className="h-8 w-64" />
        <SkeletonLoader variant="text" className="h-4 w-96" />
      </div>

      {/* Cards skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <SkeletonLoader variant="card" className="h-36" />
          </motion.div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SkeletonLoader className="h-96 rounded-2xl" />
        <SkeletonLoader className="h-96 rounded-2xl" />
      </div>
    </div>
  );
}