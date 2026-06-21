import { useState } from 'react'
import { ThemeProvider } from './presentation/contexts/ThemeContext'
import { CalculationProvider } from './presentation/contexts/CalculationContext'
import { Header } from './presentation/components/Header'
import { MainPanel } from './presentation/components/MainPanel'
import { HelpPage } from './presentation/components/HelpPage'
import { DataListPage } from './presentation/components/DataListPage'

type Page = 'main' | 'help' | 'data'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('main')

  if (currentPage === 'help') {
    return (
      <ThemeProvider>
        <HelpPage onClose={() => setCurrentPage('main')} />
      </ThemeProvider>
    )
  }

  if (currentPage === 'data') {
    return (
      <ThemeProvider>
        <DataListPage onClose={() => setCurrentPage('main')} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <CalculationProvider>
        <div className="min-h-screen bg-background text-on-surface">
          <Header
            onHelpClick={() => setCurrentPage('help')}
            onDataListClick={() => setCurrentPage('data')}
          />
          <main className="container mx-auto p-4 max-w-2xl">
            <MainPanel />
          </main>
        </div>
      </CalculationProvider>
    </ThemeProvider>
  )
}

export default App
