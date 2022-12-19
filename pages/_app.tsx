import { MantineProvider } from '@mantine/core'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/styles.css'
import APIContextProvider from './contexts/roverContext'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Mars Rover | App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <APIContextProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: 'system-ui, sans-serif',
            colorScheme: 'light'
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </APIContextProvider>
    </>
  )
}
