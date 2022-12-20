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
    const cleared_state = {
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
    }
    setState({
      ...cleared_state
    })
  }

  // envia o state do rover 1 para o backlogs
  const backlog_rover1 = async () => {
    if (state.commands.length == 0) {
      return
    } else {
      const rover01 = {
        rover: 'rovers-01',
        ...state
      }
      const req_rover1 = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/backlogs',
        rover01
      )
    }
  }

  // envia o state do rover 2 para o backlogs
  const backlog_rover2 = async () => {
    if (state2.commands.length == 0) {
      return
    } else {
      const rover02 = {
        rover: 'rovers-02',
        ...state2
      }
      const req_rover2 = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/backlogs',
        rover02
      )
    }
  }

  return (
    <>
      <Container>
        <Title weight={700} align="center">
          Mars Rover
        </Title>
        <Text align="center" color={'gray'}>
          Já imaginou como seria controlar um{' '}
          <a href="https://pt.wikipedia.org/wiki/Astrom%C3%B3vel_marciano">
            rover
          </a>{' '}
          em um platô de Marte?
        </Text>
        <a
          href="https://data-provider.tk/rovers"
          target={'_blank'}
          style={{ textDecoration: 'none', color: 'inherit' }}
          rel="noreferrer"
        >
          <Button
            mt={16}
            mb={16}
            variant={'light'}
            radius={12}
            fullWidth
            leftIcon={
              <Image
                src="/svg/external-link.svg"
                alt="Left icon"
                width={15}
                height={15}
              />
            }
          >
            Ver a API do Backlog
          </Button>
        </a>

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
              interact_rover('L'), backlog_rover1()
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
              interact_rover('M'), backlog_rover1()
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
              interact_rover('R'), backlog_rover1()
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
              interact_rover2('L'), backlog_rover2()
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
              interact_rover2('M'), backlog_rover2()
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
              interact_rover2('R'), backlog_rover2()
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
