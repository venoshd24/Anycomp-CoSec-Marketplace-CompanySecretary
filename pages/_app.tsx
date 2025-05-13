import Head from 'next/head';              
import type { AppProps } from 'next/app'; 
import { Provider } from 'react-redux';     
import { store } from '../store';          
import { CssBaseline } from '@mui/material';
import '../styles/globals.css';             

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Global <Head> tags applied to every page.
        - <title>: browser tab title
        - <meta name="description">: SEO description
        - <meta name="viewport">: ensures proper scaling on mobile devices
      */}
      <Head>
        <title>CoSec Marketplace (CompanySecretary)</title>
        <meta 
          name="description" 
          content="Browse top Company Secretary services on CoSec Marketplace." 
        />
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1" 
        />
      </Head>

      {/*
        Wrap the entire app in Redux <Provider> so any component
        can access the store via useSelector/useDispatch.
      */}
      <Provider store={store}>
        {/*
          CssBaseline applies a consistent, cross-browser
          CSS reset for Material UI components.
        */}
        <CssBaseline />

        {/*
          Render the active page. Next.js passes in
          the page’s component and its initial props.
        */}
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
