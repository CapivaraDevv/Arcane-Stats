import { Link } from "react-router-dom";

export default function AppFooter() {
  return (
    <footer className="relative z-10 mt-20 border-t border-border bg-[hsl(var(--background)/0.8)] backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="font-display text-xl font-bold text-gradient">
              Arcane Stats
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              Análise competitiva acessível.
            </p>
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/login" className="hover:text-primary transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-primary transition">
              Cadastro
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
          © 2025 Arcane Stats. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
