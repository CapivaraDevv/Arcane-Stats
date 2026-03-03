# 🎮 Arcane Stats

Uma aplicação web moderna para análise e gerenciamento de estatísticas de jogos, construída com React, TypeScript e Vite.

## 📋 Sobre o Projeto

**Arcane Stats** é uma plataforma completa para acompanhar e analisar estatísticas de jogadores e partidas. A aplicação oferece dashboards interativos, gerenciamento de times, análise de desempenho e um sistema de autenticação integrado.

### ✨ Funcionalidades Principais

- 🔐 **Autenticação**: Sistema de login e registro (armazenamento em localStorage)
- 📊 **Dashboard**: Visualização de estatísticas e métricas em tempo real
- 👥 **Gerenciamento de Jogadores**: Cadastro e acompanhamento de jogadores
- 🏆 **Gerenciamento de Times**: Organização de equipes
- 🎮 **Registro de Partidas**: Cadastro e análise de partidas
- 💡 **Painel de Dicas**: Orientações e sugestões estratégicas
- ⚙️ **Configurações**: Personalizações de preferências do usuário
- 🎨 **Interface Responsiva**: Design moderno com animações suaves

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Linguagem**: TypeScript 5.9.3
- **Build Tool**: Vite 7.1.7
- **Navegação**: React Router DOM 7.9.5
- **Animações**: Framer Motion 12.23.24
- **Visualização de Dados**: Recharts 3.3.0
- **Estilização**: Tailwind CSS 4.1.16
- **Linting**: ESLint 9.36.0

## 📦 Instalação

### Pré-requisitos

- Node.js 16+ 
- npm ou yarn

### Passos de Setup

1. **Clone o repositório** (ou extraia os arquivos):
```bash
cd arcane-stats
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure as variáveis de ambiente** (se necessário):
Crie um arquivo `.env` na raiz do projeto com as configurações necessárias.

## 🚀 Como Executar

### Modo Desenvolvimento

```bash
npm run dev
```

A aplicação abrirá em `http://localhost:5173` (ou a porta que o Vite usar).

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 🏗️ Estrutura do Projeto

```
src/
├── App.tsx                 # Componente principal da aplicação
├── App.css                 # Estilos globais
├── main.tsx                # Entry point
├── index.css               # Estilos base
├── assets/                 # Imagens, fontes e outros assets
├── components/
│   └── ScrollReveal.tsx    # Componente de animação de scroll
├── hooks/
│   ├── useAuth.tsx         # Hook de autenticação (Context API)
│   ├── useConfig.ts        # Hook de configurações do usuário
│   └── useTeams.tsx        # Hook para gerenciamento de times
└── pages/
    ├── AnimatedRoutes.tsx  # Definição de rotas com transições
    ├── Dashboard.tsx       # Página principal com estatísticas
    ├── Jogadores.tsx       # Gerenciamento de jogadores
    ├── Times.tsx           # Gerenciamento de times
    ├── Partidas.tsx        # Registro e análise de partidas
    ├── PainelDicas.tsx     # Painel de dicas estratégicas
    ├── Configuracoes.tsx   # Página de configurações do usuário
    ├── Login.tsx           # Página de login
    ├── Register.tsx        # Página de registro
    ├── Header.tsx          # Cabeçalho da aplicação
    ├── Sidebar.tsx         # Menu lateral de navegação
    ├── ProtectedRoute.tsx  # Wrapper para rotas protegidas
    ├── LoadingScreenn.tsx  # Tela de carregamento
    └── PageFade.tsx        # Componente de transição de páginas
```

## 🔐 Sistema de Autenticação

O projeto inclui um sistema completo de autenticação baseado em **localStorage** (ideal para prototipagem e demonstração).

### Como Funciona

1. **Registro**: Crie uma nova conta com nome, e-mail e senha
2. **Login**: Acesse com suas credenciais
3. **Proteção de Rotas**: Rotas protegidas redirecionam para login se não autenticado
4. **Logout**: Botão "Sair" no cabeçalho

### Detalhes Técnicos

- **Hook Principal**: `useAuth.tsx` - Gerencia contexto de autenticação
- **Armazenamento**: 
  - Usuários cadastrados: `arcane_users_v1` (localStorage)
  - Sessão atual: `arcane_session_v1` (localStorage)
- **Componentes Relacionados**:
  - `Login.tsx` - Formulário de login
  - `Register.tsx` - Formulário de registro
  - `ProtectedRoute.tsx` - Proteção de rotas

### ⚠️ Observações de Segurança

> **Importante**: Este sistema é apenas para **prototipagem e demonstração**. Para produção:
> 
> - Implementar um backend seguro com autenticação adequada
> - Usar JWT ou sessões seguras
> - Armazenar senhas com hash (bcrypt, scrypt, etc.)
> - Implementar HTTPS
> - Usar cookies com flags de segurança (HttpOnly, Secure, SameSite)

Para mais detalhes sobre autenticação, consulte [README_AUTH.md](README_AUTH.md).

## 📖 Páginas Principais

| Página | Descrição | Rota Protegida |
|--------|-----------|----------------|
| Dashboard | Visão geral de estatísticas | ✅ |
| Jogadores | Gerenciamento de jogadores cadastrados | ✅ |
| Times | Organização de equipes | ✅ |
| Partidas | Registro e análise de jogos | ✅ |
| Painel de Dicas | Orientações e estratégias | ✅ |
| Configurações | Preferências do usuário | ✅ |
| Login | Acesso à plataforma | ❌ |
| Register | Criação de novas contas | ❌ |

## 🎨 Design e UX

- ✨ Animações suaves com Framer Motion
- 📱 Interface completamente responsiva
- 🌈 Tailwind CSS para estilização moderna
- 🎬 Transições de página animadas
- ♿ Foco em acessibilidade

## 🔄 Fluxo de Dados

A aplicação utiliza a **Context API** do React para gerenciamento de estado global:

- **AuthContext**: Gerencia autenticação, usuários e sessão
- **ConfigContext**: Preferências e configurações do usuário
- **TeamsContext**: Dados sobre times e estrutura

## 🚀 Próximas Melhorias Sugeridas

- [ ] Integração com backend real (Node.js, Django, etc.)
- [ ] Banco de dados (PostgreSQL, MongoDB, etc.)
- [ ] API REST completa
- [ ] Sistema de permissões por role (Admin, Player, Coach)
- [ ] Gráficos e relatórios mais avançados
- [ ] Exportação de estatísticas (PDF, Excel)
- [ ] Notificações em tempo real
- [ ] Dark mode

## 📝 Notas de Desenvolvimento

- O projeto usa TypeScript rigorosamente para segurança de tipos
- ESLint configurado para garantir qualidade do código
- Vite oferece Hot Module Replacement (HMR) para desenvolvimento rápido
- Tailwind CSS com PostCSS para processamento de estilos

## 📲 Troubleshooting

### Porta 5173 já em uso?
```bash
npm run dev -- --port 3000
```

### Limpar cache e reinstalar dependências:
```bash
rm -r node_modules
npm install
```

### Atualizar dependências:
```bash
npm update
```

## 📄 Licença

Este projeto é fornecido como está para fins educacionais e de desenvolvimento.

---

**Desenvolvido com ❤️ usando React + TypeScript + Vite**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
