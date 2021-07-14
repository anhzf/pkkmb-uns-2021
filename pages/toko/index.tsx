import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import CardMerch from 'components/CardMerch';
import styleBtn from 'styles/components/button.module.sass';

export default function Toko() {
  return (
    <MainLayout title="Toko">
      <div className="p-10 pb-0">
        <h1 className="font-bold text-sm text-primary-900 uppercase">Toko</h1>
      </div>

      <PageSection title="Merchandise">
        <ul className="py-8 grid grid-cols-2 auto-rows-max gap-4">
          {Array.from(Array(7), (el, i) => (
            <li
              key={i}
              className="h-[60vmin] max-h-96"
            >
              <CardMerch
                name="Geprek Sehat"
                price="10k"
                thumbnailSrc="https://picsum.photos/seed/picsum/200/300"
              />
            </li>
          ))}
        </ul>

        <div className="p-4 flex justify-center">
          <button
            type="button"
            className={styleBtn.flat}
          >
            Muat lebih banyak
          </button>
        </div>
      </PageSection>
    </MainLayout>
  );
}
