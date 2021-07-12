import Image from 'next/image';
import Link from 'next/link';
import { Favorite20, Share20 } from '@carbon/icons-react';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import shimmer, { toBase64 } from 'components/Shimmer';
import styleBtn from 'styles/components/button.module.sass';
import CardNews from 'components/CardNews';

export default function Artikel() {
  return (
    <MainLayout>
      <div className="p-10 pb-0">
        <h1 className="font-bold text-sm text-primary-900 uppercase tracking-tight">POSTINGAN</h1>
      </div>

      <div className="relative w-full h-96 py-16 mt-16">
        <Image
          src="https://picsum.photos/200/200"
          layout="fill"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}`}
          className="w-full h-full"
        />
      </div>

      <PageSection>
        <div className="pb-4 border-b border-gray-200 flex flex-col gap-y-4">
          <h1 className="font-bold text-3xl text-gray-900">Skuyy ikut PKKMB dapet Sertifikat lhoo!!</h1>

          <div className="flex divide-x divide-primary-200/50">
            {['Berita', '20 Agustus 2001'].map((el) => (
              <span
                key={el}
                className="px-4 first:pl-0 last:pr-0 font-medium text-primary-400"
              >
                {el}
              </span>
            ))}
          </div>

          <p className="font-medium text-gray-500">Yuk intip benefit apa aja kalau kamu  mengikuti rangkaian acara PKKMB nanti..</p>
        </div>

        <div className="flex flex-col gap-y-4">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum natus dolores corporis veniam. Quo recusandae vel at dicta culpa distinctio eum, aliquid, vitae commodi sit, laborum in suscipit molestiae. Dolore.
          </p>
        </div>

        <div className="pb-4 border-b border-gray-200 flex flex-col gap-y-4">
          <div className="font-medium text-gray-400 flex gap-x-1">
            {['pkkmb', 'uns', 'benefit'].map((el) => (
              <Link
                key={el}
                href={`/postingan?tag=${el}`}
              >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="uppercase">
                  #
                  {el}
                </a>
              </Link>
            ))}
          </div>

          <div className="flex gap-x-4">
            <button
              type="button"
              className={`${styleBtn.push} !bg-primary-100 !text-gray-900 !rounded-lg hover:!bg-primary-400`}
            >
              <Favorite20 />
              <span>10</span>
            </button>

            <button
              type="button"
              className={`${styleBtn.push} !bg-primary-100 !text-gray-900 !rounded-lg hover:!bg-primary-400`}
              onClick={() => window?.navigator.share({ url: new URL(window?.location.href).href })}
            >
              <Share20 />
              <span>Bagikan</span>
            </button>
          </div>
        </div>

        <div className="px-4 flex flex-col gap-y-4">
          <span className="font-bold text-sm text-gray-400 uppercase">LAINNYA</span>

          {Array.from(Array(4), (el, i) => (
            <CardNews
              key={i}
              title="Skuyy ikut PKKMB dapet Sertifikat lhoo!!"
              thumbnailSrc="https://picsum.photos/200/200"
              desc="Yuk intip benefit apa aja kalau kamu  mengikuti rangkaian acara PKKMB nanti..."
              meta={['Berita', '20 Agustus 2021']}
            />
          ))}
        </div>
      </PageSection>
    </MainLayout>
  );
}
