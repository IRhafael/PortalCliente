import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  delay?: number;
}

// Animated counter component
function AnimatedCounter({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const increment = Math.max(1, Math.ceil(end / (duration / 16)));
    let timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

export function DashboardCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  className,
  delay = 0
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
    >
      <Card className={cn(
        'card-premium bg-gradient-card shadow-card hover:shadow-premium border-card-border relative overflow-hidden group',
        className
      )}>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">
            {title}
          </CardTitle>
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="h-5 w-5 text-primary" />
          </motion.div>
        </CardHeader>
        
        <CardContent className="relative">
          <div className="flex items-baseline justify-between mb-2">
            <motion.div 
              className="text-3xl font-bold text-foreground"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay * 0.1 + 0.3, type: "spring" }}
            >
              {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
            </motion.div>
            
            {trend && (
              <motion.div
                className={cn(
                  'flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full',
                  trend.isPositive 
                    ? 'text-success bg-success/10' 
                    : 'text-danger bg-danger/10'
                )}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay * 0.1 + 0.5 }}
              >
                <span className="text-xs">
                  {trend.isPositive ? '↗' : '↘'}
                </span>
                <span>{Math.abs(trend.value)}%</span>
              </motion.div>
            )}
          </div>
          
          {description && (
            <motion.p 
              className="text-sm text-muted-foreground font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay * 0.1 + 0.4 }}
            >
              {description}
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}