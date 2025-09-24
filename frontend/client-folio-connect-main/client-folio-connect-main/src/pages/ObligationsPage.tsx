import React, { useState } from 'react';
import { Search, Filter, Calendar, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/StatusBadge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

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

// Mock data
const mockObligations: Obligation[] = [
  {
    id: '1',
    description: 'DARF - Imposto de Renda PJ',
    type: 'federal',
    dueDate: '2024-01-15',
    status: 'pending',
    value: 2500.00,
    reference: 'Dez/2023',
    priority: 'high'
  },
  {
    id: '2',
    description: 'ICMS - Dezembro',
    type: 'estadual',
    dueDate: '2024-01-20',
    status: 'in_progress',
    value: 1800.50,
    reference: 'Dez/2023',
    priority: 'medium'
  },
  {
    id: '3',
    description: 'ISS - Serviços Prestados',
    type: 'municipal',
    dueDate: '2024-01-25',
    status: 'pending',
    value: 650.00,
    reference: 'Dez/2023',
    priority: 'medium'
  },
  {
    id: '4',
    description: 'Contribuição Previdenciária',
    type: 'federal',
    dueDate: '2024-01-10',
    status: 'overdue',
    value: 3200.00,
    reference: 'Dez/2023',
    priority: 'high'
  },
  {
    id: '5',
    description: 'FGTS - Dezembro',
    type: 'trabalhista',
    dueDate: '2024-01-07',
    status: 'completed',
    value: 1200.00,
    reference: 'Dez/2023',
    priority: 'medium'
  }
];

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

  const filteredObligations = mockObligations.filter(obligation => {
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
        </CardContent>
      </Card>
    </div>
  );
}