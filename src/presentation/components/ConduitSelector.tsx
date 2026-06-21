import { useState } from 'react'
import { useCalculation } from '../contexts/CalculationContext'
import { conduitTypes, getConduitSizesByType } from '@infrastructure/data/conduits'

export function ConduitSelector() {
  const { state, setConduit } = useCalculation()
  const [selectedType, setSelectedType] = useState<string>(
    state.conduitSize?.type ?? ''
  )

  const sizes = selectedType ? getConduitSizesByType(selectedType) : []

  const handleTypeChange = (typeId: string) => {
    setSelectedType(typeId)
  }

  const handleSizeChange = (sizeId: string) => {
    setConduit(sizeId)
  }

  return (
    <section className="bg-surface rounded-lg p-4">
      <h2 className="text-base font-semibold text-on-surface mb-3">電線管</h2>

      {/* 管種選択 */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {conduitTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleTypeChange(type.id)}
            className={`py-2 px-3 rounded text-sm font-medium transition-colors ${
              selectedType === type.id
                ? 'bg-primary text-white'
                : 'bg-background text-on-surface border border-border hover:border-primary'
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>

      {/* サイズ選択 */}
      {selectedType && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => handleSizeChange(size.id)}
              className={`py-2 px-3 rounded text-sm transition-colors ${
                state.conduitSizeId === size.id
                  ? 'bg-primary text-white'
                  : 'bg-background text-on-surface border border-border hover:border-primary'
              }`}
            >
              <span className="font-medium">{size.nominalSize}</span>
              <span className="text-xs opacity-75 ml-1">
                ({size.innerArea.toFixed(0)}mm²)
              </span>
            </button>
          ))}
        </div>
      )}

      {/* 選択結果表示 */}
      {state.conduitSize && (
        <div className="mt-3 p-2 bg-background rounded text-sm text-on-surface-secondary">
          内径: {state.conduitSize.innerDiameter}mm / 内断面積:{' '}
          {state.conduitSize.innerArea.toFixed(1)}mm²
        </div>
      )}
    </section>
  )
}
