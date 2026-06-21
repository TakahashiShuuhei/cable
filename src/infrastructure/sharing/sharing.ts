/**
 * 共有用データ構造
 */
export interface ShareData {
  conduitSizeId: string
  wireEntries: Array<{
    wireSpecId: string
    quantity: number
  }>
}

/**
 * 共有データをURLパラメータにエンコードする
 * フォーマット: conduitId,wireId1:qty1,wireId2:qty2,...
 */
export function encodeShareData(data: ShareData): string {
  const parts = [data.conduitSizeId]
  for (const entry of data.wireEntries) {
    parts.push(`${entry.wireSpecId}:${entry.quantity}`)
  }
  const encoded = btoa(parts.join(','))
  return encoded
}

/**
 * URLパラメータから共有データをデコードする
 */
export function decodeShareData(encoded: string): ShareData | null {
  try {
    const decoded = atob(encoded)
    const parts = decoded.split(',')
    if (parts.length < 1) return null

    const conduitSizeId = parts[0]
    const wireEntries: ShareData['wireEntries'] = []

    for (let i = 1; i < parts.length; i++) {
      const [wireSpecId, qtyStr] = parts[i].split(':')
      const quantity = parseInt(qtyStr, 10)
      if (wireSpecId && !isNaN(quantity) && quantity > 0) {
        wireEntries.push({ wireSpecId, quantity })
      }
    }

    return { conduitSizeId, wireEntries }
  } catch {
    return null
  }
}

/**
 * 共有URLを生成する
 */
export function createShareUrl(data: ShareData, baseUrl?: string): string {
  const encoded = encodeShareData(data)
  const base = baseUrl ?? window.location.origin + window.location.pathname
  return `${base}?s=${encoded}`
}

/**
 * URLから共有データを抽出する
 */
export function extractShareDataFromUrl(url?: string): ShareData | null {
  const searchParams = new URLSearchParams(url ?? window.location.search)
  const encoded = searchParams.get('s')
  if (!encoded) return null
  return decodeShareData(encoded)
}

/**
 * クリップボードに共有URLをコピーする
 */
export async function copyShareUrlToClipboard(data: ShareData): Promise<boolean> {
  try {
    const url = createShareUrl(data)
    await navigator.clipboard.writeText(url)
    return true
  } catch {
    return false
  }
}

/**
 * Web Share APIで共有する（モバイル対応）
 */
export async function shareViaWebShareApi(
  data: ShareData,
  title?: string
): Promise<boolean> {
  if (!navigator.share) return false

  try {
    const url = createShareUrl(data)
    await navigator.share({
      title: title ?? '電線管占有率計算',
      text: '占有率計算結果を共有',
      url,
    })
    return true
  } catch {
    return false
  }
}

/**
 * Web Share APIが利用可能かどうか
 */
export function isWebShareSupported(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.share
}
