import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { Merch } from 'app/services/contentful';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import CardMerch from 'components/CardMerch';
import { usePaginatedModels } from 'hooks/contentful';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { Entry } from 'contentful';
import type { MerchandiseEntry } from 'app/services/contentful';
import type { TuseModelFn } from 'hooks/contentful';
import styleBtn from 'styles/components/button.module.sass';

const fetchQuery = {
  select: 'sys.id,fields.nama,fields.harga,fields.gambar,fields.slug',
  limit: 10,
};

const fetcher = (q?: any) => Merch.get({ ...fetchQuery, ...q });

const useModel: TuseModelFn<MerchandiseEntry> = (key, q, opts) => useSWR([key, q], fetcher, opts);

export const getStaticProps: GetStaticProps<{merchandises: Entry<MerchandiseEntry>[]}> = async () => ({
  props: {
    merchandises: await fetcher(),
  },
});

export default function Toko({ merchandises }: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    dataPool, isLoading, isDone, next,
  } = usePaginatedModels(useModel, 'merchandises', fetchQuery, {
    poolInit: { 0: merchandises },
  });
  // force all ui to loading states (just for development)
  const [forceLoading] = useState(false);
  const merchList = useMemo(() => [
    ...(Object.values(dataPool)
      .flat().map((el) => (
        <li
          key={el.sys.id}
          className="h-[60vmin] max-h-96"
        >
          <CardMerch
            key={el.sys.id}
            name={el.fields.nama}
            price={Merch.formatPrice(el.fields.harga)}
            slug={el.fields.slug}
            thumbnailSrc={Merch.resolveThumbnailUrl(el)}
          />
        </li>
      ))),
    // skeleton
    ...Array.from(
      Array((forceLoading || isLoading) ? 3 : 0),
      (el, i) => <CardMerch.Loading key={i} />,
    ),
  ], [forceLoading, isLoading, dataPool]);

  return (
    <MainLayout title="Toko">
      <div className="p-10 pb-0">
        <h1 className="font-bold text-sm text-primary-900 uppercase">Toko</h1>
      </div>

      <PageSection title="Merchandise">
        <ul className="py-8 grid grid-cols-2 auto-rows-max gap-4">
          {merchList}
        </ul>

        <div className="p-4 flex justify-center">
          {isDone
            ? <span className="text-gray-400">Tidak ada yang dapat ditampilkan lagi 😁🙏</span>
            : (
              <button
                type="button"
                className={styleBtn.flat}
                onClick={next}
              >
                Muat lebih banyak
              </button>
            )}
        </div>
      </PageSection>
    </MainLayout>
  );
}
