import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/globals.css'; // Import your global styles

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}