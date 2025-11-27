import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuth';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuthContext();
  // Aguarda a inicialização do contexto de autenticação antes de decidir redirecionar.
  // Assim evitamos redirecionar para /login enquanto o AuthProvider ainda está lendo a sessão do localStorage.
  const { initialized } = useAuthContext();
  if (!initialized) return null; // ou um placeholder/loading
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
