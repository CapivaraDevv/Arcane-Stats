import { Route, Routes, useLocation } from "react-router-dom";
import { appRoutes, isPrivateRoute, usesShell } from "./routeConfig";

import PageFade from "../../shared/ui/PageFade";
import ProtectedRoute from "../../shared/routing/ProtectedRoute";
import AppShell from "../../layouts/AppShell";

type AppRouterProps = {
  isReady: boolean;
};

export default function AppRouter({ isReady }: AppRouterProps) {
  const location = useLocation();
  if (!isReady) return null;

  return (
    <Routes location={location}>
      {appRoutes.map((route) => {
        const content = isPrivateRoute(route.meta) ? (
          <ProtectedRoute>{route.element}</ProtectedRoute>
        ) : (
          route.element
        );

        const page = <PageFade isReady={isReady}>{content}</PageFade>;

        const withLayout = usesShell(route.meta) ? (
          <AppShell>{page}</AppShell>
        ) : (
          page
        );

        return (
          <Route key={route.path} path={route.path} element={withLayout} />
        );
      })}
    </Routes>
  );
}
