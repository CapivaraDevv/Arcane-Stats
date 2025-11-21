Teste de Autenticação (localStorage)

O projeto agora inclui um fluxo simples de cadastro/login que funciona apenas no cliente usando localStorage (sem banco de dados). É ideal para prototipagem e demonstração.

Arquivos principais adicionados/alterados:
- `src/hooks/useAuth.tsx` — Contexto de autenticação, gerencia usuários e sessão em localStorage.
- `src/pages/Login.tsx` — Página de login.
- `src/pages/Register.tsx` — Página de registro.
- `src/pages/ProtectedRoute.tsx` — Componente para proteger rotas (redireciona para `/login`).
- `src/pages/AnimatedRoutes.tsx` — Adicionadas rotas `/login` e `/register` e proteção para `/` e `/dashboard`.
- `src/pages/Header.tsx` — Mostra links Entrar/Cadastrar quando deslogado e botão Sair quando logado.
- `src/App.tsx` — Registrado o `AuthProvider` em volta da aplicação.

Como testar localmente

1) Instale dependências (se ainda não):

```powershell
npm install
```

2) Inicie a aplicação:

```powershell
npm run dev
```

3) Abra no navegador em `http://localhost:5173` (ou a porta que o Vite usar).

4) Ao acessar a aplicação, você será redirecionado para `/login` se tentar abrir rotas protegidas. Clique em "Cadastrar" e crie um usuário (nome, e-mail, senha). O usuário será salvo no localStorage e você será logado automaticamente.

5) Você pode sair com o botão "Sair" no cabeçalho. Os usuários cadastrados ficam salvos em localStorage com a chave `arcane_users_v1`. A sessão atual fica em `arcane_session_v1`.

Limitações e observações de segurança

- Isso é apenas para prototipagem. Nunca use esse método em produção.
- Senhas são armazenadas em texto plano no localStorage (intencional para simplicidade). Em produção, sempre envie para um backend seguro e armazene senhas com hashing adequado.
- LocalStorage é acessível por scripts na página. Use cookies com flags seguras ou armazenamento seguro no backend para produção.

Sugestões futuras

- Implementar um backend fake (ex: json-server) ou um mock API para manter a mesma experiência, mas com armazenamento em arquivo.
- Adicionar hashing simples no cliente (não ideal) ou apenas usar um mock endpoint para demonstrar fluxo.


