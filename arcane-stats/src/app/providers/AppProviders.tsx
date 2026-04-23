import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AssetProvider } from '../../hooks/useAssets'
import { AuthProvider } from '../../hooks/useAuth'

type AppProvidersProps = {
  children: ReactNode
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <AssetProvider>
        <AuthProvider>{children}</AuthProvider>
      </AssetProvider>
    </BrowserRouter>
  )
}
