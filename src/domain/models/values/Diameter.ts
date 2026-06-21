import { Area } from './Area'

/**
 * 直径を表す値オブジェクト
 * 不変（イミュータブル）
 */
export class Diameter {
  private constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('直径は正の値である必要があります')
    }
  }

  /**
   * 直径を生成する
   * @param mm 直径（mm）
   */
  static of(mm: number): Diameter {
    return new Diameter(mm)
  }

  /**
   * 直径の値を取得（mm）
   */
  get mm(): number {
    return this.value
  }

  /**
   * 直径から断面積を計算
   * 面積 = π × (直径/2)²
   */
  toArea(): Area {
    return Area.fromDiameter(this)
  }

  /**
   * 等価性の比較
   */
  equals(other: Diameter): boolean {
    return this.value === other.value
  }
}
