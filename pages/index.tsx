import { useState } from 'react';
import { Entry } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
import { InView } from 'react-intersection-observer';
import { ArrowDown32, ArrowRight16, PlayFilledAlt32 } from '@carbon/icons-react';
import config from '@/config';
import { Merch, Post } from 'app/services/contentful';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import CardNews from 'components/CardNews';
import CardMerch from 'components/CardMerch';
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
      select: 'sys.id,sys.createdAt,fields.slug,fields.judul,fields.deskripsi,fields.thumbnail,fields.kategori',
      limit: 8,
    }),
    merchandises: await Merch.get({
      select: 'sys.id,fields.slug,fields.nama,fields.gambar',
      limit: 8,
    }),
  },
  revalidate: config.STATIC_PROPS_REVALIDATE_INTERVAL,
});

export default function Home({ news, merchandises }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isTeaserShow, setIsTeaserShow] = useState(false);

  return (
    <MainLayout>
      <header className="h-screen bg-primary-100 flex flex-col items-stretch">
        {isTeaserShow
          ? (
            <div className="flex-grow">
              <iframe
                title="teaserPkkmb"
                src="https://drive.google.com/file/d/1Ypxutia8LfYMU4DhVgGsHgQ19rVEnj-J/preview"
                width="100%"
                height="100%"
                allow="autoplay"
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

        <InView>
          {({ inView, ref }) => (
            <>
              <div
                ref={ref}
                className="overflow-hidden flex-shrink sm:px-3 py-4 flex flex-col"
              >
                <h1 className="my-2 font-bold leading-[.8] text-8xl text-gray-900">
                  <div className="overflow-hidden ">
                    <span
                      className={`block animate__animated ${inView ? 'animate__slideInUp' : 'translate-y-full'}`}
                    >
                      PKKMB UNS
                    </span>
                  </div>
                  <div className="overflow-hidden ">
                    <span
                      className={`block animate__animated ${inView ? 'animate__slideInUp' : 'translate-y-full'}`}
                      style={{ animationDelay: '.15s' }}
                    >
                      2021
                    </span>
                  </div>
                </h1>

                <div className="overflow-hidden">
                  <h2
                    className={`font-bold leading-snug tracking-wide text-5xl text-primary-900 animate__animated ${inView ? 'animate__slideInUp' : 'translate-y-full'}`}
                    style={{ animationDelay: '.25s' }}
                  >
                    CANDRADIMUKA
                  </h2>
                </div>
              </div>

              <div className="overflow-hidden flex flex-col">
                <ArrowDown32
                  className={`mx-8 text-brand-1 animate__animated ${inView ? 'animate__slideInDown' : '-translate-y-full'}`}
                  style={{ animationDelay: '.25s' }}
                />
              </div>
            </>
          )}
        </InView>

      </header>

      <PageSection title="Informasi Terbaru">
        <InView>
          {({ inView, ref }) => (
            <ul
              ref={ref}
              className="py-8 flex flex-col flex-nowrap gap-y-4"
            >
              {news.map((el, i) => (
                <li
                  key={el.sys.id}
                  className={`flex-shrink-0 animate__animated ${inView ? 'animate__slideInLeft' : '-translate-x-full'}`}
                  style={{ animationDelay: `${i * 0.1 + 0.05}s` }}
                >
                  <CardNews
                    title={el.fields.judul}
                    desc={el.fields.deskripsi}
                    slug={el.fields.slug}
                    thumbnailSrc={Post.resolveThumbnailUrl(el)}
                    meta={Post.resolveMeta(el)}
                  />
                </li>
              ))}
            </ul>
          )}
        </InView>

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
        <InView>
          {({ inView, ref }) => (
            <p
              ref={ref}
              className={`max-w-prose py-8 font-medium text-lg text-primary-900 animate__animated ${inView ? 'animate__slideInLeft' : '-translate-x-full'}`}
            >
              {content.Home.aboutPkkmb}
            </p>
          )}
        </InView>

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
        <InView>
          {({ inView, ref }) => (
            <ul
              ref={ref}
              className="grid grid-cols-3 auto-rows-fr gap-4 sm:gap-6"
            >
              {merchandises.map((el, i) => (
                <li
                  key={el.sys.id}
                  className="overflow-hidden"
                >
                  <CardMerch
                    name={el.fields.nama}
                    slug={el.fields.slug}
                    thumbnailSrc={Merch.resolveThumbnailUrl(el)}
                    className={`animate__animated ${inView ? 'animate__slideInUp' : '-translate-x-full'}`}
                    style={{ animationDelay: `${i * 0.1 + 0.05}s` }}
                  />
                </li>
              ))}
            </ul>
          )}
        </InView>

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

    </MainLayout>
  );
}
