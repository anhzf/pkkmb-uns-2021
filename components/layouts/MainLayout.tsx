import {
  useState, useMemo, useCallback, useEffect, useRef, FormEvent,
} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react';
import { Search32 } from '@carbon/icons-react';
// import client from 'app/services/contentful';
import BaseFooter from 'components/BaseFooter';
import styleNavbar from 'styles/components/navbar.module.sass';

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  title?: string | string[];
}

export default function MainLayout({ title, children, ...props }: Props) {
  const router = useRouter();
  const inputSearchElm = useRef<HTMLInputElement>(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pageTitle = useMemo(() => [
    ...(Array.isArray(title) ? title : [title]),
    'PKKMB UNS 2021',
  ].filter(Boolean).join(' - '), [title]);
  const onSearchSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push(`/search?q=${encodeURIComponent(inputSearchElm.current?.value || '')}`);
    },
    [],
  );

  useEffect(() => {
    const routeChangeStartHandler = () => setIsPageLoading(true);
    const routeChangeCompleteHandler = () => {
      setIsPageLoading(false);
      setIsMenuOpen(false);
    };

    router.events.on('routeChangeStart', routeChangeStartHandler);
    router.events.on('routeChangeComplete', routeChangeCompleteHandler);

    return () => {
      router.events.off('routeChangeStart', routeChangeStartHandler);
      router.events.off('routeChangeComplete', routeChangeCompleteHandler);
    };
  }, [router.events]);

  return (
    <div
      className="bg-brand-2 shadow-lg flex flex-col items-center"
      {...props}
    >
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="/site.webmanifest"
        />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta
          name="msapplication-TileColor"
          content="#da532c"
        />
        <meta
          name="theme-color"
          content="#ffffff"
        />
      </Head>

      <div className="fixed top-0 right-0 z-50 p-5">
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`h-14 p-3 ${isMenuOpen ? '' : 'bg-brand-1/20'} backdrop-blur rounded-full`}
        >
          <div className={isMenuOpen ? styleNavbar.hamburger_close : styleNavbar.hamburger} />
        </button>
      </div>

      <main className="overflow-hidden w-full max-w-screen-sm bg-yellow-50 shadow-xl flex flex-col items-stretch">
        <div className="relative w-full flex flex-col items-stretch animate__animated animate__slideInLeft">
          {children}
        </div>
      </main>

      <Transition
        as="nav"
        show={isMenuOpen}
        className="fixed inset-0"
      >
        <div className="relative overflow-y-auto w-full h-full flex flex-col items-stretch">
          <Transition.Child
            as="div"
            enter="delay-100 duration-1000"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="delay-[700ms] duration-1000"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="h-14 bg-primary-200 transition-transform"
          />

          <Link
            href="/"
            passHref
          >
            <Transition.Child
              as="a"
              enter="delay-200 duration-1000"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="delay-[600ms] duration-1000"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
              className="px-6 sm:px-12 py-4 sm:py-6 bg-primary-200 font-bold text-4xl sm:text-6xl text-gray-900 transition-all hover:text-white hover:bg-primary-400"
            >
              Beranda
            </Transition.Child>
          </Link>

          <Link
            href="/tentang"
            passHref
          >
            <Transition.Child
              as="a"
              enter="delay-300 duration-1000"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="delay-500 duration-1000"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
              className="px-6 sm:px-12 py-4 sm:py-6 bg-primary-200 font-bold text-4xl sm:text-6xl text-gray-900 transition-all hover:text-white hover:bg-primary-400"
            >
              Tentang
            </Transition.Child>
          </Link>

          <Link
            href="/postingan"
            passHref
          >
            <Transition.Child
              as="a"
              enter="delay-[400ms] duration-1000"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="delay-[400ms] duration-1000"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
              className="px-6 sm:px-12 py-4 sm:py-6 bg-primary-200 font-bold text-4xl sm:text-6xl text-gray-900 transition-all hover:text-white hover:bg-primary-400"
            >
              Berita
            </Transition.Child>
          </Link>

          <Link
            href="/toko"
            passHref
          >
            <Transition.Child
              as="a"
              enter="delay-500 duration-1000"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="delay-300 duration-1000"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
              className="px-6 sm:px-12 py-4 sm:py-6 bg-primary-200 font-bold text-4xl sm:text-6xl text-gray-900 transition-all hover:text-white hover:bg-primary-400"
            >
              Merchandise
            </Transition.Child>
          </Link>

          <Transition.Child
            as="div"
            enter="delay-[600ms] duration-1000"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="delay-200 duration-1000"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="flex-grow bg-primary-200 transition-transform"
          />

          <Transition.Child
            as="form"
            enter="delay-[700ms] duration-1000"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="delay-100 duration-1000"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="py-2 bg-primary-200 flex flex-col items-center transition-transform"
            onSubmit={onSearchSubmit}
          >
            <label
              htmlFor="navSearch"
              className=" w-full max-w-sm flex gap-x-3"
            >
              <input
                id="navSearch"
                ref={inputSearchElm}
                type="text"
                placeholder="Cari sesuatu..."
                required
                className="peer w-3/4 px-4 sm:px-8 py-2 sm:py-6 bg-transparent rounded-3xl text-2xl sm:text-3xl font-medium placeholder-primary-600 outline-none transition-colors focus:bg-blue-50 valid:bg-blue-50"
              />

              <button
                type="submit"
                className="px-6 flex justify-center items-center rounded-full text-primary-600 transition-colors hover:bg-primary-700/60 hover:text-white focus:outline-none focus:!bg-primary-100 peer-valid:bg-primary-800/60 peer-valid:text-white"
              >
                <Search32 />
              </button>
            </label>
          </Transition.Child>
        </div>
      </Transition>

      <BaseFooter className="max-w-screen-sm shadow-xl" />

      <Transition
        as="div"
        show={isPageLoading}
        enterFrom="translate-y-full"
        leaveTo="translate-y-full"
        className="fixed z-50 cursor-wait w-full max-w-screen-sm h-full bg-white/40 backdrop-blur flex flex-col justify-evenly items-center transition-transform"
      >
        <svg
          className="animate-spin h-10 w-10 text-primary-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </Transition>
    </div>
  );
}
