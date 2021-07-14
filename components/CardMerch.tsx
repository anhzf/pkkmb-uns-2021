import Image from 'next/image';
import Link from 'next/link';
import 'twin.macro';

interface Props extends React.HTMLAttributes<HTMLElement> {
  name: string;
  price: string;
  thumbnailSrc: string;
}

const CardMerch = ({
  name, price, thumbnailSrc, ...props
}: Props) => (
  <article
    tw="relative overflow-hidden shadow-sm w-full h-full"
    {...props}
  >
    <Link href="/toko/asdad">
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
);

export default CardMerch;
