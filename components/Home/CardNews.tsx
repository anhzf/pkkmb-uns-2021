import Image from 'next/image';
import { ArrowRight16 } from '@carbon/icons-react';
import styleBtn from 'styles/components/button.module.sass';
import 'twin.macro';
import Link from 'next/link';

interface Props extends React.HTMLAttributes<HTMLElement> {
  title: string;
  thumbnailSrc: string;
  meta: string[];
  slug?: string;
}

const CardNews = ({
  title, meta, thumbnailSrc, slug = '#', ...props
}: Props) => (
  <article
    tw="overflow-hidden max-w-xs bg-white border-l border-gray-100 rounded-xl shadow flex flex-col"
    {...props}
  >
    <Image
      src={thumbnailSrc}
      width={300}
      height={200}
      alt={title}
      objectFit="cover"
    />

    <div className="px-3 py-6 bg-white flex flex-col gap-y-3">
      <h3 className="line-clamp-2 font-medium text-3xl text-gray-900">{title}</h3>

      <div className="flex divide-x divide-primary-200/50">
        {meta.map((el) => (
          <span
            key={el}
            className="px-2 first:pl-0 last:pr-0 text-sm text-gray-400"
          >
            {el}
          </span>
        ))}
      </div>

      <div className="pt-4 flex">
        <Link href={`/postingan/${slug}`}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styleBtn.flat}>
            <ArrowRight16 className={styleBtn.__icon} />
            <span className="font-medium text-sm">Selengkapnya</span>
          </a>
        </Link>
      </div>
    </div>
  </article>
);

export default CardNews;
