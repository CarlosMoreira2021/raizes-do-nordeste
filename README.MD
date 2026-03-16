# 🌵 Raízes do Nordeste — API Back-End

API REST para gerenciamento da rede de lanchonetes **Raízes do Nordeste**, desenvolvida como projeto multidisciplinar da trilha Back-End.

---

## 🌐 Deploy

A API está disponível em produção:

- **API:** https://raizes-do-nordeste-production.up.railway.app
- **Swagger:** https://raizes-do-nordeste-production.up.railway.app/documentacao
- **Saúde:** https://raizes-do-nordeste-production.up.railway.app/saude
- **Repositório:** https://github.com/CarlosMoreira2021/raizes-do-nordeste

---

## 🛠️ Tecnologias utilizadas

- **Node.js** + **TypeScript**
- **Express** — framework HTTP
- **Prisma ORM** — acesso ao banco de dados
- **PostgreSQL** — banco de dados relacional
- **JWT** — autenticação por token
- **bcryptjs** — criptografia de senhas
- **Swagger/OpenAPI** — documentação da API

---

## 🧰 Ferramentas de desenvolvimento

- **Postman** — testes e documentação dos endpoints
- **pgAdmin 4** — interface visual do banco de dados
- **Git/GitHub** — controle de versão
- **Railway** — plataforma de deploy

---

## ✅ Requisitos

- Node.js 18+
- npm 9+
- PostgreSQL 17

---

## ⚙️ Configuração do ambiente

1. Clone o repositório:
```bash
git clone https://github.com/CarlosMoreira2021/raizes-do-nordeste.git
cd raizes-do-nordeste
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente — crie um arquivo `.env` na raiz com base no `.env.example`:
```
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/raizes_do_nordeste?schema=public"
JWT_SEGREDO="raizes_nordeste_segredo_super_secreto"
JWT_EXPIRACAO="24h"
PORTA=3000
```

> Exemplo: `"postgresql://postgres:admin123@localhost:5432/raizes_do_nordeste?schema=public"`

---

## 🗄️ Banco de dados

### Passo 1 — Criar o banco de dados

Escolha uma das opções abaixo:

**Opção A — Via terminal:**
```bash
psql -U postgres -c "CREATE DATABASE raizes_do_nordeste;"
```

**Opção B — Caminho completo (Windows, se psql não for reconhecido):**
```bash
"C:\Program Files\PostgreSQL\17\bin\psql" -U postgres -c "CREATE DATABASE raizes_do_nordeste;"
```
> Se instalou outra versão, troque o `17` pela versão instalada (ex: `16`, `15`)

**Opção C — Via pgAdmin 4 (sem terminal):**
1. Abra o **pgAdmin 4**
2. No painel esquerdo, expanda **Servers → PostgreSQL**
3. Clique com botão direito em **Databases**
4. Clique em **Create → Database**
5. No campo **Database**, digite: `raizes_do_nordeste`
6. Clique em **Save**

### Passo 2 — Rodar as migrations e seed
```bash
npx prisma migrate dev
npx prisma generate
npm run seed
```

---

## 🚀 Iniciando a API
```bash
npm run dev
```

Servidor rodando em: `http://localhost:3000`

---

## 📚 Documentação

Swagger disponível em produção:
```
https://raizes-do-nordeste-production.up.railway.app/documentacao
```

Ou localmente:
```
http://localhost:3000/documentacao
```

---

## 🧪 Testes

A coleção de testes está disponível no arquivo `postman_collection.json` na raiz do repositório.

### Credenciais para teste:
- **Admin:** admin@raizes.com / Admin@123
- **Cliente:** cliente@raizes.com / Cliente@123

### Como executar os testes:

**Passo 1 — Importar a coleção:**
1. Abra o Postman
2. Clique em **Import**
3. Selecione o arquivo `postman_collection.json`

**Passo 2 — Executar os testes:**
1. Execute o **T01 - Login válido** primeiro — ele salva o token automaticamente
2. Execute os demais testes na ordem:
   - Auth → Erros de Autenticacao → Unidades → Produtos → Estoque → Pedidos → Pagamentos → Fidelidade → Promocoes

