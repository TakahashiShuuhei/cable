/**
 * 電線管種類
 */
export interface ConduitType {
  id: string
  name: string
  fullName: string
  material: string
}

/**
 * 電線管サイズ
 */
export interface ConduitSize {
  id: string
  type: string
  nominalSize: string
  innerDiameter: number // mm
  innerArea: number // mm²
}

/**
 * 電線管種類マスターデータ
 */
export const conduitTypes: ConduitType[] = [
  { id: 'e', name: 'E管', fullName: '薄鋼電線管', material: '鋼' },
  { id: 'c', name: 'C管', fullName: 'ねじなし電線管', material: '鋼' },
  { id: 'g', name: 'G管', fullName: '厚鋼電線管', material: '鋼' },
  { id: 'pf', name: 'PF管', fullName: '合成樹脂製可とう電線管', material: '合成樹脂' },
  { id: 've', name: 'VE管', fullName: '硬質塩化ビニル電線管', material: '硬質塩化ビニル' },
  { id: 'fep', name: 'FEP', fullName: '波付硬質合成樹脂管', material: '合成樹脂' },
]

// 断面積計算ヘルパー（内径から）
const circleArea = (d: number) => Math.PI * Math.pow(d / 2, 2)

/**
 * 電線管サイズマスターデータ
 */
