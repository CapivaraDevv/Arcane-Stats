# Frontend Architecture Guide

## Objetivo
Este documento define o padrão arquitetural do frontend para facilitar colaboração em time, reduzir conflitos de merge e melhorar previsibilidade de mudanças.

## Estrutura base
- `src/app`: bootstrap, providers globais, roteamento e composição principal.
- `src/layouts`: shell compartilhado da aplicação (`Header`, `Sidebar`, `AppShell`).
- `src/features/<feature>`: organização por domínio com `pages`, `hooks`, `services`, `types`.
- `src/shared`: recursos transversais reutilizáveis (`ui`, `hooks`, `routing`).

## Convenções
- **Componentes React**: PascalCase (`TeamsPage`, `LoadingScreen`).
- **Funções e hooks**: camelCase (`createTeamHandler`, `useImageFallback`).
- **Imports**: sem extensão de arquivo (`import App from './App'`).
- **Páginas legadas em `src/pages`**: manter apenas wrappers/reexports durante migração.

## Roteamento
- Toda rota deve ser declarada em `src/app/router/routeConfig.tsx`.
- `routeConfig` é a fonte única de verdade para:
  - path da rota
  - proteção por autenticação
  - exibição do shell (`Header`/`Sidebar`)

## Estado e persistência
- Persistência em `localStorage` deve ficar em adapters/repositories da feature (`services/*Storage.ts`).
- Hooks de feature orquestram regras de uso, sem acessar storage diretamente em componentes visuais.
- Providers globais devem ser usados apenas para estado realmente compartilhado no app inteiro.

## Checklist de revisão arquitetural
- Nova regra de negócio está dentro da feature correta?
- O componente de página está focado em composição, sem lógica de persistência?
- A rota foi adicionada no `routeConfig` e não em listas duplicadas?
- Existe reutilização em `shared` para evitar duplicação?
- Imports seguem convenção sem extensão?
