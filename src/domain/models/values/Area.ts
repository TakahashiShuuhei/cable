import type { Diameter } from './Diameter'

/**
 * 断面積を表す値オブジェクト
 * 不変（イミュータブル）
 */
export class Area {
  private constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error('面積は0以上である必要があります')
    }
  }

  /**
   * 面積を生成する
   * @param mm2 面積（mm²）
   */
  static of(mm2: number): Area {
    return new Area(mm2)
  }

  /**
   * ゼロ面積を生成する（電線がない場合用）
   */
  static zero(): Area {
    return new Area(0)
  }

  /**
   * 直径から面積を計算
   * 面積 = π × (直径/2)²
   */
  static fromDiameter(diameter: Diameter): Area {
    const r = diameter.mm / 2
    return new Area(Math.PI * r * r)
  }

  /**
   * 面積の値を取得（mm²）
   */
  get mm2(): number {
    return this.value
  }

  /**
   * 面積を加算
   */
  add(other: Area): Area {
    return new Area(this.value + other.value)
  }

  /**
   * 面積を乗算
   */
  multiply(count: number): Area {
    if (count <= 0) {
      throw new Error('乗数は正の値である必要があります')
    }
    return new Area(this.value * count)
  }

  /**
   * 面積の割合を計算（this / other）
   */
  divideBy(other: Area): number {
    return this.value / other.value
  }

  /**
   * 等価性の比較（0.001mm²の誤差を許容）
   */
  equals(other: Area): boolean {
    return Math.abs(this.value - other.value) < 0.001
  }
}
