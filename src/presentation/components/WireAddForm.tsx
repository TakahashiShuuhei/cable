import { useState } from 'react'
import { useCalculation } from '../contexts/CalculationContext'
import {
  wireTypes,
  getWireSpecsByType,
  getWireSpecDisplayName,
} from '@infrastructure/data/wires'

export function WireAddForm() {
  const { addWire } = useCalculation()
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedSpec, setSelectedSpec] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)

  const specs = selectedType ? getWireSpecsByType(selectedType) : []

  const handleAdd = () => {
    if (!selectedSpec || quantity < 1) return
    addWire(selectedSpec, quantity)
    // フォームをリセット（種類は維持）
    setSelectedSpec('')
    setQuantity(1)
  }

  return (
    <section className="bg-surface rounded-lg p-4">
      <h2 className="text-base font-semibold text-on-surface mb-3">電線追加</h2>

      {/* 電線種類選択 */}
      <div className="mb-3">
        <label className="block text-sm text-on-surface-secondary mb-1">
          種類
        </label>
        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value)
            setSelectedSpec('')
          }}
          className="w-full p-2 rounded border border-border bg-background text-on-surface"
        >
          <option value="">選択してください</option>
          {wireTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name} - {type.description}
            </option>
          ))}
        </select>
      </div>

      {/* サイズ選択 */}
      {selectedType && (
        <div className="mb-3">
          <label className="block text-sm text-on-surface-secondary mb-1">
            サイズ
          </label>
          <select
            value={selectedSpec}
            onChange={(e) => setSelectedSpec(e.target.value)}
            className="w-full p-2 rounded border border-border bg-background text-on-surface"
          >
            <option value="">選択してください</option>
            {specs.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {getWireSpecDisplayName(spec)} ({spec.crossSectionArea.toFixed(1)}
                mm²)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 本数入力 */}
      {selectedSpec && (
        <div className="mb-3">
          <label className="block text-sm text-on-surface-secondary mb-1">
            本数
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 rounded bg-background border border-border text-on-surface hover:border-primary"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 p-2 rounded border border-border bg-background text-on-surface text-center"
            />
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 rounded bg-background border border-border text-on-surface hover:border-primary"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* 追加ボタン */}
      <button
        onClick={handleAdd}
        disabled={!selectedSpec || quantity < 1}
        className="w-full py-3 rounded bg-primary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        追加
      </button>
    </section>
  )
}
