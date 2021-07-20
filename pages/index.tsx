import { useState } from 'react';
import { Entry } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
import Scrollbars from 'react-custom-scrollbars';
import { ArrowDown32, ArrowRight16, PlayFilledAlt32 } from '@carbon/icons-react';
import { Merch, Post } from 'app/services/contentful';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import { HorizontalThumb } from 'components/Scrollbar';
import CardMerch from 'components/CardMerch';
import CardNews from 'components/Home/CardNews';
import * as content from '@/content-data';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { PostEntry, MerchandiseEntry } from 'app/services/contentful';
import styleBtn from 'styles/components/button.module.sass';

interface StaticProps {
  news: Entry<PostEntry>[];
  merchandises: Entry<MerchandiseEntry>[];
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => ({
  props: {
    news: await Post.get({
      select: 'sys.id,sys.createdAt,fields.slug,fields.judul,fields.thumbnail,fields.kategori',
      limit: 8,
    }),
    merchandises: await Merch.get({
      select: 'sys.id,fields.slug,fields.nama,fields.harga,fields.gambar',
      limit: 8,
    }),
  },
});

export default function Home({ news, merchandises }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isTeaserShow, setIsTeaserShow] = useState(false);

  return (
    <MainLayout>
      <header className="h-screen bg-primary-100 flex flex-col items-stretch">
        {isTeaserShow
          ? (
            <div className="flex-grow ">
              <iframe
                title="teaserPkkmb"
                id="ytplayer"
                src="https://www.youtube.com/embed/VHGBg3lAfbY?autoplay=1&controls=0&loop=1&modestbranding=1&iv_load_policy=3"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="bg-gray-300"
              />
            </div>
          ) : (
            <button
              type="button"
              className="flex-grow group relative"
              onClick={() => setIsTeaserShow(true)}
            >
              <Image
                src="/img/teaser-poster.jpg"
                layout="fill"
                objectFit="cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-600/30 to-transparent outline-none origin-bottom scale-y-50 transition-transform group-hover:scale-y-100" />

              <div className="absolute inset-1/2 w-max flex justify-center items-center rounded-full shadow -translate-x-1/2 -translate-y-1/2">
                <PlayFilledAlt32
                  width={64}
                  height={64}
                  className="text-primary-600/80 transition-colors group-hover:text-white/80"
                />
              </div>
            </button>
          )}

        <div className="overflow-hidden flex-shrink sm:px-3 py-4 flex flex-col">
          <h1 className="my-2 font-bold leading-[.8] text-8xl text-gray-900">PKKMB UNS 2021</h1>
          <h2 className="font-bold leading-snug tracking-wide text-5xl text-primary-900">CANDRADIMUKA</h2>
        </div>

        <div className="self-center bg-primary-700 flex flex-col items-center">
          <ArrowDown32 className="text-white" />
        </div>
      </header>

      <PageSection title="Informasi Terbaru">
        <Scrollbars
          universal
          autoHeight
          autoHeightMax="unset"
          renderThumbHorizontal={(props) => <HorizontalThumb {...props} />}
          renderView={(props) => (
            <ul
              className="py-8 flex flex-nowrap gap-x-4"
              {...props}
            />
          )}
        >
          {news.map((el) => (
            <li
              key={el.sys.id}
              className="flex-shrink-0"
            >
              <CardNews
                title={el.fields.judul}
                slug={el.fields.slug}
                thumbnailSrc={Post.resolveThumbnailUrl(el)}
                meta={Post.resolveMeta(el)}
                className="w-max"
              />
            </li>
          ))}
        </Scrollbars>

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
        <Scrollbars
          universal
          autoHeight
          autoHeightMax="unset"
          renderThumbHorizontal={(props) => <HorizontalThumb {...props} />}
          renderView={(props) => (
            <ul
              className="overflow-x-auto py-8 flex flex-nowrap gap-x-4"
              {...props}
            />
          )}
        >
          {merchandises.map((el) => (
            <li key={el.sys.id}>
              <CardMerch
                name={el.fields.nama}
                price={Merch.formatPrice(el.fields.harga)}
                slug={el.fields.slug}
                thumbnailSrc={Merch.resolveThumbnailUrl(el)}
                className="!w-72 !h-96"
              />
            </li>
          ))}
        </Scrollbars>

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
