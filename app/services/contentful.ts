import { Asset, createClient } from 'contentful';
import type { EntryFields, Entry, AssetCollection } from 'contentful';

export interface PostEntry {
  judul: EntryFields.Text;
  deskripsi: EntryFields.Text;
  kategori: EntryFields.Text;
  konten: EntryFields.RichText;
  thumbnail: Asset;
  tags: EntryFields.Text[];
  slug: EntryFields.Text;
  suka: EntryFields.Integer;
}

export interface MerchandiseEntry {
  nama: EntryFields.Text;
  harga: EntryFields.Integer;
  gambar: AssetCollection;
  tags: EntryFields.Text[];
  spesifikasi: EntryFields.Object<Record<string, unknown>>;
  slug: EntryFields.Text;
}

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACEID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_APIKEY!,
});

const createModel = <T>(contentTypeName: string) => ({
  get CONTENT_TYPE_NAME() {
    return contentTypeName;
  },

  get baseQuery() {
    return { content_type: this.CONTENT_TYPE_NAME };
  },

  async get(q?: any) {
    const query = { ...q, ...this.baseQuery };
    const { items } = await client.getEntries<T>(query);

    return items;
  },

  async getAll() {
    return this.get();
  },
});

const Post = {
  ...createModel<PostEntry>('postingan'),

  async getAllSlug() {
    const posts = await this.getAll();

    return posts.map(({ fields }) => fields.slug);
  },

  async getBySlug(slug: string) {
    const query = { fields: { slug }, limit: 1 };
    const [post] = await this.get(query);

    return post;
  },

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
    return `https:${post.fields.thumbnail.fields.file.url}`;
  },

  getCategories(posts: Entry<PostEntry>[]) {
    return posts.map((el) => el.fields.kategori);
  },
};

const Merch = {
  ...createModel<MerchandiseEntry>('merch'),
};

export default client;

export {
  Post,
  Merch,
};
