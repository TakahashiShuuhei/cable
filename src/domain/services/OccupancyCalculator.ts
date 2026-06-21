import { Area } from '../models/values/Area'
import { OccupancyRate } from '../models/values/OccupancyRate'

/**
 * 電線エントリ（計算用）
 */
export interface WireEntry {
  /** 電線1本あたりの断面積 */
  crossSectionArea: Area
  /** 本数 */
  quantity: number
}

/**
 * 占有率計算ドメインサービス
 */
export class OccupancyCalculator {
  /**
   * 電線の総断面積を計算
   */
  static calculateTotalWireArea(entries: WireEntry[]): Area {
    if (entries.length === 0) {
      return Area.zero()
    }

    let total = 0
    for (const entry of entries) {
      total += entry.crossSectionArea.mm2 * entry.quantity
    }

    return Area.of(total)
  }

  /**
   * 複合（異なるサイズの電線混在）かどうかを判定
   */
  static isMixedWires(entries: WireEntry[]): boolean {
    if (entries.length <= 1) {
      return false
    }

    const firstArea = entries[0].crossSectionArea
    return entries.some(entry => !entry.crossSectionArea.equals(firstArea))
  }

  /**
   * 占有率を計算
   * @param conduitArea 電線管の内断面積
   * @param entries 電線エントリのリスト
   */
  static calculate(conduitArea: Area, entries: WireEntry[]): OccupancyRate {
    // 電線がない場合は0%
    if (entries.length === 0) {
      return OccupancyRate.calculate(Area.zero(), conduitArea, false)
    }

    const totalWireArea = this.calculateTotalWireArea(entries)
    const isMixed = this.isMixedWires(entries)

    return OccupancyRate.calculate(totalWireArea, conduitArea, isMixed)
  }
}
