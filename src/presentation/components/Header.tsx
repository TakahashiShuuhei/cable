import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useCalculation } from '../contexts/CalculationContext'

interface HeaderProps {
  onHelpClick: () => void
  onDataListClick: () => void
}

export function Header({ onHelpClick, onDataListClick }: HeaderProps) {
  const { toggleTheme } = useTheme()
  const { state, clearAll } = useCalculation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // メニュー外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const hasUnsavedChanges = state.conduitSizeId && state.wires.length > 0

  const handleClearAll = () => {
    if (hasUnsavedChanges) {
      if (!window.confirm('現在の編集内容が破棄されます。クリアしますか？')) {
        setIsMenuOpen(false)
        return
      }
    }
    clearAll()
    setIsMenuOpen(false)
  }

  const handleToggleTheme = () => {
    toggleTheme()
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-primary text-white px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-bold">電線管占有率計算</h1>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded hover:bg-white/20 transition-colors"
          aria-label="メニュー"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-lg border border-border overflow-hidden z-50">
            <button
              onClick={handleClearAll}
              className="w-full px-4 py-3 text-left text-on-surface hover:bg-background"
            >
              クリア
            </button>
            <button
              onClick={handleToggleTheme}
              className="w-full px-4 py-3 text-left text-on-surface hover:bg-background"
            >
              テーマ切替
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false)
                onDataListClick()
              }}
              className="w-full px-4 py-3 text-left text-on-surface hover:bg-background"
            >
              データ一覧
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false)
                onHelpClick()
              }}
              className="w-full px-4 py-3 text-left text-on-surface hover:bg-background"
            >
              ヘルプ
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
