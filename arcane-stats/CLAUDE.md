# CLAUDE.md

Contexto operacional para Claude Code ao trabalhar no projeto **Arcane Stats**.

## Visão geral

Arcane Stats é uma aplicação web para análise e gerenciamento de estatísticas de jogos, com foco em jogadores, times, partidas, dashboard e configurações. O app é um frontend React/TypeScript executado com Vite e usa persistência local via `localStorage` para prototipagem.

## Diretório principal

O código da aplicação fica em:

```bash
arcane-stats/
```

Execute os comandos de desenvolvimento a partir desse diretório.

## Stack

- React 19 + TypeScript
- Vite 7
- React Router DOM 7
- Tailwind CSS 4 com tokens em `src/index.css`
- Framer Motion para animações
- Recharts para gráficos
- Lucide React para ícones
- ESLint para linting

## Comandos úteis

```bash
cd arcane-stats
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Arquitetura

A organização principal segue separação por aplicação, layouts, features e código compartilhado:

```text
src/
├── app/
│   ├── providers/       # Providers globais
│   └── router/          # Configuração e renderização de rotas
├── layouts/             # Shell visual compartilhado
├── features/            # Domínios funcionais do produto
│   ├── auth/
│   ├── dashboard/
│   ├── home/
│   ├── matches/
│   ├── players/
│   ├── settings/
│   └── teams/
├── shared/              # UI, hooks e routing reutilizáveis
├── components/          # Componentes visuais gerais/legados
├── hooks/               # Hooks globais ou legados
└── lib/                 # Utilidades genéricas
```

### Regras arquiteturais

- Declare rotas somente em `src/app/router/routeConfig.tsx`.
- Use `src/features/<feature>` para regras de domínio, páginas, hooks, services e types específicos.
- Use `src/shared` para componentes e utilitários realmente transversais.
- Mantenha componentes de página focados em composição; regras de negócio devem ir para hooks/services da feature.
- Acesso a `localStorage` deve ficar em `services/*Storage.ts`, não diretamente em componentes visuais.
- Providers globais devem conter apenas estado compartilhado por toda a aplicação.

## Roteamento e layout

Cada rota possui metadados:

- `auth: 'public' | 'private'`
- `layout: 'blank' | 'shell'`

Rotas privadas são envolvidas por `ProtectedRoute`. Rotas com `layout: 'shell'` usam `AppShell`, que compõe header/sidebar.

## Autenticação

A autenticação atual é apenas para protótipo e usa `localStorage`:

- usuários: `arcane_users_v1`
- sessão atual: `arcane_session_v1`

Arquivos relevantes:

- `src/features/auth/hooks/useAuth.tsx`
- `src/features/auth/services/authStorage.ts`
- `src/shared/routing/ProtectedRoute.tsx`
- `src/features/auth/pages/LoginPage.tsx`
- `src/features/auth/pages/RegisterPage.tsx`

Não trate esse fluxo como produção. Não adicione dependências de backend sem alinhar a arquitetura.

## Persistência local

Storages relevantes:

- autenticação: `src/features/auth/services/authStorage.ts`
- times: `src/features/teams/services/teamsStorage.ts`
- configurações: `src/features/settings/services/configStorage.ts`

Ao criar nova persistência, prefira um adapter/service dentro da feature correspondente.

## Estilo de código

- Componentes React em PascalCase.
- Hooks e funções em camelCase.
- Imports sem extensão de arquivo.
- Prefira TypeScript explícito para tipos compartilhados e contratos de hooks/services.
- Prefira componentes pequenos, com props tipadas.
- Não use `try/catch` em torno de imports.
- Evite duplicar listas de rotas, labels de navegação ou regras de proteção.

Exemplo recomendado de componente:

```tsx
type StatBadgeProps = {
  label: string
  value: string | number
}

export function StatBadge({ label, value }: StatBadgeProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-card-glass p-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <strong className="block text-2xl text-foreground">{value}</strong>
    </div>
  )
}
```

## UI e estilos

- Tokens globais de tema ficam em `src/index.css` dentro de `@theme`.
- Classes utilitárias customizadas, como `bg-card-glass`, `text-gradient` e `shadow-glow`, também ficam em `src/index.css`.
- Prefira Tailwind e utilitários existentes antes de criar CSS novo.
- Preserve o visual dark/futurista do projeto.

## Diretrizes de UI

Visual:
- Manter identidade dark/futurista
- Priorizar consistência entre páginas
- Reutilizar componentes existentes antes de criar novos
- Usar tokens do src/index.css
- Preferir bg-card-glass, text-gradient e shadow-glow
- Bordas suaves e visual moderno

Layout:
- Espaçamento consistente
- Responsivo mobile → desktop
- Evitar elementos desalinhados
- Componentes pequenos e reutilizáveis

Animações:
- Usar Framer Motion com moderação
- Evitar animações pesadas
- Não causar re-renderizações desnecessárias
- Preservar performance

Ao alterar páginas:
- Não reescrever página inteira
- Alterar apenas o necessário
- Manter padrão visual das páginas existentes

## Checklist antes de finalizar mudanças

1. Rodar lint quando alterar código TypeScript/React:

   ```bash
   cd arcane-stats && npm run lint
   ```

2. Rodar build quando alterar rotas, providers, tipos globais ou fluxo de build:

   ```bash
   cd arcane-stats && npm run build
   ```

   
## Regras para respostas

- Seja objetivo
- Evite explicações longas
- Mostre apenas o código alterado
- Não reescreva arquivos inteiros sem necessidade
- Explique em no máximo 3 linhas
- Priorize menor impacto possível


3. Conferir se novas rotas foram adicionadas em `routeConfig.tsx`.
4. Conferir se persistência nova não acessa `localStorage` direto em componente visual.
5. Conferir se não há segredo, token ou credencial em arquivos versionados.
