import { useRouter } from 'next/router';
import Scrollbars from 'react-custom-scrollbars';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import CardNews from 'components/CardNews';
import { HorizontalThumb } from 'components/Scrollbar';
import * as Category from 'components/Postingan/Category';
import styleBtn from 'styles/components/button.module.sass';

const categories: {name: string; label?: string;}[] = [
  { name: 'artikel' },
  { name: 'penugasan' },
  { name: 'acara' },
];

export default function Postingan() {
  const { query } = useRouter();
  const isMatchCategory = (name: any) => query.kategori === name;

  return (
    <MainLayout title="Postingan">
      <div className="p-10 pb-0">
        <h1 className="font-bold text-sm text-primary-900 uppercase tracking-tight">POSTINGAN</h1>
      </div>

      <PageSection title="Berita">
        <div className="pb-8 flex flex-col gap-y-4 border-b border-gray-200">
          <span className="font-bold text-sm text-gray-400 uppercase tracking-tight">
            PILIH KATEGORI
          </span>

          <Scrollbars
            autoHeight
            autoHide
            renderThumbHorizontal={(props) => <HorizontalThumb {...props} />}
            universal
            className="relative w-full"
          >
            <div className="w-full px-2 py-4 flex gap-x-4">
              <Category.Item active={isMatchCategory(undefined)}>semua</Category.Item>
              {categories.map((el) => (
                <Category.Item
                  key={el.name}
                  name={el.name}
                  active={isMatchCategory(el.name)}
                >
                  {el.label ?? el.name}
                </Category.Item>
              ))}
            </div>
          </Scrollbars>
        </div>

        <div className="flex flex-col gap-y-10">
          {Array.from(Array(5), (el, i) => (
            <CardNews
              key={i}
              title="Skuyy ikut PKKMB dapet Sertifikat lhoo!!"
              thumbnailSrc="https://picsum.photos/200/200"
              desc="Yuk intip benefit apa aja kalau kamu  mengikuti rangkaian acara PKKMB nanti..."
              meta={['Berita', '20 Agustus 2021']}
            />
          ))}
        </div>

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
