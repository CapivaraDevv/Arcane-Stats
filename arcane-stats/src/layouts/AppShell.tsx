import type { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

type AppShellProps = {
  showShell: boolean
  children: ReactNode
}

export default function AppShell({ showShell, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      {showShell && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {/* {showShell && <Header />} */}
        {children}
      </div>
    </div>
  )
}
