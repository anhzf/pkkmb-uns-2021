import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import tw from 'twin.macro';
import { InView } from 'react-intersection-observer';
import Scrollbars from 'react-custom-scrollbars';
import { SiWhatsapp } from 'react-icons/si';
import { ArrowLeft16 } from '@carbon/icons-react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Merch } from 'app/services/contentful';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import { HorizontalThumb } from 'components/Scrollbar';
import * as TableSpecs from 'components/Toko/TableSpecs';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import type { Entry } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import type { MerchandiseEntry } from 'app/services/contentful';
import styleBtn from 'styles/components/button.module.sass';

const STATIC_PROPS_REVALIDATE_INTERVAL = 1000 * 60 * 30; // 30 minutes

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await Merch.getAllSlug();

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  merch: Entry<MerchandiseEntry>;
}, {
  slug: string
}> = async ({ params }) => {
  if (typeof params?.slug === 'string') {
    const merch = await Merch.getBySlug(params?.slug!);

    return {
      props: { merch },
      revalidate: STATIC_PROPS_REVALIDATE_INTERVAL,
    };
  }

  return {
    notFound: true,
  };
};

const Label = tw.a`px-4 py-2 bg-primary-300 text-yellow-50 rounded-full`;

export default function MerchDetail({ merch }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

  return (
    <MainLayout title={merch.fields.nama}>
      <div className="p-10 pb-0">
        <h1 className="font-bold text-sm text-primary-900 uppercase">TOKO</h1>
      </div>

      <PageSection
        title={merch.fields.nama}
        triggerTitleAnimationOnce
      >
        <div className="relative">
          <Scrollbars
            universal
            autoHeight
            autoHeightMax="70vh"
            renderThumbHorizontal={(props) => <HorizontalThumb {...props} />}
            renderView={({ style, ...props }) => (
              <ul
                className="px-2 py-4 flex flex-row flex-no-wrap gap-x-4"
                style={{ ...style, scrollSnapType: 'x mandatory' }}
                {...props}
              />
            )}
          >
            {Merch.resolveThumbnailsUrl(merch).map((el, i) => (
              <InView
                key={el}
                threshold={1}
                as="li"
                className="flex-shrink-0 w-96 h-full"
                style={{ scrollSnapAlign: 'center' }}
                onChange={(inView) => inView && setCurrentSlideIndex(i + 1)}
              >
                <div className="relative aspect-w-10 aspect-h-7 w-full h-full">
                  <Image
                    src={el}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </InView>
            ))}
          </Scrollbars>

          <span className="absolute left-0 bottom-0 my-4 px-3 py-2 bg-gray-800/80 text-white shadow backdrop-blur-sm">
            {currentSlideIndex}
            /
            {merch.fields.gambar.length}
          </span>
        </div>

        <div className="px-4 py-6 border-b border-gray-200 flex justify-between">
          <span className="font-bold text-2xl text-primary-200">
            Rp
            {' '}
            {Merch.formatPrice(merch.fields.harga)}
          </span>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className={`${styleBtn.push} !bg-brand-2 !text-gray-900 hover:!bg-primary-100`}
          >
            <SiWhatsapp />
            <span className="font-bold">PESAN SEKARANG</span>
          </a>
        </div>

        <div className="px-4 pb-10 border-b border-gray-200 flex flex-col gap-y-10">
          <div
            className="prose-sm flex flex-col text-gray-700 whitespace-pre-line tracking-wide"
            dangerouslySetInnerHTML={{ __html: documentToHtmlString(merch.fields.deskripsi as Document) }}
          />

          <div className="flex">
            {merch.fields.tags.map((el) => (
              <Link
                key={el}
                href={`/toko?tags=${encodeURIComponent(el)}`}
                passHref
              >
                <Label>{el}</Label>
              </Link>
            ))}
          </div>

          <table>
            <tbody>
              {Object.entries(merch.fields.spesifikasi).map(([key, val]) => (
                <tr key={key}>
                  <TableSpecs.TH>{key}</TableSpecs.TH>
                  <TableSpecs.TD>
                    {Array.isArray(val) ? (
                      <ul className="list-disc list-inside">
                        {val.map((el) => <li key={el}>{el}</li>)}
                      </ul>
                    ) : JSON.stringify(val).replace(/[{"}]/g, '')}
                  </TableSpecs.TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4">
          <Link href="/toko">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styleBtn.base}>
              <ArrowLeft16 className={styleBtn.__icon_hoverToLeft} />
              <span>Lihat barang lainnya</span>
            </a>
          </Link>
        </div>
      </PageSection>
    </MainLayout>
  );
}
