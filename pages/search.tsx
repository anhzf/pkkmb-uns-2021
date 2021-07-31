import { useState, useMemo, useDebugValue } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import client, { Post } from 'app/services/contentful';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import CardSearchResult from 'components/CardSearchResult';
import type { Entry } from 'contentful';
import type { MerchandiseEntry, PostEntry } from 'app/services/contentful';

const fullTextSearch = (q: string) => client.getEntries<PostEntry | MerchandiseEntry>({ query: q });

const isPostEntry = (entry: Entry<unknown>): entry is Entry<PostEntry> => entry.sys.contentType.sys.id === 'postingan';
const isMerchandiseEntry = (entry: Entry<unknown>): entry is Entry<MerchandiseEntry> => entry.sys.contentType.sys.id === 'merch';

export default function Search() {
  const router = useRouter();
  // just for development
  const [devState] = useState({
    forceLoading: false,
  });
  const { data, isValidating } = useSWR(router.query.q?.toString() ?? '', fullTextSearch);
  const resultList = useMemo(
    () => (isValidating || devState.forceLoading
      ? Array.from(Array(3), (el, i) => <CardSearchResult.Loading key={i} />)
      : data?.items.map((el) => (
        <li key={el.sys.id}>
          {isPostEntry(el) && (
          <CardSearchResult
            title={el.fields.judul}
            url={`/postingan/${el.fields.slug}`}
            tags={['Postingan', ...Post.resolveMeta(el)]}
          />
          )}
          {isMerchandiseEntry(el) && (
          <CardSearchResult
            title={el.fields.nama}
            url={`/toko/${el.fields.slug}`}
            tags={['Merchandise', ...el.fields.tags]}
          />
          )}
        </li>
      )) ?? <span>Tidak dapat menemukan apapun &gt;.&lt;</span>),
    [data, isValidating, devState],
  );

  useDebugValue(data);

  return (
    <MainLayout title="Hasil pencarian">
      <PageSection title="Hasil pencarian">
        <ul className="flex flex-col gap-y-4">
          {resultList}
        </ul>
      </PageSection>
    </MainLayout>
  );
}
