/**
 * 電線種類
 */
export interface WireType {
  id: string
  name: string
  fullName: string
  description: string
}

/**
 * 電線仕様
 */
export interface WireSpec {
  id: string
  typeId: string
  size: string
  unit: 'mm' | 'sq'
  cores?: number
  outerDiameter?: number // mm（丸形電線）
  equivalentDiameter?: number // mm（平形ケーブル換算）
  crossSectionArea: number // mm²
  allowableCurrent?: number // A
}

/**
 * 電線種類マスターデータ
 */
export const wireTypes: WireType[] = [
  { id: 'iv', name: 'IV', fullName: '600V ビニル絶縁電線', description: '一般屋内配線用' },
  { id: 'hiv', name: 'HIV', fullName: '600V 二種ビニル絶縁電線', description: '耐熱性ビニル絶縁電線' },
  { id: 'vvf', name: 'VVF', fullName: '600V ビニル絶縁ビニルシースケーブル平形', description: '最も一般的な屋内配線用ケーブル' },
  { id: 'vvr', name: 'VVR', fullName: '600V ビニル絶縁ビニルシースケーブル丸形', description: '丸形シースケーブル' },
  { id: 'cv', name: 'CV', fullName: '600V 架橋ポリエチレン絶縁ビニルシースケーブル', description: '電力配線用、耐熱性優' },
  { id: 'kiv', name: 'KIV', fullName: '600V 機器用単心ビニル絶縁電線', description: '配電盤内配線用' },
  { id: 'em-ie', name: 'EM-IE', fullName: '600V 耐燃性ポリエチレン絶縁電線', description: 'エコ電線、ハロゲンフリー' },
  { id: 'em-eef', name: 'EM-EEF', fullName: '600V ポリエチレン絶縁耐燃性ポリエチレンシースケーブル平形', description: 'エコケーブル（VVF相当）' },
]

/**
 * 電線仕様マスターデータ
 */
