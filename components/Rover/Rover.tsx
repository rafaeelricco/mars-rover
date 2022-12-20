import Image from 'next/image'
import { useContext } from 'react'
import { APIContext } from '../../pages/contexts/roverContext'
import { Context, State } from '../../typings.d'

export default function MarsRover({ facing, ghost }: { facing: string; ghost?: boolean }) {
  const { grid } = useContext<Context>(APIContext as React.Context<Context>)

  const size_rover = grid.size == 2 ? 54 : grid.size == 4 ? 44 : grid.size == 6 ? 34 : grid.size == 8 ? 24 : 14

  return (
    <span className={`rover ${facing} ${ghost ? 'ghost' : ''} `}>
      <Image
        src="/svg/rover.svg"
        alt="Left icon"
        width={size_rover}
        height={size_rover}
      />
    </span>
  )
}
