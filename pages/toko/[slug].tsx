import Image from 'next/image';
import Link from 'next/link';
import tw from 'twin.macro';
import Scrollbars from 'react-custom-scrollbars';
import { SiWhatsapp } from 'react-icons/si';
import { ArrowLeft16 } from '@carbon/icons-react';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import { HorizontalThumb } from 'components/Scrollbar';
import * as TableSpecs from 'components/Toko/TableSpecs';
import styleBtn from 'styles/components/button.module.sass';

const Label = tw.a`px-4 py-2 bg-primary-300 text-yellow-50 rounded-full`;

export default function Merch() {
  return (
    <MainLayout title="Geprek Sehat">
      <div className="p-10 pb-0">
        <h1 className="font-bold text-sm text-primary-900 uppercase">TOKO</h1>
      </div>

      <PageSection title="Geprek Sehat">
        <div className="relative">
          <Scrollbars
            universal
            autoHeight
            autoHeightMax="70vh"
            renderThumbHorizontal={(props) => <HorizontalThumb {...props} />}
            renderView={({ style, ...props }) => (
              <ul
                className="px-2 py-4 flex flex-row flex-no-wrap gap-x-4"
                style={{ ...style, scrollSnapType: 'x mandatory' }}
                {...props}
              />
            )}
          >
            {Array.from(Array(5), (el, i) => (
              <li
                key={i}
                className="flex-shrink-0 w-96 h-full"
                style={{ scrollSnapAlign: 'center' }}
              >
                <div className="relative aspect-w-10 aspect-h-7 w-full h-full">
                  <Image
                    src="https://picsum.photos/500/350"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </li>
            ))}
          </Scrollbars>

          <span className="absolute left-0 bottom-0 my-4 px-3 py-2 bg-gray-800/80 text-white shadow backdrop-blur-sm">
            1/4
          </span>
        </div>

        <div className="px-4 py-6 border-b border-gray-200 flex justify-between">
          <span className="font-bold text-2xl text-primary-200">Rp 10k</span>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className={`${styleBtn.push} !bg-brand-2 !text-gray-900 hover:!bg-primary-100`}
          >
            <SiWhatsapp />
            <span className="font-bold">PESAN SEKARANG</span>
          </a>
        </div>

        <div className="px-4 pb-10 border-b border-gray-200 flex flex-col gap-y-10">
          <div className="font-medium text-gray-700 tracking-wide">
            <p>Geprek? ya geprek kumlot! awokwowkowk. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>

          <div className="flex">
            <Link
              href="/toko?kategori=asdasd"
              passHref
            >
              <Label>Makanan</Label>
            </Link>
          </div>

          <table>
            <tbody>
              <tr>
                <TableSpecs.TH>Bahan</TableSpecs.TH>
                <TableSpecs.TD>Combed 24s</TableSpecs.TD>
              </tr>
              <tr>
                <TableSpecs.TH>Varian</TableSpecs.TH>
                <TableSpecs.TD>
                  <ul className="list-disc list-inside">
                    <li>Vanilla</li>
                    <li>Cokelat</li>
                  </ul>
                </TableSpecs.TD>
              </tr>
              <tr>
                <TableSpecs.TH>Warna</TableSpecs.TH>
                <TableSpecs.TD>Pinky</TableSpecs.TD>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4">
          <Link href="/toko">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styleBtn.base}>
              <ArrowLeft16 className={styleBtn.__icon_hoverToLeft} />
              <span>Kembali ke katalog</span>
            </a>
          </Link>
        </div>
      </PageSection>
    </MainLayout>
  );
}
