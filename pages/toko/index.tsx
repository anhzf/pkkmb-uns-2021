import { useState, useMemo } from 'react';
import { InView } from 'react-intersection-observer';
import { Merch } from 'app/services/contentful';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import CardMerch from 'components/CardMerch';
import { usePaginatedMerch } from 'hooks/contentful';
import styleBtn from 'styles/components/button.module.sass';

const fetchQuery = {
  select: 'sys.id,fields.nama,fields.harga,fields.gambar,fields.slug',
  limit: 10,
};

export default function Toko() {
  const [devState] = useState({
    forceLoading: false,
  });
  const {
    dataPool, isLoading, isDone, next,
  } = usePaginatedMerch(fetchQuery);
  // force all ui to loading states (just for development)
  const merchList = useMemo(() => [
    ...(Object.values(dataPool)
      .flat().map((el) => (
        <CardMerch
          key={el.sys.id}
          name={el.fields.nama}
          slug={el.fields.slug}
          thumbnailSrc={Merch.resolveThumbnailUrl(el)}
        />
      ))),
    // skeleton
    ...Array.from(
      Array((devState.forceLoading || isLoading) ? 3 : 0),
      (el, i) => <CardMerch.Loading key={i} />,
    ),
  ], [devState.forceLoading, isLoading, dataPool]);

  return (
    <MainLayout title="Toko">
      <div className="p-10 pb-0">
        <h1 className="font-bold text-sm text-primary-900 uppercase">Toko</h1>
      </div>

      <PageSection
        title="Merchandise"
        triggerTitleAnimationOnce
      >
        <InView triggerOnce>
          {({ inView, ref }) => (
            <ul
              ref={ref}
              className="py-8 grid grid-cols-3 auto-rows-max gap-6"
            >
              {merchList.map((el, i) => (
                <li
                  key={el.key}
                  className={`animate__animated ${inView ? 'animate__slideInUp' : 'translate-y-full'}`}
                  style={{ animationDelay: `${i * 0.1 + 0.05}s` }}
                >
                  {el}
                </li>
              ))}
            </ul>
          )}
        </InView>

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
