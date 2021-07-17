import {
  useState, useEffect, useMemo, useCallback, useDebugValue,
} from 'react';
import useSWR from 'swr';
import { Post } from 'app/services/contentful';
import type { PostEntry } from 'app/services/contentful';
import type { Entry } from 'contentful';

export const usePosts = (key: string, q?: any) => useSWR(
  [key, q],
  () => Post.get(q),
);

interface PaginatedQueryArg {
  limit: number;
  [k: string]: any;
}

export const usePaginatedPosts = (q: PaginatedQueryArg) => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dataPool, setDataPool] = useState<Record<number, Entry<PostEntry>[]>>({});
  const [isDone, setIsDone] = useState(false);
  const query = useMemo(() => ({
    ...q,
    skip: index * q.limit,
  }), [q, index]);
  const { data, ...swr } = usePosts('posts', query);
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
