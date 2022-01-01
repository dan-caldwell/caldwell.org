import type { AppProps } from 'next/app';
import DefaultLayout from '../components/layouts/DefaultLayout';
import NavProvider from '../context/NavContext';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <NavProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </NavProvider>
  )
}

export default App;
