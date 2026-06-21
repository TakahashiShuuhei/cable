import { useTheme } from '../contexts/ThemeContext'
import { useCalculation } from '../contexts/CalculationContext'

export function Header() {
  const { toggleTheme } = useTheme()
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
          title="テーマを切り替え"
        >
          テーマ切替
        </button>
      </div>
    </header>
  )
}
