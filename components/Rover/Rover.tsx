import Image from 'next/image'

export default function MarsRover({ facing, ghost }: { facing: string; ghost?: boolean }) {
  return (
    <span className={`rover ${facing} ${ghost ? 'ghost' : ''} `}>
      <Image src="/svg/rover.svg" alt="Left icon" width={54} height={54} />
    </span>
  )
}
