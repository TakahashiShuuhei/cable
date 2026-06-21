import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCalculation } from '../contexts/CalculationContext'
import { conduitTypes, conduitSizes, getConduitType } from '@infrastructure/data/conduits'
import {
  wireTypes,
  getWireSpecsByType,
  getWireSpecDisplayName,
  getWireSpec,
} from '@infrastructure/data/wires'
import {
  shareViaWebShareApi,
  isWebShareSupported,
  copyShareUrlToClipboard,
} from '@infrastructure/sharing/sharing'
import { loadHistory, deleteHistoryItem, updateHistoryLabel, toggleHistoryFavorite, type HistoryItem } from '@infrastructure/repositories/storage'

export function MainPanel() {
  const { state, setConduit, addWire, removeWire, updateWireQuantity, saveToHistory, restoreFromShareData } = useCalculation()

  // 電線追加フォームの状態
  const [selectedWireType, setSelectedWireType] = useState<string>('')
  const [selectedSpec, setSelectedSpec] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const [isAddingWire, setIsAddingWire] = useState(false)

  // 保存ダイアログ
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [saveName, setSaveName] = useState('')

  // URLコピーフィードバック
  const [copied, setCopied] = useState(false)

  // 履歴
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null)
  const [highlightedHistoryId, setHighlightedHistoryId] = useState<string | null>(null)

  // refs
  const historySectionRef = useRef<HTMLDivElement>(null)
  const historyItemRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  // 履歴をロード
  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  const handleSaveClick = () => {
    // デフォルト名を生成
    const conduitName = state.conduitSize
      ? `${getConduitType(state.conduitSize.type)?.name} ${state.conduitSize.nominalSize}`
      : ''
    setSaveName(conduitName)
    setShowSaveDialog(true)
  }

  const handleSaveConfirm = () => {
    saveToHistory()
    const newHistory = loadHistory()
    setHistory(newHistory)

    // 最新の履歴にラベルを設定
    if (newHistory.length > 0 && saveName.trim()) {
      updateHistoryLabel(newHistory[0].id, saveName.trim())
      setHistory(loadHistory())
    }

    setShowSaveDialog(false)
    setSaveName('')
    setShowHistory(true)

    // スクロールとハイライト
    setTimeout(() => {
      const latestId = loadHistory()[0]?.id
      if (latestId) {
        setHighlightedHistoryId(latestId)
        const element = historyItemRefs.current.get(latestId)
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' })

        setTimeout(() => setHighlightedHistoryId(null), 2000)
      }
    }, 100)
  }

  const handleCopyUrl = async () => {
    if (!state.conduitSizeId) return
    const success = await copyShareUrlToClipboard({
      conduitSizeId: state.conduitSizeId,
      wireEntries: state.wires.map((w) => ({
        wireSpecId: w.wireSpecId,
        quantity: w.quantity,
      })),
    })
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleRestoreHistory = (item: HistoryItem) => {
    restoreFromShareData({
      conduitSizeId: item.conduitSizeId,
      wireEntries: item.wireEntries,
    })
    setExpandedHistoryId(null)
  }

  const handleDeleteHistory = (id: string) => {
    deleteHistoryItem(id)
    setHistory(loadHistory())
    if (expandedHistoryId === id) {
      setExpandedHistoryId(null)
    }
  }

  // お気に入りアニメーション用
  const [animatingFavoriteId, setAnimatingFavoriteId] = useState<string | null>(null)

  const handleToggleFavorite = (id: string) => {
    // アニメーション開始
    setAnimatingFavoriteId(id)

    toggleHistoryFavorite(id)
    setHistory(loadHistory())

    // ハイライト表示
    setHighlightedHistoryId(id)

    // アニメーション終了
    setTimeout(() => {
      setAnimatingFavoriteId(null)
      setHighlightedHistoryId(null)
    }, 600)
  }

  // お気に入りを上部に表示するソート済み履歴
  const sortedHistory = [...history].sort((a, b) => {
    if (a.favorite && !b.favorite) return -1
    if (!a.favorite && b.favorite) return 1
    return 0 // 同じ優先度なら元の順序（timestamp順）を維持
  })

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

      {/* 保存・共有ボタン */}
      {state.conduitSizeId && state.wires.length > 0 && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSaveClick}
            className="flex-1 py-2 rounded border border-primary text-primary hover:bg-primary/10 transition-colors"
          >
            保存
          </button>

          {isWebShareSupported() ? (
            <button
              onClick={async () => {
                await shareViaWebShareApi({
                  conduitSizeId: state.conduitSizeId!,
                  wireEntries: state.wires.map((w) => ({
                    wireSpecId: w.wireSpecId,
                    quantity: w.quantity,
                  })),
                })
              }}
              className="flex-1 py-2 rounded border border-primary text-primary hover:bg-primary/10 transition-colors"
            >
              共有
            </button>
          ) : (
            <button
              onClick={handleCopyUrl}
              className={`flex-1 py-2 rounded border transition-colors ${
                copied
                  ? 'border-success text-success bg-success/10'
                  : 'border-primary text-primary hover:bg-primary/10'
              }`}
            >
              {copied ? 'コピーしました' : '共有URLをコピー'}
            </button>
          )}
        </div>
      )}

      {/* 保存ダイアログ */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg p-4 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-on-surface mb-3">保存名を入力</h3>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="例: 現場A 幹線"
              className="w-full p-3 rounded border border-border bg-background text-on-surface mb-4"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 py-2 rounded border border-border text-on-surface-secondary hover:bg-background"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveConfirm}
                className="flex-1 py-2 rounded bg-primary text-white hover:opacity-90"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 履歴セクション */}
      <div ref={historySectionRef} className="mt-6 pt-4 border-t border-border">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full flex items-center justify-between text-on-surface-secondary text-sm"
        >
          <span>保存済み ({history.length})</span>
          <span>{showHistory ? '▲' : '▼'}</span>
        </button>

        {showHistory && (
          <div className="mt-3 space-y-2">
            {sortedHistory.length === 0 ? (
              <p className="text-on-surface-secondary text-sm text-center py-2">
                保存済みの計算はありません
              </p>
            ) : (
              <AnimatePresence>
                {sortedHistory.map((item) => {
                  const isExpanded = expandedHistoryId === item.id
                  const isHighlighted = highlightedHistoryId === item.id

                  return (
                    <motion.div
                      key={item.id}
                      layout="position"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        layout: { type: 'spring', stiffness: 500, damping: 35 },
                        opacity: { duration: 0.15 },
                      }}
                      ref={(el) => {
                        if (el) historyItemRefs.current.set(item.id, el)
                      }}
                      className={`bg-background rounded border transition-colors duration-300 ${
                        isHighlighted
                          ? 'border-primary ring-2 ring-primary/30'
                          : 'border-border'
                      }`}
                    >
                    {/* ヘッダー（タップで展開） */}
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToggleFavorite(item.id)
                        }}
                        className={`p-2 text-xl transition-all duration-300 ${
                          item.favorite ? 'text-warning' : 'text-on-surface-secondary/30'
                        } ${
                          animatingFavoriteId === item.id
                            ? 'scale-150 rotate-[360deg]'
                            : 'scale-100 rotate-0'
                        }`}
                        title={item.favorite ? 'お気に入りを解除' : 'お気に入りに追加'}
                      >
                        ★
                      </button>
                      <button
                        onClick={() => setExpandedHistoryId(isExpanded ? null : item.id)}
                        className="flex-1 p-2 pl-0 text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-on-surface">
                              {item.label || `${getConduitType(item.conduitSizeId.split('-')[0])?.name} ${item.conduitSizeId.split('-')[1]}`}
                              <span className={`ml-2 ${
                                item.result.warningLevel === 'safe' ? 'text-success' :
                                item.result.warningLevel === 'warning' ? 'text-warning' : 'text-danger'
                              }`}>
                                {item.result.percentage.toFixed(1)}%
                              </span>
                            </div>
                            <div className="text-xs text-on-surface-secondary">
                              {new Date(item.timestamp).toLocaleDateString('ja-JP')}
                            </div>
                          </div>
                          <span className="text-on-surface-secondary text-sm">
                            {isExpanded ? '▲' : '▼'}
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* 展開時の詳細 */}
                    {isExpanded && (
                      <div className="px-2 pb-2 border-t border-border">
                        {/* 電線管情報 */}
                        <div className="py-2 text-sm text-on-surface-secondary">
                          {getConduitType(item.conduitSizeId.split('-')[0])?.name}{' '}
                          {item.conduitSizeId.split('-')[1]}
                        </div>

                        {/* 電線リスト */}
                        <div className="space-y-1 mb-3">
                          {item.wireEntries.map((entry, idx) => {
                            const spec = getWireSpec(entry.wireSpecId)
                            return (
                              <div key={idx} className="text-xs text-on-surface-secondary flex justify-between">
                                <span>{spec ? getWireSpecDisplayName(spec) : entry.wireSpecId}</span>
                                <span>×{entry.quantity}</span>
                              </div>
                            )
                          })}
                        </div>

                        {/* アクションボタン */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRestoreHistory(item)}
                            className="flex-1 py-2 rounded bg-primary text-white text-sm hover:opacity-90"
                          >
                            読み込む
                          </button>
                          <button
                            onClick={() => handleDeleteHistory(item.id)}
                            className="px-3 py-2 rounded border border-danger text-danger text-sm hover:bg-danger/10"
                          >
                            削除
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                  )
                })}
              </AnimatePresence>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
