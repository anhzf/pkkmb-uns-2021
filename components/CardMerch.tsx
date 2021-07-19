import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'components/Skeleton';
import 'twin.macro';

interface Props extends React.HTMLAttributes<HTMLElement> {
  name: string;
  price: string;
  slug: string;
  thumbnailSrc: string;
}

const CardLoading = () => (
  <Skeleton className="relative overflow-hidden w-full h-full !rounded-none shadow-sm">
    <Skeleton className="absolute top-0 left-0 w-28 h-8 !bg-primary-100/50 !rounded-none shadow-sm" />
    <Skeleton className="absolute bottom-0 left-0 w-16 h-8 !bg-primary-100/50 !rounded-none shadow-sm" />
  </Skeleton>
);

const CardMerch = Object.assign(({
  name, price, slug, thumbnailSrc, ...props
}: Props) => (
  <article
    tw="relative overflow-hidden shadow-sm w-full h-full"
    {...props}
  >
    <Link href={`/toko/${encodeURIComponent(slug)}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="block w-full h-full">
        <Image
          src={thumbnailSrc}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </a>
    </Link>

    <span className="absolute top-0 left-0 px-3 py-2 bg-primary-100 font-medium text-gray-900 shadow-sm">
      {name}
    </span>

    <span className="absolute bottom-0 left-0 px-2 py-1.5 bg-primary-100 font-bold text-white shadow-sm">
      {price}
    </span>
  </article>
), {
  Loading: CardLoading,
});

export default CardMerch;
