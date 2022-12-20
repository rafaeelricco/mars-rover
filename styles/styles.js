import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  align-content: center;
  padding-left: 16px;
  padding-right: 16px;
  max-width: 960px;
  margin: 2rem auto;
  height: 100%;
  width: 100%;

  @media (max-width: 576px) {
    align-content: baseline;
    height: 100%;
    width: 100%;
    margin: 1.618rem 0 2.618rem 0;
  }
`

export const ContainerExecution = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: auto;
  gap: 0.5rem;
`

export const ContainerCommands = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 0.5rem;
  margin: 0.618rem 0 0.618rem 0;
`
