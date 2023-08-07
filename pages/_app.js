import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useContext } from 'react'
import { AppContext } from '../contexts/app.context'
import {LocalStorageEventTarget} from '../utils/auth'
import { AppProvider } from '../contexts/app.context'
import 'tailwindcss/tailwind.css';
import NavHeader from '../component/NavHeader';

function MyApp({ Component, pageProps }) {
  const { reset } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
  }, [reset])

  return (
    <QueryClientProvider client={new QueryClient()}>
        <AppProvider>
        <NavHeader />
          <Component {...pageProps} />
        </AppProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
