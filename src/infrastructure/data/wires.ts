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
  dimensions?: { width: number; height: number } // mm（平形ケーブル）
  crossSectionArea: number // mm²（電線管収容計算用）
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
  { id: 'cvd', name: 'CVD/T/Q', fullName: '600V 架橋ポリエチレン絶縁ビニルシースケーブル（より合わせ型）', description: '電力幹線用、大容量' },
  { id: 'kiv', name: 'KIV', fullName: '600V 機器用単心ビニル絶縁電線', description: '配電盤内配線用' },
]

// 断面積計算ヘルパー（外径から）
const circleArea = (d: number) => Math.PI * Math.pow(d / 2, 2)

/**
 * 電線仕様マスターデータ
 * データ出典: https://www.densen-store.com/user_data/electric
 */
export const wireSpecs: WireSpec[] = [
  // ============================================
  // IV（撚線）- 公称断面積（㎟）
  // ============================================
  { id: 'iv-0.9sq', typeId: 'iv', size: '0.9', unit: 'sq', outerDiameter: 2.8, crossSectionArea: circleArea(2.8), allowableCurrent: 17 },
  { id: 'iv-1.25sq', typeId: 'iv', size: '1.25', unit: 'sq', outerDiameter: 3.0, crossSectionArea: circleArea(3.0), allowableCurrent: 19 },
  { id: 'iv-2sq', typeId: 'iv', size: '2', unit: 'sq', outerDiameter: 3.4, crossSectionArea: circleArea(3.4), allowableCurrent: 27 },
  { id: 'iv-3.5sq', typeId: 'iv', size: '3.5', unit: 'sq', outerDiameter: 4.0, crossSectionArea: circleArea(4.0), allowableCurrent: 37 },
  { id: 'iv-5.5sq', typeId: 'iv', size: '5.5', unit: 'sq', outerDiameter: 5.0, crossSectionArea: circleArea(5.0), allowableCurrent: 49 },
  { id: 'iv-8sq', typeId: 'iv', size: '8', unit: 'sq', outerDiameter: 6.0, crossSectionArea: circleArea(6.0), allowableCurrent: 61 },
  { id: 'iv-14sq', typeId: 'iv', size: '14', unit: 'sq', outerDiameter: 7.6, crossSectionArea: circleArea(7.6), allowableCurrent: 88 },
  { id: 'iv-22sq', typeId: 'iv', size: '22', unit: 'sq', outerDiameter: 9.2, crossSectionArea: circleArea(9.2), allowableCurrent: 115 },
  { id: 'iv-38sq', typeId: 'iv', size: '38', unit: 'sq', outerDiameter: 11.5, crossSectionArea: circleArea(11.5), allowableCurrent: 162 },
  { id: 'iv-60sq', typeId: 'iv', size: '60', unit: 'sq', outerDiameter: 14.0, crossSectionArea: circleArea(14.0), allowableCurrent: 217 },
  { id: 'iv-100sq', typeId: 'iv', size: '100', unit: 'sq', outerDiameter: 17.0, crossSectionArea: circleArea(17.0), allowableCurrent: 298 },

  // IV（単線）- サイズ（㎜）
  { id: 'iv-1.2', typeId: 'iv', size: '1.2', unit: 'mm', outerDiameter: 2.8, crossSectionArea: circleArea(2.8), allowableCurrent: 19 },
  { id: 'iv-1.6', typeId: 'iv', size: '1.6', unit: 'mm', outerDiameter: 3.2, crossSectionArea: circleArea(3.2), allowableCurrent: 27 },
  { id: 'iv-2.0', typeId: 'iv', size: '2.0', unit: 'mm', outerDiameter: 3.6, crossSectionArea: circleArea(3.6), allowableCurrent: 35 },

  // ============================================
  // HIV（撚線）- 公称断面積（㎟）
  // ============================================
  { id: 'hiv-0.9sq', typeId: 'hiv', size: '0.9', unit: 'sq', outerDiameter: 2.8, crossSectionArea: circleArea(2.8), allowableCurrent: 20 },
  { id: 'hiv-1.25sq', typeId: 'hiv', size: '1.25', unit: 'sq', outerDiameter: 3.0, crossSectionArea: circleArea(3.0), allowableCurrent: 23 },
  { id: 'hiv-2sq', typeId: 'hiv', size: '2', unit: 'sq', outerDiameter: 3.4, crossSectionArea: circleArea(3.4), allowableCurrent: 33 },
  { id: 'hiv-3.5sq', typeId: 'hiv', size: '3.5', unit: 'sq', outerDiameter: 4.0, crossSectionArea: circleArea(4.0), allowableCurrent: 45 },
  { id: 'hiv-5.5sq', typeId: 'hiv', size: '5.5', unit: 'sq', outerDiameter: 5.0, crossSectionArea: circleArea(5.0), allowableCurrent: 59 },

  // HIV（単線）- サイズ（㎜）
  { id: 'hiv-1.0', typeId: 'hiv', size: '1.0', unit: 'mm', outerDiameter: 2.6, crossSectionArea: circleArea(2.6), allowableCurrent: 20 },
  { id: 'hiv-1.6', typeId: 'hiv', size: '1.6', unit: 'mm', outerDiameter: 3.2, crossSectionArea: circleArea(3.2), allowableCurrent: 33 },
  { id: 'hiv-2.0', typeId: 'hiv', size: '2.0', unit: 'mm', outerDiameter: 3.6, crossSectionArea: circleArea(3.6), allowableCurrent: 42 },

  // ============================================
  // VVF（平形ケーブル）- 長辺を直径とする円の面積で代用
  // ============================================
  { id: 'vvf-1.6-2c', typeId: 'vvf', size: '1.6', unit: 'mm', cores: 2, dimensions: { width: 6.2, height: 9.4 }, crossSectionArea: circleArea(9.4), allowableCurrent: 18 },
  { id: 'vvf-1.6-3c', typeId: 'vvf', size: '1.6', unit: 'mm', cores: 3, dimensions: { width: 6.2, height: 12.6 }, crossSectionArea: circleArea(12.6), allowableCurrent: 15 },
  { id: 'vvf-1.6-4c', typeId: 'vvf', size: '1.6', unit: 'mm', cores: 4, dimensions: { width: 6.2, height: 15.8 }, crossSectionArea: circleArea(15.8), allowableCurrent: 15 },
  { id: 'vvf-2.0-2c', typeId: 'vvf', size: '2.0', unit: 'mm', cores: 2, dimensions: { width: 6.6, height: 10.2 }, crossSectionArea: circleArea(10.2), allowableCurrent: 23 },
  { id: 'vvf-2.0-3c', typeId: 'vvf', size: '2.0', unit: 'mm', cores: 3, dimensions: { width: 6.6, height: 13.8 }, crossSectionArea: circleArea(13.8), allowableCurrent: 20 },
  { id: 'vvf-2.0-4c', typeId: 'vvf', size: '2.0', unit: 'mm', cores: 4, dimensions: { width: 6.6, height: 17.4 }, crossSectionArea: circleArea(17.4), allowableCurrent: 20 },
  { id: 'vvf-2.6-2c', typeId: 'vvf', size: '2.6', unit: 'mm', cores: 2, dimensions: { width: 7.6, height: 12.2 }, crossSectionArea: circleArea(12.2), allowableCurrent: 32 },
  { id: 'vvf-2.6-3c', typeId: 'vvf', size: '2.6', unit: 'mm', cores: 3, dimensions: { width: 7.6, height: 16.8 }, crossSectionArea: circleArea(16.8), allowableCurrent: 27 },

  // ============================================
  // VVR（丸形ケーブル）
  // ============================================
  { id: 'vvr-5.5sq-2c', typeId: 'vvr', size: '5.5', unit: 'sq', cores: 2, outerDiameter: 13.5, crossSectionArea: circleArea(13.5), allowableCurrent: 33 },
  { id: 'vvr-5.5sq-3c', typeId: 'vvr', size: '5.5', unit: 'sq', cores: 3, outerDiameter: 14.5, crossSectionArea: circleArea(14.5), allowableCurrent: 28 },
  { id: 'vvr-8sq-2c', typeId: 'vvr', size: '8', unit: 'sq', cores: 2, outerDiameter: 15.5, crossSectionArea: circleArea(15.5), allowableCurrent: 42 },
  { id: 'vvr-8sq-3c', typeId: 'vvr', size: '8', unit: 'sq', cores: 3, outerDiameter: 16.0, crossSectionArea: circleArea(16.0), allowableCurrent: 36 },
  { id: 'vvr-14sq-2c', typeId: 'vvr', size: '14', unit: 'sq', cores: 2, outerDiameter: 18.0, crossSectionArea: circleArea(18.0), allowableCurrent: 59 },
  { id: 'vvr-14sq-3c', typeId: 'vvr', size: '14', unit: 'sq', cores: 3, outerDiameter: 19.0, crossSectionArea: circleArea(19.0), allowableCurrent: 50 },
  { id: 'vvr-22sq-2c', typeId: 'vvr', size: '22', unit: 'sq', cores: 2, outerDiameter: 21.0, crossSectionArea: circleArea(21.0), allowableCurrent: 78 },
  { id: 'vvr-22sq-3c', typeId: 'vvr', size: '22', unit: 'sq', cores: 3, outerDiameter: 23.0, crossSectionArea: circleArea(23.0), allowableCurrent: 66 },
  { id: 'vvr-38sq-2c', typeId: 'vvr', size: '38', unit: 'sq', cores: 2, outerDiameter: 26.0, crossSectionArea: circleArea(26.0), allowableCurrent: 110 },
  { id: 'vvr-38sq-3c', typeId: 'vvr', size: '38', unit: 'sq', cores: 3, outerDiameter: 28.0, crossSectionArea: circleArea(28.0), allowableCurrent: 93 },
  { id: 'vvr-60sq-3c', typeId: 'vvr', size: '60', unit: 'sq', cores: 3, outerDiameter: 33.0, crossSectionArea: circleArea(33.0), allowableCurrent: 120 },

  // ============================================
  // CV（600V架橋ポリエチレン絶縁ビニルシースケーブル）
  // ============================================
  // 2sq
  { id: 'cv-2sq-1c', typeId: 'cv', size: '2', unit: 'sq', cores: 1, outerDiameter: 6.3, crossSectionArea: circleArea(6.3), allowableCurrent: 31 },
  { id: 'cv-2sq-2c', typeId: 'cv', size: '2', unit: 'sq', cores: 2, outerDiameter: 10.0, crossSectionArea: circleArea(10.0), allowableCurrent: 28 },
  { id: 'cv-2sq-3c', typeId: 'cv', size: '2', unit: 'sq', cores: 3, outerDiameter: 10.5, crossSectionArea: circleArea(10.5), allowableCurrent: 23 },
  { id: 'cv-2sq-4c', typeId: 'cv', size: '2', unit: 'sq', cores: 4, outerDiameter: 11.5, crossSectionArea: circleArea(11.5), allowableCurrent: 23 },
  // 3.5sq
  { id: 'cv-3.5sq-1c', typeId: 'cv', size: '3.5', unit: 'sq', cores: 1, outerDiameter: 6.9, crossSectionArea: circleArea(6.9), allowableCurrent: 44 },
  { id: 'cv-3.5sq-2c', typeId: 'cv', size: '3.5', unit: 'sq', cores: 2, outerDiameter: 11.0, crossSectionArea: circleArea(11.0), allowableCurrent: 39 },
  { id: 'cv-3.5sq-3c', typeId: 'cv', size: '3.5', unit: 'sq', cores: 3, outerDiameter: 12.0, crossSectionArea: circleArea(12.0), allowableCurrent: 33 },
  { id: 'cv-3.5sq-4c', typeId: 'cv', size: '3.5', unit: 'sq', cores: 4, outerDiameter: 13.0, crossSectionArea: circleArea(13.0), allowableCurrent: 33 },
  // 5.5sq
  { id: 'cv-5.5sq-1c', typeId: 'cv', size: '5.5', unit: 'sq', cores: 1, outerDiameter: 8.0, crossSectionArea: circleArea(8.0), allowableCurrent: 58 },
  { id: 'cv-5.5sq-2c', typeId: 'cv', size: '5.5', unit: 'sq', cores: 2, outerDiameter: 13.5, crossSectionArea: circleArea(13.5), allowableCurrent: 52 },
  { id: 'cv-5.5sq-3c', typeId: 'cv', size: '5.5', unit: 'sq', cores: 3, outerDiameter: 14.5, crossSectionArea: circleArea(14.5), allowableCurrent: 44 },
  { id: 'cv-5.5sq-4c', typeId: 'cv', size: '5.5', unit: 'sq', cores: 4, outerDiameter: 16.0, crossSectionArea: circleArea(16.0), allowableCurrent: 44 },
  // 8sq
  { id: 'cv-8sq-1c', typeId: 'cv', size: '8', unit: 'sq', cores: 1, outerDiameter: 8.6, crossSectionArea: circleArea(8.6), allowableCurrent: 72 },
  { id: 'cv-8sq-2c', typeId: 'cv', size: '8', unit: 'sq', cores: 2, outerDiameter: 15.0, crossSectionArea: circleArea(15.0), allowableCurrent: 65 },
  { id: 'cv-8sq-3c', typeId: 'cv', size: '8', unit: 'sq', cores: 3, outerDiameter: 16.0, crossSectionArea: circleArea(16.0), allowableCurrent: 54 },
  { id: 'cv-8sq-4c', typeId: 'cv', size: '8', unit: 'sq', cores: 4, outerDiameter: 17.5, crossSectionArea: circleArea(17.5), allowableCurrent: 54 },
  // 14sq
  { id: 'cv-14sq-1c', typeId: 'cv', size: '14', unit: 'sq', cores: 1, outerDiameter: 9.4, crossSectionArea: circleArea(9.4), allowableCurrent: 100 },
  { id: 'cv-14sq-2c', typeId: 'cv', size: '14', unit: 'sq', cores: 2, outerDiameter: 16.5, crossSectionArea: circleArea(16.5), allowableCurrent: 91 },
  { id: 'cv-14sq-3c', typeId: 'cv', size: '14', unit: 'sq', cores: 3, outerDiameter: 17.5, crossSectionArea: circleArea(17.5), allowableCurrent: 76 },
  { id: 'cv-14sq-4c', typeId: 'cv', size: '14', unit: 'sq', cores: 4, outerDiameter: 19.0, crossSectionArea: circleArea(19.0), allowableCurrent: 76 },
  // 22sq
  { id: 'cv-22sq-1c', typeId: 'cv', size: '22', unit: 'sq', cores: 1, outerDiameter: 11.0, crossSectionArea: circleArea(11.0), allowableCurrent: 130 },
  { id: 'cv-22sq-2c', typeId: 'cv', size: '22', unit: 'sq', cores: 2, outerDiameter: 19.5, crossSectionArea: circleArea(19.5), allowableCurrent: 120 },
  { id: 'cv-22sq-3c', typeId: 'cv', size: '22', unit: 'sq', cores: 3, outerDiameter: 21.0, crossSectionArea: circleArea(21.0), allowableCurrent: 100 },
  { id: 'cv-22sq-4c', typeId: 'cv', size: '22', unit: 'sq', cores: 4, outerDiameter: 23.0, crossSectionArea: circleArea(23.0), allowableCurrent: 100 },
  // 38sq
  { id: 'cv-38sq-1c', typeId: 'cv', size: '38', unit: 'sq', cores: 1, outerDiameter: 13.0, crossSectionArea: circleArea(13.0), allowableCurrent: 190 },
  { id: 'cv-38sq-2c', typeId: 'cv', size: '38', unit: 'sq', cores: 2, outerDiameter: 24.0, crossSectionArea: circleArea(24.0), allowableCurrent: 170 },
  { id: 'cv-38sq-3c', typeId: 'cv', size: '38', unit: 'sq', cores: 3, outerDiameter: 25.0, crossSectionArea: circleArea(25.0), allowableCurrent: 140 },
  { id: 'cv-38sq-4c', typeId: 'cv', size: '38', unit: 'sq', cores: 4, outerDiameter: 28.0, crossSectionArea: circleArea(28.0), allowableCurrent: 140 },
  // 60sq
  { id: 'cv-60sq-1c', typeId: 'cv', size: '60', unit: 'sq', cores: 1, outerDiameter: 15.5, crossSectionArea: circleArea(15.5), allowableCurrent: 255 },
  { id: 'cv-60sq-2c', typeId: 'cv', size: '60', unit: 'sq', cores: 2, outerDiameter: 29.0, crossSectionArea: circleArea(29.0), allowableCurrent: 225 },
  { id: 'cv-60sq-3c', typeId: 'cv', size: '60', unit: 'sq', cores: 3, outerDiameter: 31.0, crossSectionArea: circleArea(31.0), allowableCurrent: 190 },
  { id: 'cv-60sq-4c', typeId: 'cv', size: '60', unit: 'sq', cores: 4, outerDiameter: 35.0, crossSectionArea: circleArea(35.0), allowableCurrent: 190 },
  // 100sq
  { id: 'cv-100sq-1c', typeId: 'cv', size: '100', unit: 'sq', cores: 1, outerDiameter: 19.0, crossSectionArea: circleArea(19.0), allowableCurrent: 355 },

  // ============================================
  // KIV（機器用単心ビニル絶縁電線）
  // ============================================
  { id: 'kiv-0.3sq', typeId: 'kiv', size: '0.3', unit: 'sq', outerDiameter: 1.8, crossSectionArea: circleArea(1.8), allowableCurrent: 6 },
  { id: 'kiv-0.5sq', typeId: 'kiv', size: '0.5', unit: 'sq', outerDiameter: 2.5, crossSectionArea: circleArea(2.5), allowableCurrent: 10 },
  { id: 'kiv-0.75sq', typeId: 'kiv', size: '0.75', unit: 'sq', outerDiameter: 2.7, crossSectionArea: circleArea(2.7), allowableCurrent: 13 },
  { id: 'kiv-1.25sq', typeId: 'kiv', size: '1.25', unit: 'sq', outerDiameter: 3.1, crossSectionArea: circleArea(3.1), allowableCurrent: 18 },
  { id: 'kiv-2sq', typeId: 'kiv', size: '2', unit: 'sq', outerDiameter: 3.4, crossSectionArea: circleArea(3.4), allowableCurrent: 24 },
  { id: 'kiv-3.5sq', typeId: 'kiv', size: '3.5', unit: 'sq', outerDiameter: 4.1, crossSectionArea: circleArea(4.1), allowableCurrent: 35 },
  { id: 'kiv-5.5sq', typeId: 'kiv', size: '5.5', unit: 'sq', outerDiameter: 5.1, crossSectionArea: circleArea(5.1), allowableCurrent: 50 },
  { id: 'kiv-8sq', typeId: 'kiv', size: '8', unit: 'sq', outerDiameter: 6.1, crossSectionArea: circleArea(6.1), allowableCurrent: 60 },
  { id: 'kiv-14sq', typeId: 'kiv', size: '14', unit: 'sq', outerDiameter: 7.7, crossSectionArea: circleArea(7.7), allowableCurrent: 88 },
  { id: 'kiv-22sq', typeId: 'kiv', size: '22', unit: 'sq', outerDiameter: 10.5, crossSectionArea: circleArea(10.5), allowableCurrent: 124 },
  { id: 'kiv-38sq', typeId: 'kiv', size: '38', unit: 'sq', outerDiameter: 13.0, crossSectionArea: circleArea(13.0), allowableCurrent: 176 },
  { id: 'kiv-60sq', typeId: 'kiv', size: '60', unit: 'sq', outerDiameter: 15.5, crossSectionArea: circleArea(15.5), allowableCurrent: 239 },
  { id: 'kiv-100sq', typeId: 'kiv', size: '100', unit: 'sq', outerDiameter: 19.5, crossSectionArea: circleArea(19.5), allowableCurrent: 339 },

  // ============================================
  // CVD/CVT/CVQ（600V架橋ポリエチレン絶縁ビニルシースケーブル より合わせ型）
  // CVD=2心, CVT=3心, CVQ=4心
  // ============================================
  // 8sq
  { id: 'cvd-8sq-3c', typeId: 'cvd', size: '8', unit: 'sq', cores: 3, outerDiameter: 19.0, crossSectionArea: circleArea(19.0), allowableCurrent: 62 },
  // 14sq
  { id: 'cvd-14sq-3c', typeId: 'cvd', size: '14', unit: 'sq', cores: 3, outerDiameter: 21.0, crossSectionArea: circleArea(21.0), allowableCurrent: 86 },
  // 22sq
  { id: 'cvd-22sq-2c', typeId: 'cvd', size: '22', unit: 'sq', cores: 2, outerDiameter: 22.0, crossSectionArea: circleArea(22.0), allowableCurrent: 120 },
  { id: 'cvd-22sq-3c', typeId: 'cvd', size: '22', unit: 'sq', cores: 3, outerDiameter: 24.0, crossSectionArea: circleArea(24.0), allowableCurrent: 110 },
  { id: 'cvd-22sq-4c', typeId: 'cvd', size: '22', unit: 'sq', cores: 4, outerDiameter: 27.0, crossSectionArea: circleArea(27.0), allowableCurrent: 110 },
  // 38sq
  { id: 'cvd-38sq-2c', typeId: 'cvd', size: '38', unit: 'sq', cores: 2, outerDiameter: 26.0, crossSectionArea: circleArea(26.0), allowableCurrent: 165 },
  { id: 'cvd-38sq-3c', typeId: 'cvd', size: '38', unit: 'sq', cores: 3, outerDiameter: 28.0, crossSectionArea: circleArea(28.0), allowableCurrent: 155 },
  { id: 'cvd-38sq-4c', typeId: 'cvd', size: '38', unit: 'sq', cores: 4, outerDiameter: 31.0, crossSectionArea: circleArea(31.0), allowableCurrent: 155 },
  // 60sq
  { id: 'cvd-60sq-2c', typeId: 'cvd', size: '60', unit: 'sq', cores: 2, outerDiameter: 31.0, crossSectionArea: circleArea(31.0), allowableCurrent: 225 },
  { id: 'cvd-60sq-3c', typeId: 'cvd', size: '60', unit: 'sq', cores: 3, outerDiameter: 33.0, crossSectionArea: circleArea(33.0), allowableCurrent: 210 },
  { id: 'cvd-60sq-4c', typeId: 'cvd', size: '60', unit: 'sq', cores: 4, outerDiameter: 37.0, crossSectionArea: circleArea(37.0), allowableCurrent: 210 },
  // 100sq
  { id: 'cvd-100sq-2c', typeId: 'cvd', size: '100', unit: 'sq', cores: 2, outerDiameter: 38.0, crossSectionArea: circleArea(38.0), allowableCurrent: 310 },
  { id: 'cvd-100sq-3c', typeId: 'cvd', size: '100', unit: 'sq', cores: 3, outerDiameter: 41.0, crossSectionArea: circleArea(41.0), allowableCurrent: 290 },
  // 150sq
  { id: 'cvd-150sq-2c', typeId: 'cvd', size: '150', unit: 'sq', cores: 2, outerDiameter: 44.0, crossSectionArea: circleArea(44.0), allowableCurrent: 400 },
  { id: 'cvd-150sq-3c', typeId: 'cvd', size: '150', unit: 'sq', cores: 3, outerDiameter: 47.0, crossSectionArea: circleArea(47.0), allowableCurrent: 380 },
  // 200sq
  { id: 'cvd-200sq-3c', typeId: 'cvd', size: '200', unit: 'sq', cores: 3, outerDiameter: 55.0, crossSectionArea: circleArea(55.0), allowableCurrent: 465 },
  // 250sq
  { id: 'cvd-250sq-2c', typeId: 'cvd', size: '250', unit: 'sq', cores: 2, outerDiameter: 55.0, crossSectionArea: circleArea(55.0), allowableCurrent: 565 },
  { id: 'cvd-250sq-3c', typeId: 'cvd', size: '250', unit: 'sq', cores: 3, outerDiameter: 60.0, crossSectionArea: circleArea(60.0), allowableCurrent: 535 },
  // 325sq
  { id: 'cvd-325sq-3c', typeId: 'cvd', size: '325', unit: 'sq', cores: 3, outerDiameter: 66.0, crossSectionArea: circleArea(66.0), allowableCurrent: 635 },
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
  let typeName = type?.name ?? spec.typeId.toUpperCase()

  // CVD/CVT/CVQ は心数に応じて名称を変える
  if (spec.typeId === 'cvd' && spec.cores) {
    if (spec.cores === 2) typeName = 'CVD'
    else if (spec.cores === 3) typeName = 'CVT'
    else if (spec.cores === 4) typeName = 'CVQ'
  }

  const coreStr = spec.cores ? `-${spec.cores}C` : ''
  const unitStr = spec.unit === 'sq' ? '㎟' : 'mm'
  return `${typeName} ${spec.size}${unitStr}${coreStr}`
}
