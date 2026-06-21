import { ThemeProvider } from './presentation/contexts/ThemeContext'
import { CalculationProvider } from './presentation/contexts/CalculationContext'
import { Header } from './presentation/components/Header'
import { ConduitSelector } from './presentation/components/ConduitSelector'
import { WireAddForm } from './presentation/components/WireAddForm'
import { WireList } from './presentation/components/WireList'
import { OccupancyResult } from './presentation/components/OccupancyResult'

function App() {
  return (
    <ThemeProvider>
      <CalculationProvider>
        <div className="min-h-screen bg-background text-on-surface">
          <Header />
          <main className="container mx-auto p-4 max-w-2xl space-y-4">
            <OccupancyResult />
            <ConduitSelector />
            <WireAddForm />
            <WireList />
          </main>
        </div>
      </CalculationProvider>
    </ThemeProvider>
  )
}

export default App
