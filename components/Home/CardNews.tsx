import Image from 'next/image';
import { ArrowRight16 } from '@carbon/icons-react';
import componentStyles from '../../styles/components.module.sass';
import 'twin.macro';

interface Props extends React.HTMLAttributes<HTMLElement> {
  title: string;
  thumbnailSrc: string;
  meta: string[];
  url?: string;
}

const CardNews = ({
  title, meta, thumbnailSrc, url = '#', ...props
}: Props) => (
  <article
    tw="overflow-hidden max-w-xs bg-white border-l border-gray-100 rounded-lg shadow flex flex-col"
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
        <a
          href={url}
          className={componentStyles['btn--flat']}
        >
          <ArrowRight16 className={componentStyles.btn__icon} />
          <span className="font-medium text-sm">Selengkapnya</span>
        </a>
      </div>
    </div>
  </article>
);

export default CardNews;
