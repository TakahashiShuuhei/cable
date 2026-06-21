import { ThemeProvider } from './presentation/contexts/ThemeContext'
import { CalculationProvider } from './presentation/contexts/CalculationContext'
import { Header } from './presentation/components/Header'
import { MainPanel } from './presentation/components/MainPanel'

function App() {
  return (
    <ThemeProvider>
      <CalculationProvider>
        <div className="min-h-screen bg-background text-on-surface">
          <Header />
          <main className="container mx-auto p-4 max-w-2xl">
            <MainPanel />
          </main>
        </div>
      </CalculationProvider>
    </ThemeProvider>
  )
}

export default App
