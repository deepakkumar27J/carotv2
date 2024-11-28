import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RotaLayout from '../pages/layout';


type AppPropsWithLayout = {
  Component: any;
  pageProps: any;
};


export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const noLayoutPages = ['/login', '/signup', '/forgot-password'];
  const useNoLayout = noLayoutPages.includes(pageProps?.pagePath || '');

  return useNoLayout ? (
    // Render the page with the logged-in layout
    <RotaLayout>
      <Component {...pageProps} />
    </RotaLayout>
  ): (
    // Render the page without a layout
    <Component {...pageProps} />
  );
}
