import Image from 'next/image';
import Link from 'next/link';
import shimmer, { toBase64 } from 'components/Shimmer';
import Skeleton from 'components/Skeleton';
import 'twin.macro';

interface Props extends React.HTMLProps<HTMLElement> {
  title: string;
  desc?: string;
  thumbnailSrc: string;
  slug: string;
  meta?: string[];
}

const CardLoading = () => (
  <div className="w-full h-40 bg-white rounded-lg border-t border-gray-100 shadow grid grid-cols-3">
    <Skeleton className="w-full h-full !rounded-r-none" />
    <div className="col-span-2 p-4 flex flex-col justify-between">
      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </div>

      <div className="flex gap-x-1">
        <Skeleton className="w-8 h-4" />
        <Skeleton className="w-8 h-4" />
      </div>
    </div>
  </div>
);

const CardNews = Object.assign(({
  title, desc, thumbnailSrc, slug, meta = [], children, ...props
}: Props) => (
  <article
    title="klik untuk membaca"
    tw="overflow-hidden relative border-t border-b border-gray-100 rounded-2xl shadow transition-shadow hover:shadow-xl"
    {...props}
  >
    <Link href={`/postingan/${slug}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="w-full h-40 p-4 bg-white transition-colors grid grid-cols-3 gap-x-2 hover:bg-gray-50">
        <div className="overflow-hidden relative rounded-xl">
          <Image
            src={thumbnailSrc}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}`}
            className="w-full h-full"
          />
        </div>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <div className="col-span-2 p-4 flex flex-col justify-between ">
          <div className="flex flex-col gap-y-2">
            <h3 className="font-bold text-gray-600 line-clamp-2">{title}</h3>
            <p className="text-xs text-gray-500 line-clamp-3">{desc}</p>
          </div>

          {children}

          <div className="flex divide-x divide-primary-200/50">
            {meta.map((el) => (
              <span
                key={el}
                className="px-4 first:pl-0 last:pr-0 font-medium text-xs text-primary-400"
              >
                {el}
              </span>
            ))}
          </div>
        </div>
      </a>
    </Link>
  </article>
), {
  Loading: CardLoading,
});

export default CardNews;
