# Portal de Clientes - Contabilidade

Um sistema completo de gestão contábil com portal para clientes, desenvolvido com React 18, TypeScript e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **React 18+** com Hooks
- **Vite** (build tool)
- **TypeScript** 
- **Tailwind CSS** (sistema de design customizado)
- **Framer Motion** (animações)
- **Chart.js + react-chartjs-2** (gráficos)
- **React Dropzone** (upload de arquivos)
- **date-fns** (manipulação de datas em pt-BR)
- **React Router** (roteamento)
- **Context API** (gerenciamento de estado)
- **Shadcn/ui** (componentes)

## 🎨 Sistema de Design

### Cor Primária
- **Primary**: `#2c3e50` (HSL: 210 29% 24%)
- Definida no `tailwind.config.ts` como cor principal do sistema

### Paleta de Cores
- **Success**: `#16a34a` (verde)
- **Warning**: `#facc15` (amarelo) 
- **Danger**: `#dc2626` (vermelho)
- **Neutros**: Escala slate (100-900)

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Hierarquia**: Títulos `text-3xl font-bold`, subtítulos `text-lg font-semibold`

## 📦 Instalação e Setup

```bash
# Clone o repositório
git clone <YOUR_GIT_URL>

# Navegue para o diretório
cd portal-contabilidade

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn)
│   ├── Layout.tsx      # Layout principal
│   ├── Sidebar.tsx     # Barra lateral
│   └── Header.tsx      # Cabeçalho
├── contexts/           # Contextos React
│   ├── AuthContext.tsx # Autenticação
│   ├── ThemeContext.tsx # Temas (light/dark)
│   └── ToastContext.tsx # Notificações
├── pages/              # Páginas da aplicação
│   ├── LoginPage.tsx   # Autenticação
│   ├── DashboardPage.tsx # Dashboard principal
│   ├── ObligationsPage.tsx # Obrigações fiscais
│   └── DocumentsPage.tsx # Gestão de documentos
├── hooks/              # Custom hooks
└── lib/                # Utilitários
```

## 🔐 Autenticação

### Credenciais de Demonstração
- **E-mail**: `admin@empresa.com`
- **Senha**: `admin123`

### Mock API
O sistema utiliza uma API simulada para demonstração. Para integrar com backend real:

1. Substitua as funções em `src/contexts/AuthContext.tsx`
2. Configure os endpoints em `VITE_API_BASE_URL`
3. Implemente os seguintes endpoints:

```typescript
// Endpoints esperados
POST /auth/login
POST /auth/refresh
GET /companies/{id}/summary
GET /companies/{id}/obligations
GET /companies/{id}/documents
GET /companies/{id}/messages
GET /companies/{id}/notifications
```

### Headers Esperados
```typescript
{
  'Authorization': 'Bearer {token}',
  'Content-Type': 'application/json'
}
```

## 📊 Funcionalidades Implementadas

### ✅ Concluído
- [x] Sistema de autenticação completo (JWT simulado)
- [x] Layout responsivo com sidebar colapsável
- [x] Dashboard com cards de métricas
- [x] Página de obrigações fiscais com filtros
- [x] Gestão de documentos com upload
- [x] Sistema de temas (light/dark)
- [x] Componentes de toast/notificações
- [x] Badges de status dinâmicos
- [x] Tabelas interativas com hover
- [x] Animações CSS suaves

### 🚧 Próximas Implementações
- [ ] Gráficos interativos (Chart.js)
- [ ] Sistema de mensagens em tempo real
- [ ] Upload drag & drop funcional
- [ ] Testes unitários (Vitest)
- [ ] PWA (Progressive Web App)
- [ ] Relatórios em PDF

## 🎨 Customização de Componentes

O sistema utiliza tokens semânticos definidos no design system:

```css
/* index.css - Tokens principais */
--primary: 210 29% 24%;        /* #2c3e50 */
--success: 142 71% 45%;        /* Verde */
--warning: 45 93% 47%;         /* Amarelo */
--danger: 0 72% 51%;           /* Vermelho */
```

### Exemplo de Uso
```tsx
// ✅ Correto - usando tokens do design system
<Button variant="primary">Ação Principal</Button>

// ❌ Evitar - classes diretas
<Button className="bg-blue-600 text-white">Ação</Button>
```

## 📱 Responsividade

- **Mobile**: Menu lateral slide-in
- **Tablet**: Sidebar colapsável
- **Desktop**: Layout completo com sidebar fixa

## 🔒 Segurança

### Recomendações de Produção
- Use **httpOnly cookies** ao invés de localStorage para tokens
- Implemente **refresh token rotation**
- Configure **CORS** adequadamente
- Use **Signed URLs** para downloads de documentos
- Valide inputs no **frontend e backend**

### Conformidade LGPD
- Todos os dados pessoais devem ser tratados conforme LGPD
- Implemente consentimento explícito
- Mantenha logs de auditoria

## 🧪 Testes

```bash
# Executar testes unitários
npm run test

# Executar testes com coverage
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

## 📦 Build e Deploy

```bash
# Build para produção
npm run build

# Preview da build
npm run preview

# Lint do código
npm run lint
```

## 📄 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview da build
- `npm run lint` - ESLint
- `npm run test` - Testes (quando implementados)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Add nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas técnicas ou suporte, entre em contato:
- **E-mail**: suporte@portal-contabil.com
- **Documentação**: [docs.portal-contabil.com]

---

**© 2024 Portal de Clientes - Sistema de Gestão Contábil**