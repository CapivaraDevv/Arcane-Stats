import type { ReactNode } from 'react'
// import Header from './Header'
import Sidebar from './Sidebar'

type AppShellProps = {
  children: ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* {showShell && <Header />} */}
        {children}
      </div>
    </div>
  )
}
