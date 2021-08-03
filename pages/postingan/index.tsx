import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import Scrollbars from 'react-custom-scrollbars';
import { InView } from 'react-intersection-observer';
import { Post } from 'app/services/contentful';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import CardNews from 'components/CardNews';
import { HorizontalThumb } from 'components/Scrollbar';
import Skeleton from 'components/Skeleton';
import * as Category from 'components/Postingan/Category';
import { usePaginatedPosts } from 'hooks/contentful';
import styleBtn from 'styles/components/button.module.sass';

const createQuery = (kategori?: string) => ({
  select: 'sys.id,sys.createdAt,fields.slug,fields.judul,fields.deskripsi,fields.thumbnail,fields.kategori',
  limit: 10,
  fields: { kategori },
});

export default function Postingan() {
  const router = useRouter();
  const [devState] = useState({
    forceLoading: false,
  });
  const query = useMemo(
    () => createQuery(router.query.kategori as string | undefined),
    [router.query],
  );
  const isMatchCategory = useCallback(
    (name: any) => router.query.kategori === name,
    [router.query],
  );
  const {
    dataPool, next: nextPage, isDone, isLoading,
  } = usePaginatedPosts(query);
  const posts = useMemo(
    () => Object.values(dataPool).flat(),
    [dataPool],
  );
  const categories = useMemo(
    () => Array.from(new Set(posts ? Post.getCategories(posts) : [])),
    [posts],
  );
  const postList = useMemo(() => [
    ...(posts
      .filter((el) => (router.query.kategori ? isMatchCategory(el.fields.kategori) : true))
      .map((el) => (
        <CardNews
          key={el.sys.id}
          title={el.fields.judul}
          desc={el.fields.deskripsi}
          thumbnailSrc={Post.resolveThumbnailUrl(el)}
          slug={el.fields.slug}
          meta={Post.resolveMeta(el)}
        />
      ))),
    // skeleton
    ...Array.from(
      Array((devState.forceLoading || isLoading) ? 3 : 0),
      (el, i) => <CardNews.Loading key={i} />,
    ),
  ], [devState.forceLoading, isLoading, posts, router.query, isMatchCategory]);

  return (
    <MainLayout title="Postingan">
      <div className="p-10 pb-0">
        <h1 className="font-bold text-sm text-primary-900 uppercase tracking-tight">POSTINGAN</h1>
      </div>

      <PageSection
        title="Berita"
        triggerTitleAnimationOnce
      >
        <div className="pb-8 flex flex-col gap-y-4 border-b border-gray-200">
          <span className="font-bold text-sm text-gray-400 uppercase tracking-tight">
            PILIH KATEGORI
          </span>

          <Scrollbars
            autoHeight
            autoHide
            renderThumbHorizontal={(props) => <HorizontalThumb {...props} />}
            universal
            className="relative w-full"
          >
            <div className="w-full px-2 py-4 flex gap-x-4">
              {(!devState.forceLoading || isLoading) && posts?.length
                ? (
                  <>
                    <Category.Item active={isMatchCategory(undefined)}>semua</Category.Item>
                    {categories.map((el) => (
                      <Category.Item
                        key={el}
                        name={el}
                        active={isMatchCategory(el)}
                      >
                        {el}
                      </Category.Item>
                    ))}
                  </>
                )
                : Array.from(Array(3), (el, i) => (
                  <Skeleton
                    key={i}
                    className="self-stretch w-16 h-10 !rounded-xl"
                  />
                ))}
            </div>
          </Scrollbars>
        </div>

        <InView triggerOnce>
          {({ inView, ref }) => (
            <ul
              ref={ref}
              className="py-8 flex flex-col gap-y-8"
            >
              {postList.map((el, i) => (
                <li
                  key={el.key}
                  className={`flex-shrink-0 animate__animated ${inView ? 'animate__slideInLeft' : '-translate-x-full'}`}
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
            ? <span className="font-medium text-gray-400">Tidak ada yang dapat ditampilkan lagi 😁🙏</span>
            : (
              <button
                type="button"
                className={styleBtn.flat}
                onClick={nextPage}
              >
                Muat lebih banyak
              </button>
            )}
        </div>
      </PageSection>
    </MainLayout>
  );
}
