import type { ReactNode } from 'react'
import Navbar from './Navbar'

type AppShellProps = {
  children: ReactNode
}

function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-shell__content">
        {children}
      </main>
    </div>
  )
}

export default AppShell
