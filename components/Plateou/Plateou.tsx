import { useContext } from 'react'
import { APIContext } from '../../pages/contexts/roverContext'
import { State, Context } from '../../typings.d'
import Rover from '../Rover/Rover'

export const Plateou = () => {
  const { state, state2, grid } = useContext<Context>(APIContext as React.Context<Context>)
  const { position, facing, error } = state

  const { position: position2, facing: facing2, error: error2 } = state2
  const { size } = grid

  const cells = []
  const path = state.path || {}
  const path2 = state2.path || {}

  // cria as celulas do grid
  for (let i = size; i >= 0; i--) {
    for (let j = 0; j < size; j++) {
      cells.push(i + '-' + j)
    }
  }

  return (
    <ul
      className="mars-plateau"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`
      }}
    >
      {cells.map((cell, index) => {
        let roverElm = null
        let roverPath = null

        let rover2Elm = null
        let rover2Path = null
        let cellStatus = ''

        // .end -- final da rota
        // .start -- inicio da rota
        // .error -- erro na rota
        // .path -- caminho da rota
        // .cell.path:before -- caminho da rota

        /* Rover 1 */
        // quando o rover chegou no final da rota
        if (cell === state.endPosition) {
          cellStatus = 'end'
        }
        // quando o rover estiver no inicio da rota
        if (cell === state.startPosition) {
          cellStatus = 'start'
        }
        // quando o rover chegar na borda ou colide
        if (state.error == true && cell === position) {
          cellStatus = 'error'
        }
        // mostra o caminho do rover
        if (position === cell) {
          roverElm = <Rover facing={facing} />
        } else if (path[cell] && state2.position !== cell) {
          roverPath = <Rover facing={path[cell]} ghost={true} />
        }

        /* Rover 2 */
        // quando o rover chegou no final da rota
        if (cell === state2.endPosition) {
          cellStatus = 'end'
        }

        // quando o rover estiver no inicio da rota
        if (cell === state2.startPosition) {
          cellStatus = 'start'
        }

        // quando o rover chegar na borda
        if (state2.error === true && cell === position2) {
          cellStatus = 'error'
        }

        // quando o rover 2 tentar passar por cima do rover 1
        if (state2.position === state.endPosition && state2.position === cell) {
          cellStatus = 'error'
        }

        // quando o rover1 estiver na mesma posição do rover2
        if (position2 === position) {
          rover2Elm = null
        } else if (position2 === cell) {
          rover2Elm = <Rover facing={facing2} />
        }

        // se o path e path2 forem iguais, não mostrar o path2
        else if (path2[cell] === path[cell]) {
          rover2Path = null
        } else if (path2[cell]) {
          rover2Path = <Rover facing={path2[cell]} ghost={true} />
        }

        return (
          <li key={index} className={`cell ${cellStatus}`}>
            <label className="cell-label">
              {`X${cell.split('-')[1]} Y${cell.split('-')[0]}`}
            </label>
            {roverElm || roverPath || rover2Elm || rover2Path}
          </li>
        )
      })}
    </ul>
  )
}
