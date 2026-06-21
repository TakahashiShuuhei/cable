import { useCalculation } from '../contexts/CalculationContext'

export function OccupancyResult() {
  const { state, saveToHistory } = useCalculation()

  if (!state.conduitSize) {
    return (
      <section className="bg-surface rounded-lg p-4">
        <h2 className="text-base font-semibold text-on-surface mb-3">
          計算結果
        </h2>
        <p className="text-on-surface-secondary text-sm">
          電線管を選択してください
        </p>
      </section>
    )
  }

  if (!state.result || state.wires.length === 0) {
    return (
      <section className="bg-surface rounded-lg p-4">
        <h2 className="text-base font-semibold text-on-surface mb-3">
          計算結果
        </h2>
        <p className="text-on-surface-secondary text-sm">
          電線を追加してください
        </p>
      </section>
    )
  }

  const { result } = state
  const percentage = result.percentage

  // 色の決定
  const colorClass = {
    safe: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  }[result.warningLevel]

  const bgColorClass = {
    safe: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  }[result.warningLevel]

  // ステータステキスト
  const statusText = {
    safe: '基準内',
    warning: '注意',
    danger: '基準超過',
  }[result.warningLevel]

  return (
    <section className="bg-surface rounded-lg p-4">
      <h2 className="text-base font-semibold text-on-surface mb-3">
        計算結果
      </h2>

      {/* 占有率表示 */}
      <div className="text-center mb-4">
        <div className={`text-5xl font-bold ${colorClass}`}>
          {percentage.toFixed(1)}
          <span className="text-2xl">%</span>
        </div>
        <div className={`text-sm font-medium mt-1 ${colorClass}`}>
          {statusText}
        </div>
      </div>

      {/* プログレスバー */}
      <div className="mb-4">
        <div className="h-4 bg-background rounded-full overflow-hidden">
          <div
            className={`h-full ${bgColorClass} transition-all duration-300`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-on-surface-secondary mt-1">
          <span>0%</span>
          <span className="text-success">32%</span>
          <span className="text-warning">48%</span>
          <span>100%</span>
        </div>
      </div>

      {/* 詳細情報 */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-on-surface-secondary">適用基準</span>
          <span className="text-on-surface font-medium">
            {result.standardLimit}%
            {result.hasMixedSizes && (
              <span className="text-warning ml-1">(複合)</span>
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-on-surface-secondary">電線管内断面積</span>
          <span className="text-on-surface">
            {state.conduitSize.innerArea.toFixed(1)}mm²
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-on-surface-secondary">電線断面積合計</span>
          <span className="text-on-surface">
            {state.wires
              .reduce(
                (sum, w) => sum + w.wireSpec.crossSectionArea * w.quantity,
                0
              )
              .toFixed(1)}
            mm²
          </span>
        </div>
      </div>

      {/* 複合時の注意書き */}
      {result.hasMixedSizes && (
        <div className="mt-3 p-2 bg-warning/10 rounded text-sm text-warning">
          異なるサイズの電線が混在しているため、32%基準が適用されます。
        </div>
      )}

      {/* 履歴保存ボタン */}
      <button
        onClick={saveToHistory}
        className="w-full mt-4 py-2 rounded border border-primary text-primary hover:bg-primary/10 transition-colors"
      >
        履歴に保存
      </button>
    </section>
  )
}
