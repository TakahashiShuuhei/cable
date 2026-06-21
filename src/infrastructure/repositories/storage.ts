/**
 * 計算履歴アイテム
 */
export interface HistoryItem {
  id: string
  timestamp: number
  conduitSizeId: string
  wireEntries: Array<{
    wireSpecId: string
    quantity: number
  }>
  result: {
    percentage: number
    standardLimit: 32 | 48
    warningLevel: 'safe' | 'warning' | 'danger'
    hasMixedSizes: boolean
  }
  label?: string
  favorite?: boolean
}

const STORAGE_KEY = 'cable-occupancy-history'
const MAX_HISTORY_ITEMS = 50

/**
 * 履歴をLocalStorageから読み込む
 */
export function loadHistory(): HistoryItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    const parsed = JSON.parse(data)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

/**
 * 履歴をLocalStorageに保存する
 */
export function saveHistory(items: HistoryItem[]): void {
  try {
    // 最大件数を超えたら古いものを削除
    const trimmed = items.slice(0, MAX_HISTORY_ITEMS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  } catch {
    // LocalStorage容量超過などのエラーは無視
  }
}

/**
 * 履歴アイテムを追加する
 */
export function addHistoryItem(item: Omit<HistoryItem, 'id' | 'timestamp'>): HistoryItem {
  const newItem: HistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  }

  const history = loadHistory()
  history.unshift(newItem) // 先頭に追加
  saveHistory(history)

  return newItem
}

/**
 * 履歴アイテムを削除する
 */
export function deleteHistoryItem(id: string): void {
  const history = loadHistory()
  const filtered = history.filter((item) => item.id !== id)
  saveHistory(filtered)
}

/**
 * 履歴を全削除する
 */
export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * 履歴アイテムを取得する
 */
export function getHistoryItem(id: string): HistoryItem | undefined {
  const history = loadHistory()
  return history.find((item) => item.id === id)
}

/**
 * 履歴アイテムのラベルを更新する
 */
export function updateHistoryLabel(id: string, label: string): void {
  const history = loadHistory()
  const index = history.findIndex((item) => item.id === id)
  if (index !== -1) {
    history[index] = { ...history[index], label }
    saveHistory(history)
  }
}

/**
 * 履歴アイテムのお気に入りを切り替える
 */
export function toggleHistoryFavorite(id: string): void {
  const history = loadHistory()
  const index = history.findIndex((item) => item.id === id)
  if (index !== -1) {
    history[index] = { ...history[index], favorite: !history[index].favorite }
    saveHistory(history)
  }
}
