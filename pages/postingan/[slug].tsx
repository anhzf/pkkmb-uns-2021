import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft16, Favorite20, Share20 } from '@carbon/icons-react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Post } from 'app/services/contentful';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import shimmer, { toBase64 } from 'components/Shimmer';
import styleBtn from 'styles/components/button.module.sass';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import type { Entry } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import type { PostEntry } from 'app/services/contentful';

const STATIC_PROPS_REVALIDATE_INTERVAL = 1000 * 60 * 30; // 30 minutes

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await Post.getAllSlug();

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  post: Entry<PostEntry>;
}, {
  slug: string
}> = async ({ params }) => {
  if (typeof params?.slug === 'string') {
    const post = await Post.getBySlug(params?.slug!);

    return {
      props: { post },
      revalidate: STATIC_PROPS_REVALIDATE_INTERVAL,
    };
  }

  return {
    notFound: true,
  };
};

export default function Artikel({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainLayout>
      <div className="p-10 pb-0">
        <h1 className="font-bold text-sm text-primary-900 uppercase tracking-tight">POSTINGAN</h1>
      </div>

      <div className="relative w-full h-96 py-16 mt-16">
        <Image
          src={Post.resolveThumbnailUrl(post)}
          layout="fill"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}`}
          className="w-full h-full"
        />
      </div>

      <PageSection>
        <div className="pb-4 border-b border-gray-200 flex flex-col gap-y-4">
          <h1 className="font-bold text-3xl text-gray-900">{post.fields.judul}</h1>

          <div className="flex divide-x divide-primary-200/50">
            {Post.resolveMeta(post).map((el) => (
              <span
                key={el}
                className="px-4 first:pl-0 last:pr-0 font-medium text-primary-400"
              >
                {el}
              </span>
            ))}
          </div>

          <p className="font-medium text-gray-500">{post.fields.deskripsi}</p>
        </div>

        <div
          className="prose-sm whitespace-pre-line flex flex-col gap-y-4"
          dangerouslySetInnerHTML={{ __html: documentToHtmlString(post.fields.konten as Document) }}
        />

        <div className="pb-4 border-b border-gray-200 flex flex-col gap-y-4">
          <div className="font-medium text-gray-400 flex gap-x-1">
            {post.fields.tags.map((el) => (
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
              <span>{post.fields.suka}</span>
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

        <div className="p-4">
          <Link href="/postingan">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styleBtn.base}>
              <ArrowLeft16 className={styleBtn.__icon_hoverToLeft} />
              <span>Lihat berita lainnya</span>
            </a>
          </Link>
        </div>
      </PageSection>
    </MainLayout>
  );
}
