import { useTheme } from '../contexts/ThemeContext'
import { useCalculation } from '../contexts/CalculationContext'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { clearAll } = useCalculation()

  return (
    <header className="bg-primary text-white px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-bold">電線管占有率計算</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={clearAll}
          className="px-3 py-1.5 text-sm rounded bg-white/20 hover:bg-white/30 transition-colors"
          title="クリア"
        >
          クリア
        </button>
        <button
          onClick={toggleTheme}
          className="px-3 py-1.5 text-sm rounded bg-white/20 hover:bg-white/30 transition-colors"
          title={theme === 'simple' ? '現場モードに切替' : 'シンプルモードに切替'}
        >
          {theme === 'simple' ? '現場' : 'シンプル'}
        </button>
      </div>
    </header>
  )
}
