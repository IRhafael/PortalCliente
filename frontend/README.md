# Portal de Clientes para Contabilidade

## Setup

```bash
npm install
npm run dev
```

## Variáveis de ambiente

Veja `.env.example`.

## Testes

```bash
npm run test
```

## Como integrar com backend real

- Substitua `mockApi` por chamadas REST reais em `src/services/`.
- Endpoints esperados:
  - `POST /auth/login`
  - `POST /auth/refresh`
  - `GET /companies/{id}/summary`
  - etc.
- Use tokens JWT em cookies httpOnly para maior segurança.
- Veja comentários no código para pontos de integração.

## Segurança

- Tokens podem ser armazenados em localStorage (menos seguro) ou cookies httpOnly (mais seguro, recomendado).
- URLs de download de documentos devem ser signed URLs.
- Atenção à LGPD: não exponha dados sensíveis no frontend.

## Screenshots

![Dashboard](./screenshots/dashboard.png)
![Obrigações](./screenshots/obrigacoes.png)
![Mensagens](./screenshots/mensagens.png)
