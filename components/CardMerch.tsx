import Image from 'next/image';
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
    <Image
      src={thumbnailSrc}
      layout="fill"
      objectFit="cover"
      className="w-full h-full"
    />

    <span className="absolute top-0 left-0 px-4 py-3 bg-primary-100 font-medium text-primary-900 shadow-sm">
      {name}
    </span>

    <span className="absolute bottom-0 left-0 px-2 py-1.5 bg-primary-100 font-bold text-white shadow-sm">
      {price}
    </span>
  </article>
);

export default CardMerch;
