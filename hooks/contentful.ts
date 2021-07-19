import {
  useState, useEffect, useMemo, useCallback, useDebugValue,
} from 'react';
import useSWR from 'swr';
import { Merch, Post } from 'app/services/contentful';
import type { SWRConfiguration, SWRResponse } from 'swr';
import type { Entry } from 'contentful';
import type { PostEntry, MerchandiseEntry } from 'app/services/contentful';

// eslint-disable-next-line no-unused-vars
export type TuseModelFn<T> = (key: string, q?: any, opts?: SWRConfiguration<Entry<T>[]>) => SWRResponse<Entry<T>[], any>;

export interface usePaginatedQueryArg {
  limit: number;
  [k: string]: any;
}

export interface usePaginatedOptions<T> {
  startIndex?: number;
  poolInit?: Record<number, Entry<T>[]>;
  // loadFetcher?: () => Promise<Entry<T>[]>;
}

export const usePaginatedModels = <T>(
  useModelFn: TuseModelFn<T>,
  key: string,
  q: usePaginatedQueryArg,
  { poolInit, startIndex }: usePaginatedOptions<T> = {},
) => {
  const [index, setIndex] = useState(startIndex ?? 0);
  const [isLoading, setIsLoading] = useState(true);
  const [dataPool, setDataPool] = useState(poolInit ?? {});
  const [isDone, setIsDone] = useState(false);
  const query = useMemo(() => ({
    ...q,
    skip: index * q.limit,
  }), [q, index]);
  const { data, ...swr } = useModelFn(key, query, {
    initialData: dataPool[index],
  });
  const next = useCallback(
    () => setIndex((i) => (isDone ? i : i + 1)),
    [isDone],
  );
  const prev = useCallback(
    () => setIndex((i) => (i === 0 ? 0 : i - 1)),
    [],
  );

  useEffect(() => setIsDone(data !== undefined
    && data?.length < q.limit), [q, data]);

  useEffect(() => {
    if (data?.length) {
      setDataPool((pool) => ({
        ...pool,
        [index]: data,
      }));
    }
  }, [index, data]);

  /* observing for loading states,
  with assumption if index changed it means the fetcher will be starting to fetch,
  then if value not undefined it means the fetch is done */
  // waiting for data changes
  useEffect(() => setIsLoading(true), [index]);
  // data has been changed!
  useEffect(() => setIsLoading(!data?.length), [data]);

  useDebugValue({ dataPool });

  return {
    data, dataPool, ...swr, next, prev, isDone, isLoading,
  };
};

export const usePosts: TuseModelFn<PostEntry> = (key, q, opts) => useSWR(
  [key, q],
  () => Post.get(q),
  opts,
);

export const usePaginatedPosts = (q: usePaginatedQueryArg, opts: usePaginatedOptions<PostEntry> = {}) => usePaginatedModels(
  usePosts, 'posts', q, opts,
);

export const useMerch: TuseModelFn<MerchandiseEntry> = (key, q, opts) => useSWR(
  [key, q],
  () => Merch.get(q),
  opts,
);

export const usePaginatedMerch = (q: usePaginatedQueryArg, opts: usePaginatedOptions<MerchandiseEntry> = {}) => usePaginatedModels(
  useMerch, 'merch', q, opts,
);
