import { useState } from 'react'
import { conduitTypes, conduitSizes } from '@infrastructure/data/conduits'
import { wireTypes, wireSpecs, getWireSpecDisplayName } from '@infrastructure/data/wires'

interface DataListPageProps {
  onClose: () => void
}

type Tab = 'conduits' | 'wires'

export function DataListPage({ onClose }: DataListPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('conduits')
  const [expandedType, setExpandedType] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="bg-primary text-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={onClose}
          className="p-2 rounded hover:bg-white/20 transition-colors"
          aria-label="戻る"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold">データ一覧</h1>
        <div className="w-10" />
      </header>

      {/* タブ */}
      <div className="flex border-b border-border bg-surface sticky top-[52px] z-10">
        <button
          onClick={() => setActiveTab('conduits')}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === 'conduits'
              ? 'text-primary border-b-2 border-primary'
              : 'text-on-surface-secondary'
          }`}
        >
          電線管 ({conduitSizes.length})
        </button>
        <button
          onClick={() => setActiveTab('wires')}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === 'wires'
              ? 'text-primary border-b-2 border-primary'
              : 'text-on-surface-secondary'
          }`}
        >
          電線 ({wireSpecs.length})
        </button>
      </div>

      <main className="container mx-auto p-4 max-w-2xl">
        {activeTab === 'conduits' ? (
          <ConduitList expandedType={expandedType} setExpandedType={setExpandedType} />
        ) : (
          <WireList expandedType={expandedType} setExpandedType={setExpandedType} />
        )}
      </main>
    </div>
  )
}

function ConduitList({
  expandedType,
  setExpandedType,
}: {
  expandedType: string | null
  setExpandedType: (type: string | null) => void
}) {
  return (
    <div className="space-y-2">
      {conduitTypes.map((type) => {
        const sizes = conduitSizes.filter((s) => s.type === type.id)
        const isExpanded = expandedType === type.id

        return (
          <div key={type.id} className="bg-surface rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setExpandedType(isExpanded ? null : type.id)}
              className="w-full px-4 py-3 flex items-center justify-between text-left"
            >
              <div>
                <span className="font-medium text-on-surface">{type.name}</span>
                <span className="text-on-surface-secondary text-sm ml-2">
                  {type.fullName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-on-surface-secondary text-sm">{sizes.length}件</span>
                <span className="text-on-surface-secondary">{isExpanded ? '▲' : '▼'}</span>
              </div>
            </button>

            {isExpanded && (
              <div className="border-t border-border">
                <table className="w-full text-sm">
                  <thead className="bg-background">
                    <tr>
                      <th className="px-4 py-2 text-left text-on-surface-secondary font-medium">サイズ</th>
                      <th className="px-4 py-2 text-right text-on-surface-secondary font-medium">内径 (mm)</th>
                      <th className="px-4 py-2 text-right text-on-surface-secondary font-medium">内断面積 (mm²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size) => (
                      <tr key={size.id} className="border-t border-border">
                        <td className="px-4 py-2 text-on-surface">{size.nominalSize}</td>
                        <td className="px-4 py-2 text-right text-on-surface">{size.innerDiameter.toFixed(1)}</td>
                        <td className="px-4 py-2 text-right text-on-surface">{size.innerArea.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function WireList({
  expandedType,
  setExpandedType,
}: {
  expandedType: string | null
  setExpandedType: (type: string | null) => void
}) {
  return (
    <div className="space-y-2">
      {wireTypes.map((type) => {
        const specs = wireSpecs.filter((s) => s.typeId === type.id)
        const isExpanded = expandedType === type.id

        return (
          <div key={type.id} className="bg-surface rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setExpandedType(isExpanded ? null : type.id)}
              className="w-full px-4 py-3 flex items-center justify-between text-left"
            >
              <div>
                <span className="font-medium text-on-surface">{type.name}</span>
                <span className="text-on-surface-secondary text-sm ml-2 hidden sm:inline">
                  {type.fullName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-on-surface-secondary text-sm">{specs.length}件</span>
                <span className="text-on-surface-secondary">{isExpanded ? '▲' : '▼'}</span>
              </div>
            </button>

            {isExpanded && (
              <div className="border-t border-border">
                <table className="w-full text-sm">
                  <thead className="bg-background">
                    <tr>
                      <th className="px-4 py-2 text-left text-on-surface-secondary font-medium">規格</th>
                      <th className="px-4 py-2 text-right text-on-surface-secondary font-medium">外径/寸法</th>
                      <th className="px-4 py-2 text-right text-on-surface-secondary font-medium">断面積 (mm²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((spec) => (
                      <tr key={spec.id} className="border-t border-border">
                        <td className="px-4 py-2 text-on-surface">
                          {getWireSpecDisplayName(spec)}
                        </td>
                        <td className="px-4 py-2 text-right text-on-surface text-xs">
                          {spec.outerDiameter
                            ? `φ${spec.outerDiameter}mm`
                            : spec.dimensions
                              ? `${spec.dimensions.width}×${spec.dimensions.height}mm`
                              : '-'}
                        </td>
                        <td className="px-4 py-2 text-right text-on-surface">{spec.crossSectionArea.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
