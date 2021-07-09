import '../styles/fonts.css';
import '../styles/style.sass';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import GlobalStyles from '../components/GlobalStyles';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
);

export default App;
