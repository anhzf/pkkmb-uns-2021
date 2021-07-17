import { Asset, createClient } from 'contentful';
import type {
  EntryFields, Entry, AssetCollection, SyncCollection,
} from 'contentful';

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

const Post = {
  CONTENT_TYPE_NAME: 'postingan',

  get baseQuery() {
    return { content_type: this.CONTENT_TYPE_NAME };
  },

  async get(q?: any) {
    const query = { ...q, ...this.baseQuery };
    const { items } = await client.getEntries<PostEntry>(query);

    return items;
  },

  async getAll() {
    return this.get();
  },

  async getAllSlug() {
    const posts = await this.getAll();

    return posts.map(({ fields }) => fields.slug);
  },

  async getBySlug(slug: string) {
    const query = { fields: { slug }, limit: 1 };
    const [post] = await this.get(query);

    return post;
  },

  async initPaginatedPosts(q?: any) {
    const sync = await client.sync({
      ...q,
      initial: true,
      type: 'Entry',
      ...this.baseQuery,
    });

    return this._transformPaginatedResponse(sync);
  },

  async getPaginatedPosts(nextSyncToken: string) {
    const sync = await client.sync({ nextSyncToken });

    return this._transformPaginatedResponse(sync);
  },

  _transformPaginatedResponse({ entries, nextSyncToken }: SyncCollection) {
    return {
      entries: entries as Entry<PostEntry>[],
      nextSyncToken,
    };
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

  getCategories(posts: Entry<PostEntry>[]) {
    return posts.map((el) => el.fields.kategori);
  },
};

export default client;

export {
  Post,
};
