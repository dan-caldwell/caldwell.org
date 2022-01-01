import type { AppProps } from 'next/app';
import LeftSidebarLayout from '../components/layouts/LeftSidebarLayout';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {

  return (
    <LeftSidebarLayout>
      <Component {...pageProps} />
    </LeftSidebarLayout>
  )
}

export default App;
