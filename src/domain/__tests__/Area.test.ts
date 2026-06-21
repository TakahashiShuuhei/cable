import { describe, it, expect } from 'vitest'
import { Area } from '../models/values/Area'
import { Diameter } from '../models/values/Diameter'

describe('Area', () => {
  describe('of', () => {
    it('正の値で面積を生成できる', () => {
      const area = Area.of(286.5)
      expect(area.mm2).toBe(286.5)
    })

    it('0は許可される（電線がない場合）', () => {
      const area = Area.of(0)
      expect(area.mm2).toBe(0)
    })

    it('負の値でエラーをスローする', () => {
      expect(() => Area.of(-1)).toThrow('面積は0以上である必要があります')
    })
  })

  describe('zero', () => {
    it('ゼロ面積を生成できる', () => {
      const area = Area.zero()
      expect(area.mm2).toBe(0)
    })
  })

  describe('fromDiameter', () => {
    it('直径から面積を計算できる', () => {
      const diameter = Diameter.of(10)
      const area = Area.fromDiameter(diameter)
      // π × 5² ≈ 78.54
      expect(area.mm2).toBeCloseTo(78.54, 1)
    })
  })

  describe('add', () => {
    it('面積を加算できる', () => {
      const a1 = Area.of(100)
      const a2 = Area.of(50)
      const result = a1.add(a2)
      expect(result.mm2).toBe(150)
    })
  })

  describe('multiply', () => {
    it('面積を乗算できる', () => {
      const area = Area.of(10)
      const result = area.multiply(3)
      expect(result.mm2).toBe(30)
    })

    it('0以下の乗数でエラーをスローする', () => {
      const area = Area.of(10)
      expect(() => area.multiply(0)).toThrow('乗数は正の値である必要があります')
      expect(() => area.multiply(-1)).toThrow('乗数は正の値である必要があります')
    })
  })

  describe('divideBy', () => {
    it('面積の割合を計算できる', () => {
      const wireArea = Area.of(100)
      const conduitArea = Area.of(400)
      // 100 / 400 = 0.25 (25%)
      expect(wireArea.divideBy(conduitArea)).toBe(0.25)
    })
  })

  describe('equals', () => {
    it('同じ値の面積は等しい', () => {
      const a1 = Area.of(286.5)
      const a2 = Area.of(286.5)
      expect(a1.equals(a2)).toBe(true)
    })

    it('誤差0.001mm²以内は等しいとみなす', () => {
      const a1 = Area.of(286.5)
      const a2 = Area.of(286.5005)
      expect(a1.equals(a2)).toBe(true)
    })

    it('異なる値の面積は等しくない', () => {
      const a1 = Area.of(286.5)
      const a2 = Area.of(490.9)
      expect(a1.equals(a2)).toBe(false)
    })
  })
})
