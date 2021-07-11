import { Scrollbars } from 'react-custom-scrollbars';
import GlobalStyles from 'components/GlobalStyles';
import 'styles/global.sass';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
  <Scrollbars
    autoHeight
    autoHeightMin="100vh"
    autoHide
    universal
  >
    <GlobalStyles />
    <Component {...pageProps} />
  </Scrollbars>
);

export default App;
