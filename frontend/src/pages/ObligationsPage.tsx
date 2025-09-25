import React, { useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon, FileText, Eye, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type ObligationType = 'federal' | 'estadual' | 'municipal' | 'trabalhista';
type ObligationStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

interface Obligation {
  id: string;
  description: string;
  type: ObligationType;
  dueDate: string;
  status: ObligationStatus;
  value?: number;
  reference: string;
  priority: 'high' | 'medium' | 'low';
}


import { useEffect } from 'react';

const typeLabels: Record<ObligationType, string> = {
  federal: 'Federal',
  estadual: 'Estadual',
  municipal: 'Municipal',
  trabalhista: 'Trabalhista'
};

const priorityColors = {
  high: 'bg-danger/10 text-danger border-danger/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-success/10 text-success border-success/20'
};


export default function ObligationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [obligations, setObligations] = useState<Obligation[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const { toast } = useToast();

  // Formulário de criação
  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      description: '',
      type: 'federal',
      dueDate: '',
      status: 'pending',
      value: '',
      reference: '',
      priority: 'medium',
    }
  });

  const dueDateValue = watch('dueDate');

  async function fetchObligations() {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/obligations/', {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      if (res.ok) {
        const data = await res.json();
        // Converter due_date para dueDate
        const mapped = Array.isArray(data)
          ? data.map((item) => ({ ...item, dueDate: item.due_date }))
          : [];
        setObligations(mapped);
      } else {
        setObligations([]);
      }
    } catch {
      setObligations([]);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    fetchObligations();
  }, []);

  // Criação de obrigação
  async function onCreateObligation(data: any) {
    try {
      // Log dos dados enviados
      console.log('[FRONTEND] Enviando para /api/obligations/:', data);
      const token = localStorage.getItem('auth_token');
      console.log('[FRONTEND] Token JWT:', token);
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch('/api/obligations/', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          description: data.description,
          type: data.type,
          due_date: data.dueDate, // Corrigir para due_date
          status: data.status,
          value: data.value ? parseFloat(data.value) : null,
          reference: data.reference,
          priority: data.priority,
        })
      });
      const responseText = await res.text();
      console.log('[FRONTEND] Status:', res.status, 'Response:', responseText);
      if (res.ok) {
        toast({ title: 'Obrigação criada!', description: 'A obrigação foi cadastrada com sucesso.' });
        setOpenCreate(false);
        reset();
        fetchObligations();
      } else {
        toast({ title: 'Erro ao criar obrigação', description: 'Verifique os dados e tente novamente.', variant: 'destructive' });
      }
    } catch (err) {
      console.error('[FRONTEND] Erro ao criar obrigação:', err);
      toast({ title: 'Erro de conexão', description: 'Não foi possível conectar ao servidor.', variant: 'destructive' });
    }
  }

  const filteredObligations = obligations.filter(obligation => {
    const matchesSearch = obligation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || obligation.status === statusFilter;
    const matchesType = typeFilter === 'all' || obligation.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

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
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Obrigações Fiscais</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie todas as suas obrigações fiscais e tributárias
        </p>
      </div>

      {/* Botão Nova Obrigação */}
      <div className="flex justify-end">
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Nova Obrigação
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Obrigação</DialogTitle>
              <DialogDescription>Preencha os dados para cadastrar uma nova obrigação fiscal.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleSubmit(onCreateObligation)}>
              <div>
                <label className="text-sm font-medium">Descrição</label>
                <Input {...register('description', { required: 'Descrição obrigatória' })} placeholder="Ex: DCTF Mensal" />
                {errors.description && <span className="text-xs text-danger">{errors.description.message as string}</span>}
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-sm font-medium">Tipo</label>
                  <Select value={watch('type')} onValueChange={v => setValue('type', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="federal">Federal</SelectItem>
                      <SelectItem value="estadual">Estadual</SelectItem>
                      <SelectItem value="municipal">Municipal</SelectItem>
                      <SelectItem value="trabalhista">Trabalhista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">Prioridade</label>
                  <Select value={watch('priority')} onValueChange={v => setValue('priority', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="low">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-sm font-medium">Vencimento</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      {...register('dueDate', { required: 'Vencimento obrigatório' })}
                    />
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.dueDate && <span className="text-xs text-danger">{errors.dueDate.message as string}</span>}
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">Valor (opcional)</label>
                  <Input type="number" step="0.01" min="0" {...register('value')} placeholder="0,00" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-sm font-medium">Referência</label>
                  <Input {...register('reference', { required: 'Referência obrigatória' })} placeholder="Ex: 08/2025" />
                  {errors.reference && <span className="text-xs text-danger">{errors.reference.message as string}</span>}
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={watch('status')} onValueChange={v => setValue('status', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="in_progress">Em Análise</SelectItem>
                      <SelectItem value="completed">Concluída</SelectItem>
                      <SelectItem value="overdue">Vencida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Salvando...' : 'Salvar'}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
          <CardDescription>
            Filtre as obrigações por status, tipo ou busque por descrição
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="in_progress">Em Análise</SelectItem>
                  <SelectItem value="completed">Concluída</SelectItem>
                  <SelectItem value="overdue">Vencida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-2 block">Tipo</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="federal">Federal</SelectItem>
                  <SelectItem value="estadual">Estadual</SelectItem>
                  <SelectItem value="municipal">Municipal</SelectItem>
                  <SelectItem value="trabalhista">Trabalhista</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Obligations Table */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Lista de Obrigações</CardTitle>
              <CardDescription>
                {filteredObligations.length} obrigações encontradas
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center text-muted-foreground py-8">Carregando obrigações...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredObligations.map((obligation) => {
                  const daysUntilDue = getDaysUntilDue(obligation.dueDate);
                  return (
                    <TableRow 
                      key={obligation.id} 
                      className="hover:bg-accent/50 transition-colors"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{obligation.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Ref: {obligation.reference}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {typeLabels[obligation.type]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{formatDate(obligation.dueDate)}</p>
                          {daysUntilDue >= 0 ? (
                            <p className="text-xs text-muted-foreground">
                              {daysUntilDue === 0 ? 'Vence hoje' : `${daysUntilDue} dias`}
                            </p>
                          ) : (
                            <p className="text-xs text-danger">
                              Vencida há {Math.abs(daysUntilDue)} dias
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {obligation.value && (
                          <span className="font-medium">
                            {formatCurrency(obligation.value)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={obligation.status} size="sm" />
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={priorityColors[obligation.priority]}
                          variant="outline"
                        >
                          {obligation.priority === 'high' && 'Alta'}
                          {obligation.priority === 'medium' && 'Média'}
                          {obligation.priority === 'low' && 'Baixa'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}