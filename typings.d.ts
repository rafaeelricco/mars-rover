export enum Direction {
  North = 'N',
  West = 'W',
  South = 'S',
  East = 'E'
}

export const Move = {
  [Direction.South]: [0, -1],
  [Direction.West]: [-1, 0],
  [Direction.North]: [0, 1],
  [Direction.East]: [1, 0]
}

export const Left = {
  [Direction.North]: Direction.West,
  [Direction.West]: Direction.South,
  [Direction.South]: Direction.East,
  [Direction.East]: Direction.North
}

export const Right = {
  [Direction.North]: Direction.East,
  [Direction.East]: Direction.South,
  [Direction.South]: Direction.West,
  [Direction.West]: Direction.North
}

// tipagem do estado
interface State {
  commands: string[]
  execute: boolean
  facing: string
  ghost: boolean
  position: string
  startPosition: string
  endPosition: string
  path: { [key: string]: string }
  error: null | boolean
  start: null | Date
  end: null | Date
}

// tipagem do plateau
interface Grid {
  size: number
}

// tipagem do contexto
interface Context {
  state: State
  state2: State
  grid: Grid

  setState: (state: State) => void
  setState2: (state: State) => void
  setGrid: (grid: Grid) => void

  prevState: () => void
  prevState2: () => void
}

export type { State, Context }