export const conduitSizes: ConduitSize[] = [
  // E管
  { id: 'e-19', type: 'e', nominalSize: '19', innerDiameter: 16.7, innerArea: circleArea(16.7) },
  { id: 'e-25', type: 'e', nominalSize: '25', innerDiameter: 23.0, innerArea: circleArea(23.0) },
  { id: 'e-31', type: 'e', nominalSize: '31', innerDiameter: 29.0, innerArea: circleArea(29.0) },
  { id: 'e-39', type: 'e', nominalSize: '39', innerDiameter: 35.3, innerArea: circleArea(35.3) },
  { id: 'e-51', type: 'e', nominalSize: '51', innerDiameter: 48.0, innerArea: circleArea(48.0) },
  { id: 'e-63', type: 'e', nominalSize: '63', innerDiameter: 60.3, innerArea: circleArea(60.3) },
  { id: 'e-75', type: 'e', nominalSize: '75', innerDiameter: 72.6, innerArea: circleArea(72.6) },

  // C管
  { id: 'c-19', type: 'c', nominalSize: '19', innerDiameter: 15.9, innerArea: circleArea(15.9) },
  { id: 'c-25', type: 'c', nominalSize: '25', innerDiameter: 22.2, innerArea: circleArea(22.2) },
  { id: 'c-31', type: 'c', nominalSize: '31', innerDiameter: 28.6, innerArea: circleArea(28.6) },
  { id: 'c-39', type: 'c', nominalSize: '39', innerDiameter: 34.9, innerArea: circleArea(34.9) },
  { id: 'c-51', type: 'c', nominalSize: '51', innerDiameter: 47.6, innerArea: circleArea(47.6) },
  { id: 'c-63', type: 'c', nominalSize: '63', innerDiameter: 59.5, innerArea: circleArea(59.5) },
  { id: 'c-75', type: 'c', nominalSize: '75', innerDiameter: 72.2, innerArea: circleArea(72.2) },

  // G管
  { id: 'g-16', type: 'g', nominalSize: '16', innerDiameter: 16.4, innerArea: circleArea(16.4) },
  { id: 'g-22', type: 'g', nominalSize: '22', innerDiameter: 21.9, innerArea: circleArea(21.9) },
  { id: 'g-28', type: 'g', nominalSize: '28', innerDiameter: 28.3, innerArea: circleArea(28.3) },
  { id: 'g-36', type: 'g', nominalSize: '36', innerDiameter: 36.9, innerArea: circleArea(36.9) },
  { id: 'g-42', type: 'g', nominalSize: '42', innerDiameter: 42.8, innerArea: circleArea(42.8) },
  { id: 'g-54', type: 'g', nominalSize: '54', innerDiameter: 54.0, innerArea: circleArea(54.0) },
  { id: 'g-70', type: 'g', nominalSize: '70', innerDiameter: 69.6, innerArea: circleArea(69.6) },
  { id: 'g-82', type: 'g', nominalSize: '82', innerDiameter: 82.3, innerArea: circleArea(82.3) },
  { id: 'g-92', type: 'g', nominalSize: '92', innerDiameter: 93.7, innerArea: circleArea(93.7) },
  { id: 'g-104', type: 'g', nominalSize: '104', innerDiameter: 106.4, innerArea: circleArea(106.4) },

  // PF管
  { id: 'pf-14', type: 'pf', nominalSize: '14', innerDiameter: 14.0, innerArea: circleArea(14.0) },
  { id: 'pf-16', type: 'pf', nominalSize: '16', innerDiameter: 16.0, innerArea: circleArea(16.0) },
  { id: 'pf-22', type: 'pf', nominalSize: '22', innerDiameter: 22.0, innerArea: circleArea(22.0) },
  { id: 'pf-28', type: 'pf', nominalSize: '28', innerDiameter: 28.0, innerArea: circleArea(28.0) },
  { id: 'pf-36', type: 'pf', nominalSize: '36', innerDiameter: 36.0, innerArea: circleArea(36.0) },
  { id: 'pf-42', type: 'pf', nominalSize: '42', innerDiameter: 42.0, innerArea: circleArea(42.0) },
  { id: 'pf-54', type: 'pf', nominalSize: '54', innerDiameter: 54.0, innerArea: circleArea(54.0) },

  // VE管
  { id: 've-14', type: 've', nominalSize: '14', innerDiameter: 14.0, innerArea: circleArea(14.0) },
  { id: 've-16', type: 've', nominalSize: '16', innerDiameter: 16.0, innerArea: circleArea(16.0) },
  { id: 've-22', type: 've', nominalSize: '22', innerDiameter: 22.0, innerArea: circleArea(22.0) },
  { id: 've-28', type: 've', nominalSize: '28', innerDiameter: 28.0, innerArea: circleArea(28.0) },
  { id: 've-36', type: 've', nominalSize: '36', innerDiameter: 36.0, innerArea: circleArea(36.0) },
  { id: 've-42', type: 've', nominalSize: '42', innerDiameter: 42.0, innerArea: circleArea(42.0) },
  { id: 've-54', type: 've', nominalSize: '54', innerDiameter: 54.0, innerArea: circleArea(54.0) },

  // FEP（波付硬質合成樹脂管）
  { id: 'fep-30', type: 'fep', nominalSize: '30', innerDiameter: 30.0, innerArea: circleArea(30.0) },
  { id: 'fep-40', type: 'fep', nominalSize: '40', innerDiameter: 42.0, innerArea: circleArea(42.0) },
  { id: 'fep-50', type: 'fep', nominalSize: '50', innerDiameter: 50.0, innerArea: circleArea(50.0) },
  { id: 'fep-65', type: 'fep', nominalSize: '65', innerDiameter: 66.0, innerArea: circleArea(66.0) },
  { id: 'fep-80', type: 'fep', nominalSize: '80', innerDiameter: 80.0, innerArea: circleArea(80.0) },
  { id: 'fep-100', type: 'fep', nominalSize: '100', innerDiameter: 100.0, innerArea: circleArea(100.0) },
  { id: 'fep-125', type: 'fep', nominalSize: '125', innerDiameter: 125.0, innerArea: circleArea(125.0) },
  { id: 'fep-150', type: 'fep', nominalSize: '150', innerDiameter: 150.0, innerArea: circleArea(150.0) },
  { id: 'fep-200', type: 'fep', nominalSize: '200', innerDiameter: 200.0, innerArea: circleArea(200.0) },
]

/**
 * 電線管種類を取得
 */
export function getConduitType(id: string): ConduitType | undefined {
  return conduitTypes.find((t) => t.id === id)
}

/**
 * 電線管サイズを取得
 */
export function getConduitSize(id: string): ConduitSize | undefined {
  return conduitSizes.find((s) => s.id === id)
}

/**
 * 指定した種類の電線管サイズ一覧を取得
 */
export function getConduitSizesByType(typeId: string): ConduitSize[] {
  return conduitSizes.filter((s) => s.type === typeId)
}
