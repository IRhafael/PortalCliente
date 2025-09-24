import React from 'react';
import { Bell, Moon, Sun, User, LogOut, Menu, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
  className?: string;
}

export function Header({ onToggleSidebar, sidebarCollapsed, className }: HeaderProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header 
      className={cn(
        'flex h-16 items-center justify-between border-b border-card-border bg-gradient-header px-6 shadow-card backdrop-blur-sm relative z-10',
        className
      )}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left side with premium styling */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="md:hidden h-9 w-9 p-0 hover:bg-accent/50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
        
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Portal de Clientes
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              Bem-vindo, <span className="text-primary font-semibold">{user?.name}</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side with enhanced interactions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle with smooth animation */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-9 w-9 p-0 hover:bg-accent/50 relative overflow-hidden group"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </motion.div>
          </Button>
        </motion.div>

        {/* Enhanced Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0 hover:bg-accent/50 group">
                <Bell className="h-4 w-4 group-hover:animate-pulse" />
                {/* Badge de notificações será exibido aqui quando houver notificações reais */}
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 glass border-card-border">
            <DropdownMenuLabel className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              Notificações Recentes
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* Notificações reais devem ser renderizadas aqui futuramente */}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Enhanced User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-accent/50 group">
                <div className="h-7 w-7 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                  <User className="h-3 w-3 text-primary-foreground" />
                </div>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass border-card-border">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                <p className="text-xs text-primary font-medium">{user?.company}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-accent/50">
              <User className="mr-3 h-4 w-4 text-muted-foreground" />
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-accent/50">
              <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={logout}
              className="hover:bg-danger/10 hover:text-danger focus:bg-danger/10 focus:text-danger"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sair do Sistema
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
}