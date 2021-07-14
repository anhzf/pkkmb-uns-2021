import Image from 'next/image';
import Link from 'next/link';
import YouTube from 'react-youtube';
import { ArrowDown32, ArrowRight16 } from '@carbon/icons-react';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import CardMerch from 'components/CardMerch';
import CardNews from 'components/Home/CardNews';
import * as content from '@/content-data';
import styleBtn from 'styles/components/button.module.sass';

export default function Home() {
  return (
    <MainLayout>
      <header className="h-screen bg-primary-100 flex flex-col">
        <YouTube
          videoId="VHGBg3lAfbY"
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              controls: 0, loop: 1, showinfo: 0, rel: 0, modestbranding: 1, enablejsapi: 1,
            },
          }}
          containerClassName="flex-grow w-full bg-gray-200"
          onReady={(e) => process.env.NODE_ENV !== 'development' ?? e.target.playVideo()}
        />

        <div className="overflow-hidden flex-shrink sm:px-3 py-4 flex flex-col">
          <h1 className="my-2 font-bold leading-[.8] text-8xl text-gray-900">PKKMB UNS 2021</h1>
          <h2 className="font-bold leading-snug tracking-wide text-5xl text-primary-900">CANDRADIMUKA</h2>
        </div>

        {/* <div className="self-center w-12 h-12 bg-primary-darken-2 flex flex-col items-center">
            <div className={styles.arrowDown} />
          </div> */}

        <div className="self-center bg-primary-700 flex flex-col items-center">
          <ArrowDown32 className="text-white" />
        </div>
      </header>

      <PageSection title="Informasi Terbaru">
        <ul className="overflow-x-auto py-8 flex flex-nowrap gap-x-4">
          {Array.from(Array(5), (el, i) => (
            <li key={i}>
              <CardNews
                title="Skuyyy! ikut PKKMB dapet sertifikat lho!!"
                url="/postingan/lorem-keren!!"
                thumbnailSrc="https://picsum.photos/seed/picsum/200/300"
                meta={['Berita', '20 Agustus 2001']}
                className="w-max"
              />
            </li>
          ))}
        </ul>

        <div className="p-4">
          <Link href="/postingan">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styleBtn.base}>
              <span>Lihat semua</span>
              <ArrowRight16 className={styleBtn.__icon} />
            </a>
          </Link>
        </div>
      </PageSection>

      <PageSection
        title="Sekilas PKKMB UNS"
        className="bg-primary-100"
      >
        <p className="max-w-prose py-8 font-medium text-lg text-primary-900">{content.Home.aboutPkkmb}</p>

        <div className="p-4">
          <Link href="/tentang">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styleBtn.push}>
              <span>Pelajari lebih lanjut</span>
              <ArrowRight16 className={styleBtn.__icon} />
            </a>
          </Link>
        </div>
      </PageSection>

      <PageSection title="Merch">
        <ul className="overflow-x-auto py-8 flex flex-nowrap gap-x-4">
          {Array.from(Array(5), (el, i) => (
            <li key={i}>
              <CardMerch
                name="Geprek Sehat"
                price="10k"
                thumbnailSrc="https://picsum.photos/seed/picsum/200/300"
                className="!w-72 !h-96"
              />
            </li>
          ))}
        </ul>

        <div className="p-4">
          <Link href="/toko">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styleBtn.base}>
              <span>Lihat lebih banyak</span>
              <ArrowRight16 className={styleBtn.__icon} />
            </a>
          </Link>
        </div>
      </PageSection>

      <PageSection
        title="Galeri"
        bgDark
        className="bg-primary-800"
      >
        <div className="grid grid-cols-12 auto-rows-[5rem] gap-2">
          <div className="relative col-span-6 row-span-4">
            <Image
              src="https://picsum.photos/seed/picsum/200/300"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="relative col-span-6 row-span-3">
            <Image
              src="https://picsum.photos/seed/picsum/200/300"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="relative col-span-6 row-span-3">
            <Image
              src="https://picsum.photos/seed/picsum/200/300"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="relative col-span-6 row-span-4">
            <Image
              src="https://picsum.photos/seed/picsum/200/300"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="relative col-span-3 row-span-2">
            <Image
              src="https://picsum.photos/seed/picsum/200/300"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="relative col-span-3 row-span-2">
            <Image
              src="https://picsum.photos/seed/picsum/200/300"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="relative col-span-12 row-span-3">
            <Image
              src="https://picsum.photos/seed/picsum/200/300"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </PageSection>
    </MainLayout>
  );
}
