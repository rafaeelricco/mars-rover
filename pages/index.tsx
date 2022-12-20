/* eslint-disable react-hooks/exhaustive-deps */

import axios from 'axios'
import Image from 'next/image'
import { useContext, useEffect } from 'react'

import {
  Autocomplete,
  Button,
  JsonInput,
  Slider,
  Text,
  Title
} from '@mantine/core'

import Mars from '../components/Mars/Mars'
import { APIContext } from './contexts/roverContext'

import {
  Container,
  ContainerCommands,
  ContainerExecution
} from '../styles/styles'
import Mars2 from '../components/Mars/Mars2'
import { Plateou } from '../components/Plateou/Plateou'
import { Context, State } from '../typings.d'

export default function HomePage() {
  const { state, state2, setState, setState2, grid, setGrid } =
    useContext<Context>(APIContext as React.Context<Context>)

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
      alert(
        'O comando inserido é inválido. Tenha certeza que você digitou L, R ou M.'
      )
      return
    } else {
      execute_command(state, command.split(''))
    }
  }

  // função que executa o comando
  const execute_command = (state: State, command: string[]): void => {
    const setStateFn = state === state2 ? setState2 : setState

    const cmd = [...command]

    cmd.forEach((command, index) => {
      setTimeout(() => {
        setStateFn({
          ...state,
          commands: [...state.commands, command]
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

  // cria um objeto com os comandos
  const state_json = JSON.stringify(
    [
      {
        backlog: {
          rovers: [
            {
              'rover-01': {
                ...state
              },
              'rovers-02': {
                ...state2
              }
            }
          ]
        }
      }
    ],
    null,
    2
  )

  return (
    <>
      <Container>
        <Title weight={700} align="center">
          Mars Rover
        </Title>
        <Text align="center" mb={16} color={'gray'}>
          Já imaginou como seria controlar um{' '}
          <a href="https://pt.wikipedia.org/wiki/Astrom%C3%B3vel_marciano">
            rover
          </a>{' '}
          em um platô de Marte?
        </Text>

        {/* Input para visualizar o backlog */}
        <JsonInput
          placeholder="Textarea will autosize to fit the content"
          value={state_json}
          variant="filled"
          radius={12}
          size="md"
          minRows={4}
        />

        {/* Slider para escolher o tamanho do grid */}
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

        {/* Mars Rover */}
        <Mars command={state.commands} />
        <Mars2 command2={state2.commands} />
        <Plateou />

        {/* Controles do primeiro Rover */}
        <ContainerExecution>
          <Autocomplete
            mt={16}
            type="text"
            radius={12}
            placeholder={state.commands as string}
            readOnly
            icon={
              <Image
                src="/svg/commands.svg"
                alt="commands icon"
                width={16}
                height={16}
              />
            }
            data={['RRRR', 'MMM', 'RMLM']}
            onItemSubmit={(e) => {
              interact_rover(e.value)
            }}
          />
        </ContainerExecution>
        <ContainerCommands>
          <Button
            radius={12}
            onClick={(e) => {
              interact_rover('L')
            }}
            leftIcon={
              <Image
                src="/svg/left.svg"
                alt="Left icon"
                width={16}
                height={16}
              />
            }
          >
            Left
          </Button>

          <Button
            onClick={(e) => {
              interact_rover('M')
            }}
            radius={12}
            leftIcon={
              <Image
                src="/svg/move.svg"
                alt="Left icon"
                width={15}
                height={15}
              />
            }
          >
            Move
          </Button>

          <Button
            onClick={(e) => {
              interact_rover('R')
            }}
            radius={12}
            leftIcon={
              <Image
                src="/svg/right.svg"
                alt="Right icon"
                width={16}
                height={16}
              />
            }
          >
            Right
          </Button>
        </ContainerCommands>

        {/* Controles do segundo Rover */}
        <ContainerExecution>
          <Autocomplete
            mt={16}
            type="text"
            placeholder={state2.commands as string}
            disabled={state.endPosition == ''}
            radius={12}
            readOnly
            icon={
              <Image
                src="/svg/commands.svg"
                alt="commands icon"
                width={16}
                height={16}
              />
            }
            data={['RRRR', 'MMM', 'RMLM']}
            onItemSubmit={(e) => {
              interact_rover2(e.value)
            }}
          />
        </ContainerExecution>
        <ContainerCommands>
          <Button
            radius={12}
            disabled={state.endPosition == ''}
            onClick={(e) => {
              interact_rover2('L')
            }}
            leftIcon={
              <Image
                src="/svg/left.svg"
                alt="Left icon"
                width={16}
                height={16}
              />
            }
          >
            Left
          </Button>

          <Button
            onClick={(e) => {
              interact_rover2('M')
            }}
            disabled={state.endPosition == ''}
            radius={12}
            leftIcon={
              <Image
                src="/svg/move.svg"
                alt="Left icon"
                width={15}
                height={15}
              />
            }
          >
            Move
          </Button>

          <Button
            onClick={(e) => {
              interact_rover2('R')
            }}
            disabled={state.endPosition == ''}
            radius={12}
            leftIcon={
              <Image
                src="/svg/right.svg"
                alt="Right icon"
                width={16}
                height={16}
              />
            }
          >
            Right
          </Button>
        </ContainerCommands>
        <Button
          mt={8}
          color={'red'}
          radius={12}
          onClick={clear_state}
          variant="outline"
          fullWidth
          leftIcon={
            <Image
              src="/svg/clean.svg"
              alt="Clear icon"
              width={16}
              height={16}
            />
          }
        >
          Clear
        </Button>
      </Container>
    </>
  )
}
