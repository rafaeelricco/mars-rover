import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  align-content: center;
  padding-left: 16px;
  padding-right: 16px;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100vh;
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
