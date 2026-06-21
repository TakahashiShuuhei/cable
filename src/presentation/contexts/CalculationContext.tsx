import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { Area } from '@domain/models/values/Area'
import { OccupancyCalculator, type WireEntry } from '@domain/services/OccupancyCalculator'
import { type OccupancyRate } from '@domain/models/values/OccupancyRate'
import { getConduitSize, type ConduitSize } from '@infrastructure/data/conduits'
import { getWireSpec, type WireSpec } from '@infrastructure/data/wires'
import { addHistoryItem } from '@infrastructure/repositories/storage'
import { extractShareDataFromUrl, type ShareData } from '@infrastructure/sharing/sharing'

/**
 * 選択された電線
 */
export interface SelectedWire {
  id: string
  wireSpecId: string
  wireSpec: WireSpec
  quantity: number
}

interface CalculationState {
  conduitSizeId: string | null
  conduitSize: ConduitSize | null
  wires: SelectedWire[]
  result: OccupancyRate | null
}

interface CalculationContextType {
  state: CalculationState
  setConduit: (sizeId: string) => void
  addWire: (wireSpecId: string, quantity: number) => void
  removeWire: (id: string) => void
  updateWireQuantity: (id: string, quantity: number) => void
  clearAll: () => void
  saveToHistory: () => void
  restoreFromShareData: (data: ShareData) => boolean
}

const CalculationContext = createContext<CalculationContextType | undefined>(undefined)

function calculateResult(
  conduitSize: ConduitSize | null,
  wires: SelectedWire[]
): OccupancyRate | null {
  if (!conduitSize || wires.length === 0) {
    return null
  }

  const conduitArea = Area.of(conduitSize.innerArea)
  const entries: WireEntry[] = wires.map((w) => ({
    crossSectionArea: Area.of(w.wireSpec.crossSectionArea),
    quantity: w.quantity,
  }))

  return OccupancyCalculator.calculate(conduitArea, entries)
}

export function CalculationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CalculationState>({
    conduitSizeId: null,
    conduitSize: null,
    wires: [],
    result: null,
  })

  const setConduit = useCallback((sizeId: string) => {
    const size = getConduitSize(sizeId)
    if (!size) return

    setState((prev) => {
      const newState = {
        ...prev,
        conduitSizeId: sizeId,
        conduitSize: size,
      }
      return {
        ...newState,
        result: calculateResult(size, prev.wires),
      }
    })
  }, [])

  const addWire = useCallback((wireSpecId: string, quantity: number) => {
    const spec = getWireSpec(wireSpecId)
    if (!spec || quantity < 1) return

    const newWire: SelectedWire = {
      id: crypto.randomUUID(),
      wireSpecId,
      wireSpec: spec,
      quantity,
    }

    setState((prev) => {
      const newWires = [...prev.wires, newWire]
      return {
        ...prev,
        wires: newWires,
        result: calculateResult(prev.conduitSize, newWires),
      }
    })
  }, [])

  const removeWire = useCallback((id: string) => {
    setState((prev) => {
      const newWires = prev.wires.filter((w) => w.id !== id)
      return {
        ...prev,
        wires: newWires,
        result: calculateResult(prev.conduitSize, newWires),
      }
    })
  }, [])

  const updateWireQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return

    setState((prev) => {
      const newWires = prev.wires.map((w) =>
        w.id === id ? { ...w, quantity } : w
      )
      return {
        ...prev,
        wires: newWires,
        result: calculateResult(prev.conduitSize, newWires),
      }
    })
  }, [])

  const clearAll = useCallback(() => {
    setState({
      conduitSizeId: null,
      conduitSize: null,
      wires: [],
      result: null,
    })
  }, [])

  const saveToHistory = useCallback(() => {
    if (!state.conduitSizeId || state.wires.length === 0 || !state.result) {
      return
    }

    addHistoryItem({
      conduitSizeId: state.conduitSizeId,
      wireEntries: state.wires.map((w) => ({
        wireSpecId: w.wireSpecId,
        quantity: w.quantity,
      })),
      result: {
        percentage: state.result.percentage,
        standardLimit: state.result.standardLimit,
        warningLevel: state.result.warningLevel,
        hasMixedSizes: state.result.hasMixedSizes,
      },
    })
  }, [state])

  const restoreFromShareData = useCallback((data: ShareData): boolean => {
    const size = getConduitSize(data.conduitSizeId)
    if (!size) return false

    const wires: SelectedWire[] = []
    for (const entry of data.wireEntries) {
      const spec = getWireSpec(entry.wireSpecId)
      if (spec) {
        wires.push({
          id: crypto.randomUUID(),
          wireSpecId: entry.wireSpecId,
          wireSpec: spec,
          quantity: entry.quantity,
        })
      }
    }

    setState({
      conduitSizeId: data.conduitSizeId,
      conduitSize: size,
      wires,
      result: calculateResult(size, wires),
    })
    return true
  }, [])

  // URL起動時の自動復元
  useEffect(() => {
    const shareData = extractShareDataFromUrl()
    if (shareData) {
      restoreFromShareData(shareData)
      // URLパラメータをクリア（履歴を汚さない）
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [restoreFromShareData])

  return (
    <CalculationContext.Provider
      value={{
        state,
        setConduit,
        addWire,
        removeWire,
        updateWireQuantity,
        clearAll,
        saveToHistory,
        restoreFromShareData,
      }}
    >
      {children}
    </CalculationContext.Provider>
  )
}

export function useCalculation() {
  const context = useContext(CalculationContext)
  if (!context) {
    throw new Error('useCalculation must be used within CalculationProvider')
  }
  return context
}
