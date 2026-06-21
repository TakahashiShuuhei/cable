import { useState } from 'react'
import { ThemeProvider } from './presentation/contexts/ThemeContext'
import { CalculationProvider } from './presentation/contexts/CalculationContext'
import { Header } from './presentation/components/Header'
import { MainPanel } from './presentation/components/MainPanel'
import { HelpPage } from './presentation/components/HelpPage'

function App() {
  const [showHelp, setShowHelp] = useState(false)

  if (showHelp) {
    return (
      <ThemeProvider>
        <HelpPage onClose={() => setShowHelp(false)} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <CalculationProvider>
        <div className="min-h-screen bg-background text-on-surface">
          <Header onHelpClick={() => setShowHelp(true)} />
          <main className="container mx-auto p-4 max-w-2xl">
            <MainPanel />
          </main>
        </div>
      </CalculationProvider>
    </ThemeProvider>
  )
}

export default App
