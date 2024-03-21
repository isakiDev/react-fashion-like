import { type StateCreator } from 'zustand'

export interface UiSlice {
  isOpen: boolean
  toggleState: () => void
}

export const createUiSlice: StateCreator<UiSlice> = set => ({
  isOpen: false,

  toggleState: () => {
    set(state => ({ isOpen: !state.isOpen }))
  }
})
