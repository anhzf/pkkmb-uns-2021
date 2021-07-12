import Image from 'next/image';
import Link from 'next/link';
import shimmer, { toBase64 } from 'components/Shimmer';
import 'twin.macro';

interface Props extends React.HTMLProps<HTMLElement> {
  title: string;
  desc?: string;
  meta?: string[];
  thumbnailSrc: string;
}

const CardNews = ({
  title, desc, meta = [], thumbnailSrc, children, ...props
}: Props) => (
  <article
    tw="overflow-hidden relative rounded-lg border-t border-gray-100 shadow"
    {...props}
  >
    <Link href="/postingan/asdasd">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="w-full h-40 bg-white transition-colors grid grid-cols-3 hover:bg-yellow-50">
        <div className="relative">
          <Image
            src={thumbnailSrc}
            layout="fill"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}`}
            className="w-full h-full"
          />
        </div>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <div className="col-span-2 p-4 flex flex-col justify-between">
          <div className="flex flex-col gap-y-2">
            <h3 className="font-medium text-gray-900 line-clamp-2">{title}</h3>
            <p className="text-xs text-gray-500 line-clamp-3">{desc}</p>
          </div>

          {children}

          <div className="flex divide-x divide-primary-200/50">
            {meta.map((el) => (
              <span
                key={el}
                className="px-4 first:pl-0 last:pr-0 text-xs text-primary-400"
              >
                {el}
              </span>
            ))}
          </div>
        </div>
      </a>
    </Link>
  </article>
);

export default CardNews;
