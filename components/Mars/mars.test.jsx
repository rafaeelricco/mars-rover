import { renderHook, render } from '@testing-library/react'
import APIContextProvider, { APIContext } from '../../pages/contexts/roverContext'

describe('Inirialize Context API', () => {
  const context = APIContext

  // test if context is rendering
  test('Context is rendering', () => {
    expect(context).toBeTruthy()
  })

  // test if is possible get values from context
  test('Get context values', () => {
    const { result } = renderHook(() => APIContextProvider, {
      wrapper: APIContextProvider
    })
    expect(result.current).toBeTruthy()
  })
})
