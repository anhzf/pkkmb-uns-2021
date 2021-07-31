import Link from 'next/link';
import Skeleton from 'components/Skeleton';
import 'twin.macro';
import { ArrowRight20 } from '@carbon/icons-react';

interface Props extends React.HTMLProps<HTMLElement> {
  title: string;
  url: string;
  tags?: string[];
}

const CardLoading = () => (
  <article className="p-4 bg-white shadow-sm flex flex-col gap-y-2">
    <Skeleton className="w-full h-4" />

    <div className="flex gap-x-1">
      <Skeleton className="w-8 h-4" />
      <Skeleton className="w-8 h-4" />
    </div>
  </article>
);

const CardSearchResult = Object.assign(({
  title, url, tags = [], ...props
}: Props) => (
  <article
    tw="p-4 bg-white shadow-sm"
    {...props}
  >
    <Link href={url}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="flex">
        <div className="flex-grow flex flex-col">
          <h6 className="font-medium text-gray-900 line-clamp-2">{title}</h6>

          <div className="flex divide-x divide-primary-200/50">
            {tags.map((el) => (
              <span
                key={el}
                className="px-4 first:pl-0 last:pr-0 text-xs text-primary-400"
              >
                {el}
              </span>
            ))}
          </div>
        </div>

        <ArrowRight20 className="my-auto text-primary-200/50" />
      </a>
    </Link>
  </article>
), {
  Loading: CardLoading,
});

export default CardSearchResult;
