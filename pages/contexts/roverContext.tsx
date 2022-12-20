import React, { createContext, useState } from 'react'
import { State } from '../../typings.d'

export const APIContext = createContext({})

function APIContextProvider({ children }) {
  // Estado inicial do Rover
  const [state, setState] = useState<State>({
    commands: [],
    execute: false,
    facing: 'N',
    ghost: false,
    position: '0-0',
    startPosition: '00N',
    endPosition: '',
    path: { '0-0': 'N' },
    error: null,
    start: null,
    end: null
  })

  // // Estado inicial do segundo Rover
  const [state2, setState2] = useState<State>({
    commands: [],
    execute: false,
    facing: 'N',
    ghost: false,
    position: '0-0',
    startPosition: '00N',
    endPosition: '',
    path: { '0-0': 'N' },
    error: null,
    start: null,
    end: null
  })

  // Initial state of the grid
  const [grid, setGrid] = useState({
    size: 4
  })

  return (
    <APIContext.Provider value={{ state, setState, state2, setState2, grid, setGrid }}>{children}</APIContext.Provider>
  )
}

export default APIContextProvider
