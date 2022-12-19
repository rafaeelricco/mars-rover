/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from 'react'
import { APIContext } from '../../pages/contexts/roverContext'
import { Plateou } from '../Plateou/Plateou'
import { State, Context, Left, Move, Right, Direction } from '../../typings.d'

const Mars = ({ command }: { command: string[] }) => {
  const { state, state2, setState, grid } = useContext<Context>(APIContext as React.Context<Context>)
  const { size } = grid

  const currentCommand = state.commands[state.commands.length - 1]

  useEffect(() => {
    if (currentCommand === 'L') {
      setState({
        ...state,
        facing: Left[state.facing]
      })
    } else if (currentCommand === 'R') {
      setState({
        ...state,
        facing: Right[state.facing]
      })
    } else if (currentCommand === 'M') {
      const [x, y] = state.position.split('-').map(Number)
      const [dx, dy] = Move[state.facing]
      const [nx, ny] = [x + dx, y + dy]
      const position = `${nx}-${ny}`
      const path = { ...state.path, [position]: state.facing }

      if (nx < 0 || nx > size || ny < 0 || ny > size - 1) {
        setState({
          ...state,
          error: true
        })
      } else if (state2.position === position) {
        setState({
          ...state,
          error: true
        })
      } else {
        setState({
          ...state,
          position,
          error: false,
          endPosition: position,
          path
        })
      }
    }
  }, [command])

  return <></>
}

export default Mars
