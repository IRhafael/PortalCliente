import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, FileCheck, Clock, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { DashboardCard } from '@/components/DashboardCard';
import { StatusBadge } from '@/components/StatusBadge';
import { SkeletonLoader, DashboardSkeleton } from '@/components/SkeletonLoader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data
const mockData = {
  summary: {
    pending: 8,
    inProgress: 3,
    completed: 15,
    overdue: 2
  },
  upcomingObligations: [
    {
      id: '1',
      description: 'DARF - Imposto de Renda',
      dueDate: '2024-01-15',
      status: 'pending' as const,
      type: 'Federal'
    },
    {
      id: '2', 
      description: 'ICMS - Dezembro',
      dueDate: '2024-01-20',
      status: 'in_progress' as const,
      type: 'Estadual'
    },
    {
      id: '3',
      description: 'ISS - Dezembro', 
      dueDate: '2024-01-25',
      status: 'pending' as const,
      type: 'Municipal'
    },
    {
      id: '4',
      description: 'Contribuição Previdenciária',
      dueDate: '2024-01-10',
      status: 'overdue' as const,
      type: 'Federal'
    }
  ]
};

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { summary, upcomingObligations } = mockData;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent rounded-2xl -z-10" />
        <div className="p-6">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Dashboard Executivo
          </h1>
          <p className="text-lg text-muted-foreground font-medium flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Visão completa das suas obrigações fiscais e documentos
          </p>
        </div>
      </motion.div>

      {/* Enhanced Summary Cards */}
      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DashboardCard
          title="Pendentes"
          value={summary.pending}
          description="Obrigações aguardando processamento"
          icon={Clock}
          trend={{ value: 5, isPositive: false }}
          delay={0}
        />
        <DashboardCard
          title="Em Análise"
          value={summary.inProgress}
          description="Sendo processadas pelo contador"
          icon={FileCheck}
          trend={{ value: 12, isPositive: true }}
          delay={1}
        />
        <DashboardCard
          title="Concluídas"
          value={summary.completed}
          description="Finalizadas este mês"
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
          delay={2}
        />
        <DashboardCard
          title="Vencidas"
          value={summary.overdue}
          description="Requerem atenção imediata"
          icon={AlertTriangle}
          trend={{ value: 20, isPositive: true }}
          delay={3}
        />
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Enhanced Upcoming Obligations */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="card-premium bg-gradient-card shadow-premium border-card-border relative overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                    <TrendingUp className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Próximos Vencimentos</CardTitle>
                    <CardDescription className="text-sm font-medium">
                      Obrigações que vencem nos próximos dias
                    </CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                  Ver todas
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="space-y-4">
                <AnimatePresence>
                  {upcomingObligations.map((obligation, index) => {
                    const daysUntilDue = getDaysUntilDue(obligation.dueDate);
                    
                    return (
                      <motion.div
                        key={obligation.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="group/item"
                      >
                        <div className="flex items-center justify-between p-4 rounded-xl border border-card-border hover:bg-accent/30 hover:border-primary/20 transition-all duration-200 hover:shadow-card group-hover/item:scale-[1.02]">
                          <div className="space-y-2 flex-1">
                            <p className="font-semibold text-sm">{obligation.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="font-medium">{obligation.type}</span>
                              <span>•</span>
                              <span>Vence em {formatDate(obligation.dueDate)}</span>
                              {daysUntilDue >= 0 ? (
                                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                  {daysUntilDue === 0 ? 'Hoje' : `${daysUntilDue} dias`}
                                </span>
                              ) : (
                                <span className="px-2 py-1 rounded-full bg-danger/10 text-danger font-medium">
                                  Vencido há {Math.abs(daysUntilDue)} dias
                                </span>
                              )}
                            </div>
                          </div>
                          <StatusBadge status={obligation.status} size="sm" animated />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="card-premium bg-gradient-card shadow-premium border-card-border relative overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-success/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 border border-success/20">
                  <Activity className="h-6 w-6 text-success" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">Atividade Recente</CardTitle>
                  <CardDescription className="text-sm font-medium">
                    Últimas atualizações em seus processos
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="space-y-4">
                {[
                  {
                    type: 'success',
                    title: 'Documento aprovado',
                    description: 'Balancete mensal foi aprovado pelo contador',
                    time: 'Há 2 horas',
                    icon: '✅'
                  },
                  {
                    type: 'primary',
                    title: 'Nova mensagem',
                    description: 'Contador enviou comentários sobre declaração anual',
                    time: 'Há 4 horas',
                    icon: '💬'
                  },
                  {
                    type: 'warning',
                    title: 'Lembrete automático',
                    description: 'DARF vence em 3 dias - prepare a documentação',
                    time: 'Ontem',
                    icon: '⚠️'
                  },
                  {
                    type: 'primary',
                    title: 'Upload concluído',
                    description: 'Notas fiscais de dezembro foram processadas',
                    time: '2 dias atrás',
                    icon: '📄'
                  }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.2 }}
                    className="group/activity"
                  >
                    <div className="flex items-start gap-4 p-4 rounded-xl border border-card-border hover:bg-accent/30 hover:border-primary/20 transition-all duration-200 group-hover/activity:scale-[1.02]">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0
                        ${activity.type === 'success' && 'bg-success/10 text-success border border-success/20'}
                        ${activity.type === 'primary' && 'bg-primary/10 text-primary border border-primary/20'}
                        ${activity.type === 'warning' && 'bg-warning/10 text-warning border border-warning/20'}
                      `}>
                        {activity.icon}
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{activity.description}</p>
                        <p className="text-xs text-muted-foreground font-medium">{activity.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}