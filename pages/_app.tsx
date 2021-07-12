import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Scrollbars } from 'react-custom-scrollbars';
import GlobalStyles from 'components/GlobalStyles';
import 'styles/global.sass';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const scrollbar = useRef<Scrollbars>(null);

  useEffect(() => {
    const routeChangeCompleteHandler = () => scrollbar.current?.scrollToTop();

    router.events.on('routeChangeComplete', routeChangeCompleteHandler);

    return () => router.events.off('routeChangeComplete', routeChangeCompleteHandler);
  }, []);

  return (
    <Scrollbars
      ref={scrollbar}
      autoHeight
      autoHeightMin="100vh"
      autoHide
      universal
    >
      <GlobalStyles />
      <Component {...pageProps} />
    </Scrollbars>
  );
};

export default App;
