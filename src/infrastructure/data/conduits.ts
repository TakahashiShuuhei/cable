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
  { id: 'g', name: 'G管', fullName: '厚鋼電線管', material: '鋼' },
  { id: 'pf', name: 'PF管', fullName: '合成樹脂製可とう電線管', material: '合成樹脂' },
  { id: 've', name: 'VE管', fullName: '硬質塩化ビニル電線管', material: '硬質塩化ビニル' },
]

/**
 * 電線管サイズマスターデータ
 */
export const conduitSizes: ConduitSize[] = [
  // E管
  { id: 'e-19', type: 'e', nominalSize: '19', innerDiameter: 19.1, innerArea: 286.5 },
  { id: 'e-25', type: 'e', nominalSize: '25', innerDiameter: 25.0, innerArea: 490.9 },
  { id: 'e-31', type: 'e', nominalSize: '31', innerDiameter: 31.0, innerArea: 754.8 },
  { id: 'e-39', type: 'e', nominalSize: '39', innerDiameter: 38.5, innerArea: 1164.2 },
  { id: 'e-51', type: 'e', nominalSize: '51', innerDiameter: 50.8, innerArea: 2027.0 },
  { id: 'e-63', type: 'e', nominalSize: '63', innerDiameter: 63.0, innerArea: 3117.2 },
  { id: 'e-75', type: 'e', nominalSize: '75', innerDiameter: 75.8, innerArea: 4513.7 },
  // G管
  { id: 'g-16', type: 'g', nominalSize: '16', innerDiameter: 15.8, innerArea: 196.1 },
  { id: 'g-22', type: 'g', nominalSize: '22', innerDiameter: 21.0, innerArea: 346.4 },
  { id: 'g-28', type: 'g', nominalSize: '28', innerDiameter: 26.6, innerArea: 555.7 },
  { id: 'g-36', type: 'g', nominalSize: '36', innerDiameter: 35.0, innerArea: 962.1 },
  { id: 'g-42', type: 'g', nominalSize: '42', innerDiameter: 40.4, innerArea: 1281.6 },
  { id: 'g-54', type: 'g', nominalSize: '54', innerDiameter: 52.6, innerArea: 2173.3 },
  // PF管
  { id: 'pf-14', type: 'pf', nominalSize: '14', innerDiameter: 14.0, innerArea: 153.9 },
  { id: 'pf-16', type: 'pf', nominalSize: '16', innerDiameter: 16.0, innerArea: 201.1 },
  { id: 'pf-22', type: 'pf', nominalSize: '22', innerDiameter: 22.0, innerArea: 380.1 },
  { id: 'pf-28', type: 'pf', nominalSize: '28', innerDiameter: 28.0, innerArea: 615.8 },
  { id: 'pf-36', type: 'pf', nominalSize: '36', innerDiameter: 36.0, innerArea: 1017.9 },
  { id: 'pf-42', type: 'pf', nominalSize: '42', innerDiameter: 42.0, innerArea: 1385.4 },
  // VE管
  { id: 've-14', type: 've', nominalSize: '14', innerDiameter: 14.0, innerArea: 153.9 },
  { id: 've-16', type: 've', nominalSize: '16', innerDiameter: 16.0, innerArea: 201.1 },
  { id: 've-22', type: 've', nominalSize: '22', innerDiameter: 22.0, innerArea: 380.1 },
  { id: 've-28', type: 've', nominalSize: '28', innerDiameter: 28.0, innerArea: 615.8 },
  { id: 've-36', type: 've', nominalSize: '36', innerDiameter: 36.0, innerArea: 1017.9 },
  { id: 've-42', type: 've', nominalSize: '42', innerDiameter: 42.0, innerArea: 1385.4 },
  { id: 've-54', type: 've', nominalSize: '54', innerDiameter: 54.0, innerArea: 2290.2 },
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
