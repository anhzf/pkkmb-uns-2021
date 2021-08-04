import { createClient } from 'contentful';
import type { EntryFields, Entry, Asset } from 'contentful';

export interface EntryHasSlug {
  slug: EntryFields.Text;
}

export interface PostEntry extends EntryHasSlug {
  judul: EntryFields.Text;
  deskripsi: EntryFields.Text;
  kategori: EntryFields.Text;
  konten: EntryFields.RichText;
  thumbnail: Asset;
  tags: EntryFields.Text[];
  suka: EntryFields.Integer;
}

export interface MerchandiseEntry extends EntryHasSlug {
  nama: EntryFields.Text;
  harga: EntryFields.Integer;
  deskripsi: EntryFields.RichText;
  gambar: Asset[];
  tags: EntryFields.Text[];
  spesifikasi: EntryFields.Object<Record<string, unknown>>;
}

/* eslint-disable no-unused-vars */
export interface ContentfulModel<T> {
  readonly CONTENT_TYPE_NAME: string;
  readonly baseQuery: Record<string, unknown>;
  get: (q?: any) => Promise<Entry<T>[]>;
  getAll: () => Promise<Entry<T>[]>;
}
/* eslint-enable no-unused-vars */

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACEID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_APIKEY!,
});

const utils = {
  resolveFileUrl(url: string) {
    return `https:${url}`;
  },
};

const createModel = <T>(contentTypeName: string): ContentfulModel<T> => ({
  get CONTENT_TYPE_NAME() {
    return contentTypeName;
  },

  get baseQuery() {
    return { content_type: this.CONTENT_TYPE_NAME };
  },

  async get(q) {
    const query = { ...q, ...this.baseQuery };
    const { items } = await client.getEntries<T>(query);

    return items;
  },

  async getAll() {
    return this.get();
  },
});

const modelSluggable = <T extends EntryHasSlug>(model: ContentfulModel<T>) => ({
  async getAllSlug() {
    const entry = await model.getAll();

    return entry.map(({ fields }) => fields.slug);
  },

  async getBySlug(slug: string) {
    const query = { fields: { slug }, limit: 1 };

    const [entry] = await model.get(query);

    return entry;
  },
});

const PostBase = createModel<PostEntry>('postingan');
const Post = {
  ...PostBase,
  ...modelSluggable(PostBase),

  resolveMeta(post: Entry<PostEntry>) {
    return [
      post.fields.kategori,
      new Date(post.sys.createdAt).toLocaleString(
        'id-iD',
        {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        },
      ),
    ];
  },

  resolveThumbnailUrl(post: Entry<PostEntry>) {
    return utils.resolveFileUrl(post.fields.thumbnail.fields.file.url);
  },

  getCategories(posts: Entry<PostEntry>[]) {
    return posts.map((el) => el.fields.kategori);
  },
};

const MerchBase = createModel<MerchandiseEntry>('merch');
const Merch = {
  ...MerchBase,
  ...modelSluggable(MerchBase),

  resolveThumbnailUrl(merch: Entry<MerchandiseEntry>) {
    const [img] = merch.fields.gambar;
    return utils.resolveFileUrl(img.fields.file.url);
  },

  resolveThumbnailsUrl(merch: Entry<MerchandiseEntry>) {
    const images = merch.fields.gambar;
    return images.map((el) => utils.resolveFileUrl(el.fields.file.url));
  },

  formatPrice(price: number) {
    const string = price.toString();
    return `${string.slice(0, string.length - 3)}k`;
  },
};

export default client;

export {
  Post,
  Merch,
  utils,
};
