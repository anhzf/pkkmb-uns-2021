import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'components/Skeleton';
import tw from 'twin.macro';

interface Props extends React.HTMLAttributes<HTMLElement> {
  name: string;
  slug: string;
  thumbnailSrc: string;
}

const CardLoading = () => (
  <Skeleton className="relative overflow-hidden w-full h-full !rounded-none shadow-sm">
    <Skeleton className="absolute top-0 left-0 w-28 h-8 !bg-primary-100/50 !rounded-none shadow-sm" />
    <Skeleton className="absolute bottom-0 left-0 w-16 h-8 !bg-primary-100/50 !rounded-none shadow-sm" />
  </Skeleton>
);

const Container = tw.article`overflow-hidden relative w-full aspect-w-1 aspect-h-1 rounded-xl`;

const CardMerch = Object.assign(({
  name, slug, thumbnailSrc, className, ...props
}: Props) => (
  <Container
    className={`group ${className}`}
    {...props}
  >
    <Link href={`/toko/${slug}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <Image
          layout="fill"
          src={thumbnailSrc}
          className="bg-gray-100 transition-transform group-hover:scale-110 group-hover:rotate-2"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent origin-bottom scale-y-50 transition-transform group-hover:scale-y-100" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-2">
          <span className="font-medium text-white line-clamp-2">{name}</span>
        </div>
      </a>
    </Link>
  </Container>
), {
  Loading: CardLoading,
});

export default CardMerch;
