import { store } from '@/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './../context/authContext';




export default function App({ Component, pageProps }: AppProps) {
  return <AuthProvider><Provider store={store}>  <Component {...pageProps} /> <Analytics /></Provider></AuthProvider>
}
