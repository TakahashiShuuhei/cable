import { useState } from 'react'
import { useCalculation } from '../contexts/CalculationContext'
import { conduitTypes, conduitSizes, getConduitType } from '@infrastructure/data/conduits'
import {
  wireTypes,
  getWireSpecsByType,
  getWireSpecDisplayName,
} from '@infrastructure/data/wires'

export function MainPanel() {
  const { state, setConduit, addWire, removeWire, updateWireQuantity } = useCalculation()

  // 電線追加フォームの状態
  const [selectedWireType, setSelectedWireType] = useState<string>('')
  const [selectedSpec, setSelectedSpec] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const [isAddingWire, setIsAddingWire] = useState(false)

  const wireSpecs = selectedWireType ? getWireSpecsByType(selectedWireType) : []

  // 電線管のグループ化オプション
  const conduitOptions = conduitTypes.map((type) => ({
    type,
    sizes: conduitSizes.filter((s) => s.type === type.id),
  }))

  const handleAddWire = () => {
    if (!selectedSpec || quantity < 1) return
    addWire(selectedSpec, quantity)
    setSelectedSpec('')
    setQuantity(1)
    setIsAddingWire(false)
  }

  // 結果の取得
  const result = state.result
  const percentage = result?.percentage ?? 0

  // 色の決定
  const colorClass = result ? {
    safe: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  }[result.warningLevel] : 'text-on-surface-secondary'

  const bgColorClass = result ? {
    safe: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  }[result.warningLevel] : 'bg-on-surface-secondary'

  const statusText = result ? {
    safe: '基準内',
    warning: '注意',
    danger: '基準超過',
  }[result.warningLevel] : ''

  return (
    <section className="bg-surface rounded-lg p-4">
      {/* 電線管選択 */}
      <div className="mb-4">
        <select
          value={state.conduitSizeId ?? ''}
          onChange={(e) => setConduit(e.target.value)}
          className="w-full p-3 rounded border border-border bg-background text-on-surface"
        >
          <option value="">電線管を選択</option>
          {conduitOptions.map(({ type, sizes }) => (
            <optgroup key={type.id} label={type.name}>
              {sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {type.name} {size.nominalSize} ({size.innerArea.toFixed(0)}mm²)
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* 占有率表示 */}
      <div className="text-center mb-4">
        <div className={`text-5xl font-bold ${colorClass}`}>
          {percentage.toFixed(1)}
          <span className="text-2xl">%</span>
        </div>
        {statusText && (
          <div className={`text-sm font-medium mt-1 ${colorClass}`}>
            {statusText}
          </div>
        )}
      </div>

      {/* プログレスバー */}
      <div className="mb-4">
        <div className="relative h-4 bg-background rounded-full overflow-hidden">
          <div
            className={`h-full ${bgColorClass} transition-all duration-300`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
          {/* 32%マーカー */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-success/50"
            style={{ left: '32%' }}
          />
          {/* 48%マーカー */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-warning/50"
            style={{ left: '48%' }}
          />
        </div>
        <div className="relative h-4 text-xs text-on-surface-secondary mt-1">
          <span className="absolute left-0">0%</span>
          <span className="absolute text-success" style={{ left: '32%', transform: 'translateX(-50%)' }}>32%</span>
          <span className="absolute text-warning" style={{ left: '48%', transform: 'translateX(-50%)' }}>48%</span>
          <span className="absolute right-0">100%</span>
        </div>
      </div>

      {/* 詳細情報 */}
      {state.conduitSize && (
        <div className="mb-4 p-2 bg-background rounded text-sm">
          <div className="flex justify-between text-on-surface-secondary">
            <span>
              {getConduitType(state.conduitSize.type)?.name} {state.conduitSize.nominalSize}
            </span>
            <span>{state.conduitSize.innerArea.toFixed(0)}mm²</span>
          </div>
          {result && (
            <div className="flex justify-between mt-1">
              <span className="text-on-surface-secondary">
                適用基準: {result.standardLimit}%
                {result.hasMixedSizes && <span className="text-warning ml-1">(複合)</span>}
              </span>
              <span className="text-on-surface">
                使用: {state.wires.reduce((sum, w) => sum + w.wireSpec.crossSectionArea * w.quantity, 0).toFixed(0)}mm²
              </span>
            </div>
          )}
        </div>
      )}

      {/* 複合時の注意書き */}
      {result?.hasMixedSizes && (
        <div className="mb-4 p-2 bg-warning/10 rounded text-sm text-warning">
          異なるサイズの電線が混在 → 32%基準
        </div>
      )}

      {/* 電線リスト */}
      <div className="space-y-2 mb-4">
        {state.wires.map((wire) => (
          <div
            key={wire.id}
            className="flex items-center justify-between p-2 bg-background rounded border border-border"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-on-surface truncate">
                {getWireSpecDisplayName(wire.wireSpec)}
                <span className="font-normal text-on-surface-secondary ml-1">
                  (φ{wire.wireSpec.outerDiameter ?? wire.wireSpec.dimensions?.height}mm)
                </span>
              </div>
              <div className="text-xs text-on-surface-secondary">
                {wire.wireSpec.crossSectionArea.toFixed(1)}mm² × {wire.quantity} = {(wire.wireSpec.crossSectionArea * wire.quantity).toFixed(1)}mm²
              </div>
            </div>

            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => updateWireQuantity(wire.id, wire.quantity - 1)}
                disabled={wire.quantity <= 1}
                className="w-7 h-7 rounded bg-surface border border-border text-on-surface hover:border-primary disabled:opacity-50 text-sm"
              >
                −
              </button>
              <span className="w-6 text-center text-sm text-on-surface">
                {wire.quantity}
              </span>
              <button
                onClick={() => updateWireQuantity(wire.id, wire.quantity + 1)}
                className="w-7 h-7 rounded bg-surface border border-border text-on-surface hover:border-primary text-sm"
              >
                +
              </button>
              <button
                onClick={() => removeWire(wire.id)}
                className="w-7 h-7 rounded bg-danger/10 text-danger hover:bg-danger/20 ml-1 text-sm"
                title="削除"
              >
                ×
              </button>
            </div>
          </div>
        ))}

        {state.wires.length === 0 && (
          <p className="text-on-surface-secondary text-sm text-center py-4">
            電線を追加してください
          </p>
        )}
      </div>

      {/* 電線追加 */}
      {!isAddingWire ? (
        <button
          onClick={() => setIsAddingWire(true)}
          disabled={!state.conduitSize}
          className="w-full py-3 rounded bg-primary text-white font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          + 電線を追加
        </button>
      ) : (
        <div className="p-3 bg-background rounded border border-border space-y-3">
          {/* 種類選択 */}
          <select
            value={selectedWireType}
            onChange={(e) => {
              setSelectedWireType(e.target.value)
              setSelectedSpec('')
            }}
            className="w-full p-2 rounded border border-border bg-surface text-on-surface"
          >
            <option value="">種類を選択</option>
            {wireTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name} - {type.description}
              </option>
            ))}
          </select>

          {/* サイズ選択 */}
          {selectedWireType && (
            <select
              value={selectedSpec}
              onChange={(e) => setSelectedSpec(e.target.value)}
              className="w-full p-2 rounded border border-border bg-surface text-on-surface"
            >
              <option value="">サイズを選択</option>
              {wireSpecs.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {getWireSpecDisplayName(spec)} ({spec.crossSectionArea.toFixed(1)}mm²)
                </option>
              ))}
            </select>
          )}

          {/* 本数と追加ボタン */}
          {selectedSpec && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded bg-surface border border-border text-on-surface hover:border-primary"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 p-2 rounded border border-border bg-surface text-on-surface text-center"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded bg-surface border border-border text-on-surface hover:border-primary"
              >
                +
              </button>
              <button
                onClick={handleAddWire}
                className="flex-1 py-2 rounded bg-primary text-white font-medium hover:opacity-90"
              >
                追加
              </button>
            </div>
          )}

          {/* キャンセル */}
          <button
            onClick={() => {
              setIsAddingWire(false)
              setSelectedWireType('')
              setSelectedSpec('')
              setQuantity(1)
            }}
            className="w-full py-2 rounded border border-border text-on-surface-secondary hover:bg-surface"
          >
            キャンセル
          </button>
        </div>
      )}
    </section>
  )
}
