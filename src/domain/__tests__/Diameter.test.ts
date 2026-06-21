import { describe, it, expect } from 'vitest'
import { Diameter } from '../models/values/Diameter'

describe('Diameter', () => {
  describe('of', () => {
    it('正の値で直径を生成できる', () => {
      const diameter = Diameter.of(19.1)
      expect(diameter.mm).toBe(19.1)
    })

    it('0以下の値でエラーをスローする', () => {
      expect(() => Diameter.of(0)).toThrow('直径は正の値である必要があります')
      expect(() => Diameter.of(-1)).toThrow('直径は正の値である必要があります')
    })
  })

  describe('toArea', () => {
    it('直径から断面積を計算できる', () => {
      // 直径10mmの場合、半径5mm、面積 = π × 5² ≈ 78.54mm²
      const diameter = Diameter.of(10)
      const area = diameter.toArea()
      expect(area.mm2).toBeCloseTo(78.54, 1)
    })

    it('E管C19（内径19.1mm）の断面積を正しく計算できる', () => {
      // 内径19.1mm → 面積 = π × (19.1/2)² ≈ 286.5mm²
      const diameter = Diameter.of(19.1)
      const area = diameter.toArea()
      expect(area.mm2).toBeCloseTo(286.5, 0)
    })
  })

  describe('equals', () => {
    it('同じ値の直径は等しい', () => {
      const d1 = Diameter.of(19.1)
      const d2 = Diameter.of(19.1)
      expect(d1.equals(d2)).toBe(true)
    })

    it('異なる値の直径は等しくない', () => {
      const d1 = Diameter.of(19.1)
      const d2 = Diameter.of(25.0)
      expect(d1.equals(d2)).toBe(false)
    })
  })
})
