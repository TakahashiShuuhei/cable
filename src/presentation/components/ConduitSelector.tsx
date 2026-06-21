import { useCalculation } from '../contexts/CalculationContext'
import { conduitTypes, conduitSizes, getConduitType } from '@infrastructure/data/conduits'

export function ConduitSelector() {
  const { state, setConduit } = useCalculation()

  const handleChange = (sizeId: string) => {
    setConduit(sizeId)
  }

  // 種類ごとにグループ化したオプションを作成
  const groupedOptions = conduitTypes.map((type) => ({
    type,
    sizes: conduitSizes.filter((s) => s.type === type.id),
  }))

  return (
    <section className="bg-surface rounded-lg p-4">
      <h2 className="text-base font-semibold text-on-surface mb-3">電線管</h2>

      <select
        value={state.conduitSizeId ?? ''}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full p-3 rounded border border-border bg-background text-on-surface"
      >
        <option value="">選択してください</option>
        {groupedOptions.map(({ type, sizes }) => (
          <optgroup key={type.id} label={type.name}>
            {sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {type.name} {size.nominalSize} ({size.innerArea.toFixed(0)}mm²)
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {/* 選択結果表示 */}
      {state.conduitSize && (
        <div className="mt-3 p-2 bg-background rounded text-sm text-on-surface-secondary">
          {getConduitType(state.conduitSize.type)?.name} {state.conduitSize.nominalSize} -
          内径: {state.conduitSize.innerDiameter}mm / 内断面積:{' '}
          {state.conduitSize.innerArea.toFixed(1)}mm²
        </div>
      )}
    </section>
  )
}
