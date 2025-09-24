import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Upload, 
  Settings, 
  ChevronLeft,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Obrigações', href: '/obligations', icon: Calendar },
  { name: 'Documentos', href: '/documents', icon: FileText },
  { name: 'Mensagens', href: '/messages', icon: MessageSquare },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <motion.div 
      className={cn(
        'flex flex-col bg-gradient-card border-r border-card-border backdrop-blur-sm relative z-10',
        'transition-all duration-300 ease-in-out shadow-card'
      )}
      initial={false}
      animate={{
        width: collapsed ? 64 : 256
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      {/* Header with gradient background */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-card-border bg-gradient-header">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">Portal</span>
                <span className="text-xs text-muted-foreground">Contábil</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-9 w-9 p-0 hover:bg-accent/50 transition-all duration-200"
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.div>
        </Button>
      </div>

      {/* Navigation with premium styling */}
      <nav className="flex-1 space-y-1 p-3">
        <TooltipProvider>
          {navigation.map((item, index) => (
            <Tooltip key={item.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => cn(
                    'group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                    'hover:shadow-card hover:scale-[1.02]',
                    isActive 
                      ? 'bg-gradient-sidebar-active text-primary shadow-glow border border-primary/10' 
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground',
                    collapsed && 'justify-center px-0 w-12 mx-auto'
                  )}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                  </motion.div>
                  
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" className="ml-2 glass">
                  <p className="font-medium">{item.name}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>

      {/* Premium footer gradient */}
      <div className="p-3 border-t border-card-border bg-gradient-header">
        {!collapsed && (
          <motion.div 
            className="text-xs text-muted-foreground text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Portal Contábil v2.0
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}