### Cenários cobertos (22 testes):

| ID | Cenário | Tipo | Status Esperado |
|----|---------|------|----------------|
| T01 | Login válido | Positivo | 200 |
| T02 | Login inválido | Negativo | 401 |
| T03 | Registrar usuário | Positivo | 201 |
| T04 | Acesso sem token | Negativo | 401 |
| T05 | Token inválido | Negativo | 401 |
| T06 | Criar unidade (ADMIN) | Positivo | 201 |
| T07 | Listar unidades | Positivo | 200 |
| T08 | Listar produtos | Positivo | 200 |
| T09 | Criar produto | Positivo | 201 |
| T10 | Produto duplicado | Negativo | 409 |
| T11 | Entrada de estoque | Positivo | 200 |
| T12 | Consultar estoque | Positivo | 200 |
| T13 | Criar pedido válido | Positivo | 201 |
| T14 | Canal inválido | Negativo | 422 |
| T15 | Filtrar pedidos por canal | Positivo | 200 |
| T16 | Atualizar status pedido | Positivo | 200 |
| T17 | Processar pagamento mock | Positivo | 200 |
| T18 | Pedido inexistente | Negativo | 404 |
| T19 | Consultar saldo pontos | Positivo | 200 |
| T20 | Resgatar pontos insuficientes | Negativo | 409 |
| T21 | Listar promoções ativas | Positivo | 200 |
| T22 | Simular desconto no pedido | Positivo | 200 |

---

## 📋 Módulos implementados

| Módulo | Endpoints | Descrição |
|--------|-----------|-----------|
| Auth | POST /auth/registrar, POST /auth/login | Autenticação JWT |
| Unidades | GET/POST/PATCH /unidades | Gestão de unidades da rede |
| Produtos | GET/POST/PATCH /produtos | Cardápio com paginação |
| Estoque | GET/POST /estoque | Controle por unidade |
| Pedidos | GET/POST /pedidos, PATCH /pedidos/:id/status | Fluxo completo com canalPedido |
| Pagamentos | POST /pagamentos/processar | Mock de pagamento |
| Fidelidade | GET/POST /fidelidade | Pontos e resgate |
| Promoções | GET /promocoes, POST /promocoes/simular | Campanhas e descontos |

---

## 🔐 Perfis de acesso

| Perfil | Permissões |
|--------|-----------|
| ADMIN | Acesso total |
| GERENTE | Gerenciar unidades, produtos e estoque |
| ATENDENTE | Visualizar e gerenciar pedidos |
| COZINHA | Atualizar status de pedidos |
| CLIENTE | Realizar pedidos e consultar fidelidade |

---

## 📦 Estrutura do projeto
```
src/
├── controladores/    # Recebe requisições e retorna respostas
├── servicos/         # Regras de negócio
├── repositorios/     # Acesso ao banco de dados
├── middlewares/      # Autenticação e autorização
├── rotas/            # Definição dos endpoints
└── utilitarios/      # JWT, Prisma client, Swagger, Logger
prisma/
├── schema.prisma     # Modelo do banco de dados
├── migrations/       # Histórico de migrations
└── seed.ts           # Dados iniciais
logs/                 # Logs de auditoria (gerado automaticamente)
```

---

## 🔄 Fluxo crítico
```
Cliente cria pedido → Valida estoque → Cria pedido (status: AGUARDANDO_PAGAMENTO)
→ Processa pagamento mock → Aprovado: status PAGAMENTO_APROVADO + pontos fidelidade
                          → Recusado: status CANCELADO
```

---

## 🔒 Segurança e LGPD

- Senhas armazenadas com hash bcrypt
- Autenticação via JWT com expiração de 24h
- Autorização por perfil em todos os endpoints sensíveis
- Dados pessoais coletados: nome, email (finalidade: autenticação e fidelização)
- Logs de auditoria para ações sensíveis: criação de pedidos, pagamentos e mudanças de status
- Respostas da API não expõem dados sensíveis como senha

---

## 📝 Observações

Projeto desenvolvido como atividade prática do curso de Desenvolvimento Back-End da UNINTER, simulando um cenário real de mercado para uma rede de lanchonetes em expansão.