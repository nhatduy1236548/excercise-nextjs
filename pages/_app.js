import dynamic from 'next/dynamic';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useContext } from 'react';
import { AppContext } from '../contexts/app.context';
import { LocalStorageEventTarget } from '../utils/auth';
import { AppProvider } from '../contexts/app.context';
import 'tailwindcss/tailwind.css';
import NavHeader from '../component/NavHeader';
import Authprovider from '../component/Authprovider';

const NoSSRQueryClientProvider = dynamic(() => import('@tanstack/react-query').then(module => module.QueryClientProvider), { ssr: false });

function MyApp({ Component, pageProps }) {
  const { reset } = useContext(AppContext);

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset);
  }, [reset]);

  return (
    <NoSSRQueryClientProvider client={new QueryClient()}>  
        <AppProvider>
          <NavHeader />
            <Component {...pageProps} />
        </AppProvider>
    </NoSSRQueryClientProvider>
  );
}

export default MyApp;
