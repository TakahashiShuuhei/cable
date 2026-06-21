import { describe, it, expect } from 'vitest'
import { OccupancyCalculator, WireEntry } from '../services/OccupancyCalculator'
import { Area } from '../models/values/Area'

describe('OccupancyCalculator', () => {
  describe('calculateTotalWireArea', () => {
    it('単一の電線の総断面積を計算できる', () => {
      const entries: WireEntry[] = [
        { crossSectionArea: Area.of(7.07), quantity: 3 }
      ]
      const total = OccupancyCalculator.calculateTotalWireArea(entries)
      expect(total.mm2).toBeCloseTo(21.21, 2)
    })

    it('複数種類の電線の総断面積を計算できる', () => {
      const entries: WireEntry[] = [
        { crossSectionArea: Area.of(10), quantity: 2 }, // 20
        { crossSectionArea: Area.of(5), quantity: 3 },  // 15
      ]
      const total = OccupancyCalculator.calculateTotalWireArea(entries)
      expect(total.mm2).toBe(35)
    })

    it('空の配列の場合は0を返す', () => {
      const total = OccupancyCalculator.calculateTotalWireArea([])
      expect(total.mm2).toBe(0)
    })
  })

  describe('isMixedWires', () => {
    it('単一の電線種類は複合ではない', () => {
      const entries: WireEntry[] = [
        { crossSectionArea: Area.of(7.07), quantity: 3 }
      ]
      expect(OccupancyCalculator.isMixedWires(entries)).toBe(false)
    })

    it('空の配列は複合ではない', () => {
      expect(OccupancyCalculator.isMixedWires([])).toBe(false)
    })

    it('同じ断面積の電線は複合ではない', () => {
      const entries: WireEntry[] = [
        { crossSectionArea: Area.of(7.07), quantity: 2 },
        { crossSectionArea: Area.of(7.07), quantity: 3 },
      ]
      expect(OccupancyCalculator.isMixedWires(entries)).toBe(false)
    })

    it('異なる断面積の電線は複合', () => {
      const entries: WireEntry[] = [
        { crossSectionArea: Area.of(7.07), quantity: 2 },
        { crossSectionArea: Area.of(11.34), quantity: 1 },
      ]
      expect(OccupancyCalculator.isMixedWires(entries)).toBe(true)
    })
  })

  describe('calculate', () => {
    it('E管C19にIV2.0を3本入れた場合の占有率を計算できる', () => {
      // IV2.0の断面積 ≈ 7.07mm²
      // E管C19の内断面積 ≈ 286.5mm²
      const conduitArea = Area.of(286.5)
      const entries: WireEntry[] = [
        { crossSectionArea: Area.of(7.07), quantity: 3 }
      ]

      const result = OccupancyCalculator.calculate(conduitArea, entries)

      // 21.21 / 286.5 × 100 ≈ 7.4%
      expect(result.percentage).toBeCloseTo(7.4, 0)
      expect(result.warningLevel).toBe('safe')
      expect(result.hasMixedSizes).toBe(false)
      expect(result.standardLimit).toBe(48)
    })

    it('複合時は32%基準が適用される', () => {
      const conduitArea = Area.of(100)
      const entries: WireEntry[] = [
        { crossSectionArea: Area.of(5), quantity: 2 },  // 10mm²
        { crossSectionArea: Area.of(10), quantity: 2 }, // 20mm²
      ]
      // 合計30mm² → 30%

      const result = OccupancyCalculator.calculate(conduitArea, entries)

      expect(result.percentage).toBe(30)
      expect(result.hasMixedSizes).toBe(true)
      expect(result.standardLimit).toBe(32)
      expect(result.warningLevel).toBe('safe') // 30%は32%以下なのでsafe
    })

    it('複合で32%超過はdanger', () => {
      const conduitArea = Area.of(100)
      const entries: WireEntry[] = [
        { crossSectionArea: Area.of(10), quantity: 2 },  // 20mm²
        { crossSectionArea: Area.of(20), quantity: 1 },  // 20mm²
      ]
      // 合計40mm² → 40%

      const result = OccupancyCalculator.calculate(conduitArea, entries)

      expect(result.percentage).toBe(40)
      expect(result.hasMixedSizes).toBe(true)
      expect(result.warningLevel).toBe('danger')
    })

    it('電線がない場合は0%', () => {
      const conduitArea = Area.of(286.5)
      const result = OccupancyCalculator.calculate(conduitArea, [])

      expect(result.percentage).toBe(0)
      expect(result.warningLevel).toBe('safe')
    })
  })
})
