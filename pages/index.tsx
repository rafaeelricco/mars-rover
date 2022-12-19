import Image from 'next/image'
import { useContext } from 'react'

import { Autocomplete, Button, JsonInput, Slider, Text, Title } from '@mantine/core'

import Mars from '../components/Mars/Mars'
import { APIContext } from './contexts/roverContext'

import { Container, ContainerCommands, ContainerExecution } from '../styles/styles'
import Mars2 from '../components/Mars/Mars2'
import { Plateou } from '../components/Plateou/Plateou'
import { Context, State } from '../typings.d'

export default function HomePage() {
  const { state, state2, setState, setState2, grid, setGrid } = useContext<Context>(APIContext as React.Context<Context>)

  // cria um objeto com os comandos
  const state_json = JSON.stringify(
    [
      {
        backlog: [
          {
            'rover-1': [
              {
                ...state
              }
            ]
          },
          {
            'rover-2': [
              {
                ...state2
              }
            ]
          }
        ]
      }
    ],
    null,
    2
  )

  // recebe o comando do rover 1
  const interact_rover = (command: string) => {
    process_command(state, command)
  }

  // recebe o comando do rover 2
  const interact_rover2 = (command: string) => {
    process_command(state2, command)
  }

  // função que processa o comando
  const process_command = (state: State, command: string) => {
    if (!/^[LRM]+$/.test(command)) {
      alert('O comando inserido é inválido. Tenha certeza que você digitou L, R ou M.')
      return
    } else {
      execute_command(state, command.split(''))
    }
  }

  // função que executa o comando
  const execute_command = (state: State, command: string[]) => {
    const Set = state === state2 ? setState2 : setState

    const cmd = [...command]
    cmd.forEach((command, index) => {
      setTimeout(() => {
        Set({
          ...state,
          commands: [...state.commands, command],
          execute: true
        })
      }, 1000 * index)
    })
  }

  // função que limpa todo o estado
  const clear_state = () => {
    setState({
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
    setState2({
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
  }

  return (
    <>
      <Container>
        <Title weight={700} align="center">
          Mars Rover
        </Title>
        <Text align="center" mt={8} mb={16} color={'gray'}>
          Já imaginou como seria controlar um <a href="https://pt.wikipedia.org/wiki/Astrom%C3%B3vel_marciano">rover</a> em um platô de Marte?
        </Text>

        <JsonInput placeholder="Textarea will autosize to fit the content" value={state_json} variant="filled" radius="md" size="md" minRows={4} />

        <Slider
          m={16}
          mb={32}
          step={2}
          min={2}
          max={8}
          defaultValue={4}
          onChange={(value) => {
            clear_state()
            setGrid({ size: value })
          }}
          marks={[
            { value: 2, label: '2x2' },
            { value: 4, label: '4x4' },
            { value: 6, label: '6x6' },
            { value: 8, label: '8x8' }
          ]}
        />

        <Mars command={state.commands} />
        <Mars2 command2={state2.commands} />
        <Plateou />

        {/* Primeiro Rover */}
        <ContainerExecution>
          <Autocomplete
            mt={16}
            type="text"
            placeholder={'Digite um comando e pressione enter. Ex: RMLM'}
            radius={'md'}
            icon={<Image src="/svg/commands.svg" alt="commands icon" width={16} height={16} />}
            data={['RRRR', 'MMM', 'RMLM']}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                interact_rover(e.currentTarget.value)
              }
            }}
          />
          <Button mt={16} color={'green'} radius={'md'} onClick={clear_state} variant="outline">
            Clear
          </Button>
        </ContainerExecution>
        <ContainerCommands>
          <Button
            radius={'md'}
            onClick={(e) => {
              interact_rover('L')
            }}
            leftIcon={<Image src="/svg/left.svg" alt="Left icon" width={16} height={16} />}
          >
            Left
          </Button>

          <Button
            onClick={(e) => {
              interact_rover('M')
            }}
            radius={'md'}
            leftIcon={<Image src="/svg/move.svg" alt="Left icon" width={15} height={15} />}
          >
            Move
          </Button>

          <Button
            onClick={(e) => {
              interact_rover('R')
            }}
            radius={'md'}
            leftIcon={<Image src="/svg/right.svg" alt="Right icon" width={16} height={16} />}
          >
            Right
          </Button>
        </ContainerCommands>

        {/* Segundo Rover */}
        <ContainerExecution>
          <Autocomplete
            mt={16}
            type="text"
            placeholder={'Digite um comando e pressione enter. Ex: RMLM'}
            disabled={state.endPosition == ''}
            radius={'md'}
            icon={<Image src="/svg/commands.svg" alt="commands icon" width={16} height={16} />}
            data={['RRRR', 'MMM', 'RMLM']}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                interact_rover2(e.currentTarget.value)
              }
            }}
          />
          <Button disabled={state.endPosition == ''} mt={16} color={'green'} radius={'md'} onClick={clear_state} variant="outline">
            Clear
          </Button>
        </ContainerExecution>
        <ContainerCommands>
          <Button
            radius={'md'}
            disabled={state.endPosition == ''}
            onClick={(e) => {
              interact_rover2('L')
            }}
            leftIcon={<Image src="/svg/left.svg" alt="Left icon" width={16} height={16} />}
          >
            Left
          </Button>

          <Button
            onClick={(e) => {
              interact_rover2('M')
            }}
            disabled={state.endPosition == ''}
            radius={'md'}
            leftIcon={<Image src="/svg/move.svg" alt="Left icon" width={15} height={15} />}
          >
            Move
          </Button>

          <Button
            onClick={(e) => {
              interact_rover2('R')
            }}
            disabled={state.endPosition == ''}
            radius={'md'}
            leftIcon={<Image src="/svg/right.svg" alt="Right icon" width={16} height={16} />}
          >
            Right
          </Button>
        </ContainerCommands>
      </Container>
    </>
  )
}
