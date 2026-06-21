import type { Area } from './Area'

/**
 * 警告レベル
 */
export type WarningLevel = 'safe' | 'warning' | 'danger'

/**
 * 占有率を表す値オブジェクト
 * 不変（イミュータブル）
 */
export class OccupancyRate {
  private constructor(
    private readonly _percentage: number,
    private readonly _isMixed: boolean
  ) {}

  /**
   * 占有率を計算する
   * @param wireArea 電線の総断面積
   * @param conduitArea 電線管の内断面積
   * @param isMixed 複合（異なるサイズの電線混在）かどうか
   */
  static calculate(wireArea: Area, conduitArea: Area, isMixed: boolean): OccupancyRate {
    const percentage = (wireArea.mm2 / conduitArea.mm2) * 100
    return new OccupancyRate(percentage, isMixed)
  }

  /**
   * 占有率（%）を取得
   */
  get percentage(): number {
    return this._percentage
  }

  /**
   * 適用される基準値を取得
   * - 複合時: 32%
   * - 非複合時: 48%
   */
  get standardLimit(): 32 | 48 {
    return this._isMixed ? 32 : 48
  }

  /**
   * 基準内かどうかを判定
   */
  get isWithinLimit(): boolean {
    return this._percentage <= this.standardLimit
  }

  /**
   * 警告レベルを取得
   * - safe: 32%以下
   * - warning: 32%超過48%以下（非複合時のみ）
   * - danger: 基準超過
   */
  get warningLevel(): WarningLevel {
    if (this._percentage <= 32) {
      return 'safe'
    }
    if (this._percentage <= 48 && !this._isMixed) {
      return 'warning'
    }
    return 'danger'
  }

  /**
   * 複合（異なるサイズの電線混在）かどうか
   */
  get hasMixedSizes(): boolean {
    return this._isMixed
  }
}
