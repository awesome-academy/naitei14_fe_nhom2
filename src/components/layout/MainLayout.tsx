import { type ReactNode } from 'react'
import { RenderHeader } from '@/components/header'
import { RenderFooter } from '@/components/footer'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <RenderHeader />
      <main className="flex-grow">
        {children}
      </main>
      <RenderFooter />
    </div>
  )
}

