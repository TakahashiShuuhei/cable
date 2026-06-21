import { describe, it, expect } from 'vitest'
import { OccupancyRate } from '../models/values/OccupancyRate'
import { Area } from '../models/values/Area'

describe('OccupancyRate', () => {
  describe('calculate', () => {
    it('占有率を正しく計算できる', () => {
      // 電線面積100mm²、管内面積400mm² → 25%
      const wireArea = Area.of(100)
      const conduitArea = Area.of(400)
      const rate = OccupancyRate.calculate(wireArea, conduitArea, false)
      expect(rate.percentage).toBeCloseTo(25, 1)
    })

    it('E管C19にIV2.0を3本入れた場合の計算', () => {
      // IV2.0外径3.0mm → 断面積 ≈ 7.07mm² × 3本 = 21.21mm²
      // E管C19内断面積 ≈ 286.5mm²
      // 占有率 = 21.21 / 286.5 × 100 ≈ 7.4%
      const wireArea = Area.of(21.21)
      const conduitArea = Area.of(286.5)
      const rate = OccupancyRate.calculate(wireArea, conduitArea, false)
      expect(rate.percentage).toBeCloseTo(7.4, 0)
    })
  })

  describe('standardLimit', () => {
    it('非複合時は48%基準', () => {
      const rate = OccupancyRate.calculate(Area.of(100), Area.of(400), false)
      expect(rate.standardLimit).toBe(48)
    })

    it('複合時は32%基準', () => {
      const rate = OccupancyRate.calculate(Area.of(100), Area.of(400), true)
      expect(rate.standardLimit).toBe(32)
    })
  })

  describe('isWithinLimit', () => {
    it('32%以下は常に基準内', () => {
      const rate = OccupancyRate.calculate(Area.of(30), Area.of(100), false)
      expect(rate.isWithinLimit).toBe(true)
    })

    it('非複合で48%以下は基準内', () => {
      const rate = OccupancyRate.calculate(Area.of(45), Area.of(100), false)
      expect(rate.isWithinLimit).toBe(true)
    })

    it('非複合で48%超過は基準外', () => {
      const rate = OccupancyRate.calculate(Area.of(50), Area.of(100), false)
      expect(rate.isWithinLimit).toBe(false)
    })

    it('複合で32%超過は基準外', () => {
      const rate = OccupancyRate.calculate(Area.of(35), Area.of(100), true)
      expect(rate.isWithinLimit).toBe(false)
    })
  })

  describe('warningLevel', () => {
    it('32%以下はsafe', () => {
      const rate = OccupancyRate.calculate(Area.of(30), Area.of(100), false)
      expect(rate.warningLevel).toBe('safe')
    })

    it('非複合で32%超過48%以下はwarning', () => {
      const rate = OccupancyRate.calculate(Area.of(40), Area.of(100), false)
      expect(rate.warningLevel).toBe('warning')
    })

    it('非複合で48%超過はdanger', () => {
      const rate = OccupancyRate.calculate(Area.of(50), Area.of(100), false)
      expect(rate.warningLevel).toBe('danger')
    })

    it('複合で32%超過はdanger', () => {
      const rate = OccupancyRate.calculate(Area.of(35), Area.of(100), true)
      expect(rate.warningLevel).toBe('danger')
    })
  })

  describe('hasMixedSizes', () => {
    it('複合フラグを正しく返す', () => {
      const mixed = OccupancyRate.calculate(Area.of(30), Area.of(100), true)
      const notMixed = OccupancyRate.calculate(Area.of(30), Area.of(100), false)
      expect(mixed.hasMixedSizes).toBe(true)
      expect(notMixed.hasMixedSizes).toBe(false)
    })
  })
})
