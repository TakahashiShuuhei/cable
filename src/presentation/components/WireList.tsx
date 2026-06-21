import { useCalculation } from '../contexts/CalculationContext'
import { getWireSpecDisplayName } from '@infrastructure/data/wires'

export function WireList() {
  const { state, removeWire, updateWireQuantity } = useCalculation()

  if (state.wires.length === 0) {
    return (
      <section className="bg-surface rounded-lg p-4">
        <h2 className="text-base font-semibold text-on-surface mb-3">
          追加した電線
        </h2>
        <p className="text-on-surface-secondary text-sm">
          電線を追加してください
        </p>
      </section>
    )
  }

  const totalArea = state.wires.reduce(
    (sum, w) => sum + w.wireSpec.crossSectionArea * w.quantity,
    0
  )

  return (
    <section className="bg-surface rounded-lg p-4">
      <h2 className="text-base font-semibold text-on-surface mb-3">
        追加した電線
        <span className="font-normal text-sm text-on-surface-secondary ml-2">
          (合計: {totalArea.toFixed(1)}mm²)
        </span>
      </h2>

      <div className="space-y-2">
        {state.wires.map((wire) => (
          <div
            key={wire.id}
            className="flex items-center justify-between p-3 bg-background rounded border border-border"
          >
            <div className="flex-1">
              <div className="text-sm font-medium text-on-surface">
                {getWireSpecDisplayName(wire.wireSpec)}
              </div>
              <div className="text-xs text-on-surface-secondary">
                {wire.wireSpec.crossSectionArea.toFixed(1)}mm² × {wire.quantity} ={' '}
                {(wire.wireSpec.crossSectionArea * wire.quantity).toFixed(1)}mm²
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* 数量調整 */}
              <button
                onClick={() => updateWireQuantity(wire.id, wire.quantity - 1)}
                disabled={wire.quantity <= 1}
                className="w-8 h-8 rounded bg-surface border border-border text-on-surface hover:border-primary disabled:opacity-50"
              >
                -
              </button>
              <span className="w-8 text-center text-sm text-on-surface">
                {wire.quantity}
              </span>
              <button
                onClick={() => updateWireQuantity(wire.id, wire.quantity + 1)}
                className="w-8 h-8 rounded bg-surface border border-border text-on-surface hover:border-primary"
              >
                +
              </button>

              {/* 削除 */}
              <button
                onClick={() => removeWire(wire.id)}
                className="w-8 h-8 rounded bg-danger/10 text-danger hover:bg-danger/20 ml-2"
                title="削除"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
