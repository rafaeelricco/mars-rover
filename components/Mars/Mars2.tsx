/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from 'react'
import { APIContext } from '../../pages/contexts/roverContext'
import { Plateou } from '../Plateou/Plateou'
import { State, Context, Left, Move, Right, Direction } from '../../typings.d'

const Mars = ({ command2 }: { command2: string[] | string }) => {
  const { state, state2, setState2, grid } = useContext<Context>(
    APIContext as React.Context<Context>
  )
  const { size } = grid

  const currentCommand = state2.commands[state2.commands.length - 1]

  useEffect(() => {
    if (currentCommand === 'L') {
      setState2({
        ...state2,
        facing: Left[state2.facing]
      })
    } else if (currentCommand === 'R') {
      setState2({
        ...state2,
        facing: Right[state2.facing]
      })
    } else if (currentCommand === 'M') {
      const [x, y] = state2.position.split('-').map(Number)
      const [dx, dy] = Move[state2.facing]
      const [nx, ny] = [x + dx, y + dy]
      const position = `${nx}-${ny}`
      const path = { ...state2.path, [position]: state2.facing }

      if (nx < 0 || nx > size || ny < 0 || ny > size - 1) {
        setState2({
          ...state2,
          error: true
        })
      } else if (state.position === position || state2.position === position) {
        setState2({
          ...state2,
          error: true
        })
      } else {
        setState2({
          ...state2,
          position,
          error: false,
          endPosition: position,
          path
        })
      }
    }
  }, [command2])

  return <></>
}

export default Mars
