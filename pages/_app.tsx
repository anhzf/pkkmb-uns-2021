import {
  useState, useRef, useEffect, createContext,
} from 'react';
import { useRouter } from 'next/router';
import { Scrollbars } from 'react-custom-scrollbars';
import GlobalStyles from 'components/GlobalStyles';
import type { AppProps } from 'next/app';
import type { positionValues } from 'react-custom-scrollbars';
import 'styles/global.sass';

const scrollPositionDefaults: positionValues = {
  clientHeight: 0,
  clientWidth: 0,
  top: 0,
  left: 0,
  scrollWidth: 0,
  scrollTop: 0,
  scrollLeft: 0,
  scrollHeight: 0,
};

export const PageScrollContext = createContext(scrollPositionDefaults);

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(scrollPositionDefaults);
  const scrollbar = useRef<Scrollbars>(null);

  useEffect(() => {
    const routeChangeCompleteHandler = () => scrollbar.current?.scrollToTop();

    router.events.on('routeChangeComplete', routeChangeCompleteHandler);

    return () => router.events.off('routeChangeComplete', routeChangeCompleteHandler);
  }, [router.events]);

  return (
    <Scrollbars
      ref={scrollbar}
      autoHeight
      autoHeightMin="100vh"
      autoHide
      universal
      onScrollFrame={setScrollPosition}
    >
      <GlobalStyles />
      <PageScrollContext.Provider value={scrollPosition}>
        <Component {...pageProps} />
      </PageScrollContext.Provider>
    </Scrollbars>
  );
};

export default App;
