import React, { useState } from 'react';
import { Upload, FileText, Download, Eye, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'xlsx' | 'docx' | 'image';
  size: number;
  uploadDate: string;
  category: 'fiscal' | 'contabil' | 'trabalhista' | 'outros';
  status: 'pending' | 'approved' | 'rejected';
}

// Mock data
const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Balancete_Dezembro_2023.pdf',
    type: 'pdf',
    size: 1024000,
    uploadDate: '2024-01-08',
    category: 'contabil',
    status: 'approved'
  },
  {
    id: '2',
    name: 'Notas_Fiscais_Dezembro.xlsx',
    type: 'xlsx',
    size: 2048000,
    uploadDate: '2024-01-07',
    category: 'fiscal',
    status: 'pending'
  },
  {
    id: '3',
    name: 'Folha_Pagamento_Dezembro.pdf',
    type: 'pdf',
    size: 512000,
    uploadDate: '2024-01-06',
    category: 'trabalhista',
    status: 'approved'
  }
];

const categoryLabels = {
  fiscal: 'Fiscal',
  contabil: 'Contábil',
  trabalhista: 'Trabalhista',
  outros: 'Outros'
};

const statusLabels = {
  pending: 'Pendente',
  approved: 'Aprovado',
  rejected: 'Rejeitado'
};

const statusColors = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  approved: 'bg-success/10 text-success border-success/20',
  rejected: 'bg-danger/10 text-danger border-danger/20'
};

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Documentos</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie e organize todos os seus documentos fiscais e contábeis
        </p>
      </div>

      {/* Upload Area */}
      <Card className="shadow-card border-dashed border-2 border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upload de Documentos</h3>
          <p className="text-sm text-muted-foreground text-center mb-6 max-w-md">
            Arraste e solte seus arquivos aqui ou clique para selecionar. 
            Suportamos PDF, Excel, Word e imagens.
          </p>
          <Button className="bg-primary hover:bg-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            Selecionar Arquivos
          </Button>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Documentos Enviados</CardTitle>
          <CardDescription>
            Todos os documentos enviados e seu status de aprovação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Data Upload</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((document) => (
                <TableRow 
                  key={document.id}
                  className="hover:bg-accent/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{document.name}</p>
                        <p className="text-xs text-muted-foreground uppercase">
                          {document.type}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {categoryLabels[document.category]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatFileSize(document.size)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(document.uploadDate)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={statusColors[document.status]}
                      variant="outline"
                    >
                      {statusLabels[document.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}