export const wireSpecs: WireSpec[] = [
  // IV
  { id: 'iv-1.6', typeId: 'iv', size: '1.6', unit: 'mm', outerDiameter: 2.6, crossSectionArea: 5.31, allowableCurrent: 19 },
  { id: 'iv-2.0', typeId: 'iv', size: '2.0', unit: 'mm', outerDiameter: 3.0, crossSectionArea: 7.07, allowableCurrent: 24 },
  { id: 'iv-2.6', typeId: 'iv', size: '2.6', unit: 'mm', outerDiameter: 3.8, crossSectionArea: 11.34, allowableCurrent: 33 },
  { id: 'iv-3.2', typeId: 'iv', size: '3.2', unit: 'mm', outerDiameter: 4.5, crossSectionArea: 15.90, allowableCurrent: 43 },
  { id: 'iv-2sq', typeId: 'iv', size: '2', unit: 'sq', outerDiameter: 3.4, crossSectionArea: 9.08, allowableCurrent: 27 },
  { id: 'iv-3.5sq', typeId: 'iv', size: '3.5', unit: 'sq', outerDiameter: 4.0, crossSectionArea: 12.57, allowableCurrent: 37 },
  { id: 'iv-5.5sq', typeId: 'iv', size: '5.5', unit: 'sq', outerDiameter: 4.8, crossSectionArea: 18.10, allowableCurrent: 49 },
  { id: 'iv-8sq', typeId: 'iv', size: '8', unit: 'sq', outerDiameter: 5.6, crossSectionArea: 24.63, allowableCurrent: 61 },
  { id: 'iv-14sq', typeId: 'iv', size: '14', unit: 'sq', outerDiameter: 7.0, crossSectionArea: 38.48, allowableCurrent: 88 },
  { id: 'iv-22sq', typeId: 'iv', size: '22', unit: 'sq', outerDiameter: 8.6, crossSectionArea: 58.09, allowableCurrent: 115 },
  { id: 'iv-38sq', typeId: 'iv', size: '38', unit: 'sq', outerDiameter: 10.6, crossSectionArea: 88.25, allowableCurrent: 162 },
  { id: 'iv-60sq', typeId: 'iv', size: '60', unit: 'sq', outerDiameter: 13.0, crossSectionArea: 132.73, allowableCurrent: 217 },

  // VVF
  { id: 'vvf-1.6-2c', typeId: 'vvf', size: '1.6', unit: 'mm', cores: 2, equivalentDiameter: 7.6, crossSectionArea: 45.36, allowableCurrent: 18 },
  { id: 'vvf-1.6-3c', typeId: 'vvf', size: '1.6', unit: 'mm', cores: 3, equivalentDiameter: 8.8, crossSectionArea: 60.82, allowableCurrent: 15 },
  { id: 'vvf-2.0-2c', typeId: 'vvf', size: '2.0', unit: 'mm', cores: 2, equivalentDiameter: 8.6, crossSectionArea: 58.09, allowableCurrent: 23 },
  { id: 'vvf-2.0-3c', typeId: 'vvf', size: '2.0', unit: 'mm', cores: 3, equivalentDiameter: 9.9, crossSectionArea: 76.98, allowableCurrent: 19 },
  { id: 'vvf-2.6-2c', typeId: 'vvf', size: '2.6', unit: 'mm', cores: 2, equivalentDiameter: 10.4, crossSectionArea: 84.95, allowableCurrent: 32 },
  { id: 'vvf-2.6-3c', typeId: 'vvf', size: '2.6', unit: 'mm', cores: 3, equivalentDiameter: 11.9, crossSectionArea: 111.22, allowableCurrent: 27 },

  // CV
  { id: 'cv-2sq-1c', typeId: 'cv', size: '2', unit: 'sq', cores: 1, outerDiameter: 6.3, crossSectionArea: 31.17, allowableCurrent: 35 },
  { id: 'cv-3.5sq-1c', typeId: 'cv', size: '3.5', unit: 'sq', cores: 1, outerDiameter: 6.9, crossSectionArea: 37.39, allowableCurrent: 46 },
  { id: 'cv-5.5sq-1c', typeId: 'cv', size: '5.5', unit: 'sq', cores: 1, outerDiameter: 7.8, crossSectionArea: 47.78, allowableCurrent: 61 },
  { id: 'cv-8sq-1c', typeId: 'cv', size: '8', unit: 'sq', cores: 1, outerDiameter: 8.6, crossSectionArea: 58.09, allowableCurrent: 76 },
  { id: 'cv-14sq-1c', typeId: 'cv', size: '14', unit: 'sq', cores: 1, outerDiameter: 10.2, crossSectionArea: 81.71, allowableCurrent: 105 },
  { id: 'cv-22sq-1c', typeId: 'cv', size: '22', unit: 'sq', cores: 1, outerDiameter: 12.0, crossSectionArea: 113.10, allowableCurrent: 140 },
  { id: 'cv-38sq-1c', typeId: 'cv', size: '38', unit: 'sq', cores: 1, outerDiameter: 14.4, crossSectionArea: 162.86, allowableCurrent: 195 },
  { id: 'cv-60sq-1c', typeId: 'cv', size: '60', unit: 'sq', cores: 1, outerDiameter: 17.4, crossSectionArea: 237.79, allowableCurrent: 255 },
  { id: 'cv-2sq-2c', typeId: 'cv', size: '2', unit: 'sq', cores: 2, outerDiameter: 11.5, crossSectionArea: 103.87, allowableCurrent: 28 },
  { id: 'cv-3.5sq-2c', typeId: 'cv', size: '3.5', unit: 'sq', cores: 2, outerDiameter: 12.5, crossSectionArea: 122.72, allowableCurrent: 37 },
  { id: 'cv-5.5sq-2c', typeId: 'cv', size: '5.5', unit: 'sq', cores: 2, outerDiameter: 14.0, crossSectionArea: 153.94, allowableCurrent: 49 },
  { id: 'cv-2sq-3c', typeId: 'cv', size: '2', unit: 'sq', cores: 3, outerDiameter: 12.5, crossSectionArea: 122.72, allowableCurrent: 26 },
  { id: 'cv-3.5sq-3c', typeId: 'cv', size: '3.5', unit: 'sq', cores: 3, outerDiameter: 13.5, crossSectionArea: 143.14, allowableCurrent: 35 },
  { id: 'cv-5.5sq-3c', typeId: 'cv', size: '5.5', unit: 'sq', cores: 3, outerDiameter: 15.0, crossSectionArea: 176.71, allowableCurrent: 46 },

  // KIV
  { id: 'kiv-0.5sq', typeId: 'kiv', size: '0.5', unit: 'sq', outerDiameter: 2.0, crossSectionArea: 3.14, allowableCurrent: 8 },
  { id: 'kiv-0.75sq', typeId: 'kiv', size: '0.75', unit: 'sq', outerDiameter: 2.2, crossSectionArea: 3.80, allowableCurrent: 10 },
  { id: 'kiv-1.25sq', typeId: 'kiv', size: '1.25', unit: 'sq', outerDiameter: 2.6, crossSectionArea: 5.31, allowableCurrent: 14 },
  { id: 'kiv-2sq', typeId: 'kiv', size: '2', unit: 'sq', outerDiameter: 3.0, crossSectionArea: 7.07, allowableCurrent: 19 },
  { id: 'kiv-3.5sq', typeId: 'kiv', size: '3.5', unit: 'sq', outerDiameter: 3.6, crossSectionArea: 10.18, allowableCurrent: 28 },
  { id: 'kiv-5.5sq', typeId: 'kiv', size: '5.5', unit: 'sq', outerDiameter: 4.4, crossSectionArea: 15.21, allowableCurrent: 40 },
  { id: 'kiv-8sq', typeId: 'kiv', size: '8', unit: 'sq', outerDiameter: 5.2, crossSectionArea: 21.24, allowableCurrent: 53 },
  { id: 'kiv-14sq', typeId: 'kiv', size: '14', unit: 'sq', outerDiameter: 6.6, crossSectionArea: 34.21, allowableCurrent: 77 },
  { id: 'kiv-22sq', typeId: 'kiv', size: '22', unit: 'sq', outerDiameter: 8.2, crossSectionArea: 52.81, allowableCurrent: 105 },

  // EM-IE
  { id: 'em-ie-1.6', typeId: 'em-ie', size: '1.6', unit: 'mm', outerDiameter: 2.8, crossSectionArea: 6.16, allowableCurrent: 19 },
  { id: 'em-ie-2.0', typeId: 'em-ie', size: '2.0', unit: 'mm', outerDiameter: 3.2, crossSectionArea: 8.04, allowableCurrent: 24 },
  { id: 'em-ie-2.6', typeId: 'em-ie', size: '2.6', unit: 'mm', outerDiameter: 4.0, crossSectionArea: 12.57, allowableCurrent: 33 },
  { id: 'em-ie-2sq', typeId: 'em-ie', size: '2', unit: 'sq', outerDiameter: 3.6, crossSectionArea: 10.18, allowableCurrent: 27 },
  { id: 'em-ie-3.5sq', typeId: 'em-ie', size: '3.5', unit: 'sq', outerDiameter: 4.2, crossSectionArea: 13.85, allowableCurrent: 37 },
  { id: 'em-ie-5.5sq', typeId: 'em-ie', size: '5.5', unit: 'sq', outerDiameter: 5.0, crossSectionArea: 19.63, allowableCurrent: 49 },
  { id: 'em-ie-8sq', typeId: 'em-ie', size: '8', unit: 'sq', outerDiameter: 5.8, crossSectionArea: 26.42, allowableCurrent: 61 },
  { id: 'em-ie-14sq', typeId: 'em-ie', size: '14', unit: 'sq', outerDiameter: 7.2, crossSectionArea: 40.72, allowableCurrent: 88 },

  // EM-EEF
  { id: 'em-eef-1.6-2c', typeId: 'em-eef', size: '1.6', unit: 'mm', cores: 2, equivalentDiameter: 8.0, crossSectionArea: 50.27, allowableCurrent: 18 },
  { id: 'em-eef-1.6-3c', typeId: 'em-eef', size: '1.6', unit: 'mm', cores: 3, equivalentDiameter: 9.2, crossSectionArea: 66.48, allowableCurrent: 15 },
  { id: 'em-eef-2.0-2c', typeId: 'em-eef', size: '2.0', unit: 'mm', cores: 2, equivalentDiameter: 9.0, crossSectionArea: 63.62, allowableCurrent: 23 },
  { id: 'em-eef-2.0-3c', typeId: 'em-eef', size: '2.0', unit: 'mm', cores: 3, equivalentDiameter: 10.3, crossSectionArea: 83.32, allowableCurrent: 19 },
]

/**
 * 電線種類を取得
 */
export function getWireType(id: string): WireType | undefined {
  return wireTypes.find((t) => t.id === id)
}

/**
 * 電線仕様を取得
 */
export function getWireSpec(id: string): WireSpec | undefined {
  return wireSpecs.find((s) => s.id === id)
}

/**
 * 指定した種類の電線仕様一覧を取得
 */
export function getWireSpecsByType(typeId: string): WireSpec[] {
  return wireSpecs.filter((s) => s.typeId === typeId)
}

/**
 * 電線仕様の表示名を取得
 */
export function getWireSpecDisplayName(spec: WireSpec): string {
  const type = getWireType(spec.typeId)
  const typeName = type?.name ?? spec.typeId.toUpperCase()
  const coreStr = spec.cores ? `-${spec.cores}C` : ''
  const unitStr = spec.unit === 'sq' ? '㎟' : 'mm'
  return `${typeName} ${spec.size}${unitStr}${coreStr}`
}
