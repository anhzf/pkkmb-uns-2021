import Link from 'next/link';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import * as content from '@/content-data';
import Accordion from 'components/Accordion';
import 'twin.macro';
import { ArrowRight20, ChevronDown20 } from '@carbon/icons-react';
import { Transition } from '@headlessui/react';

export default function Tentang() {
  return (
    <MainLayout title="Tentang">
      <div className="p-10 pb-0">
        <h1 className="font-bold text-sm text-primary-900 uppercase">TENTANG</h1>
      </div>

      <PageSection title="PKKMB UNS">
        <p className="font-medium text-gray-900">{content.Tentang.aboutPkkmb}</p>

        <div className="flex flex-col items-stretch gap-y-1">
          <Accordion
            as="section"
            defaultOpen
          >
            {({ open }) => (
              <>
                <Accordion.Head>
                  <span>Landasan</span>
                  <ChevronDown20 className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                </Accordion.Head>

                <Transition
                  as={Accordion.Body}
                  enterFrom="scale-y-0"
                  enterTo="scale-y-100"
                  leaveFrom="scale-y-100"
                  leaveTo="scale-y-0"
                  className="overflow-hidden transition origin-top"
                >
                  <ol className="list-decimal ml-4">
                    {/* eslint-disable max-len */}
                    <li>Undang-Undang Nomor 12 Tahun 2012 tentang Pendidikan Tinggi</li>
                    <li>Peraturan Pemerintah Nomor 4 Tahun 2014 tentang Penyelenggaraan Pendidikan Tinggi dan Pengelolaan Perguruan Tinggi</li>
                    <li>Keputusan Presiden Nomor 12 Tahun tentang Penetapan Bencana Nonalam Penyebaran Corona Virus Disease (Covid-19) sebagai Bencana Nasional</li>
                    <li>Surat Edaran Dirjen Pendidikan Tinggi Kementerian Pendidikan dan Kebudayaan nomor: 631/E.E2/KM/2020 tanggal 18 Juni 2020 tentang Panduan Umum Pengenalan Kehidupan Kampus Bagi Mahasiswa Baru (PKKMB) 2020</li>
                    <li>Peraturan Rektor UNS Nomor 42 tahun 2020 tentang Pengenalan Kehidupan Kampus Bagi Mahasiswa Baru (PKKMB) Program Sarjana dan Diploma Tahun Akademik 2020/2021 Universitas Sebelas Maret</li>
                    <li>Anggaran Dasar/Anggaran Rumah Tangga Badan Eksekutif Mahasiswa Universitas Sebelas Maret</li>
                    {/* eslint-enable max-len */}
                  </ol>
                </Transition>
              </>
            )}
          </Accordion>

          <Link
            href="/tentang/candradimuka"
            passHref
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a css={Accordion.styles.head}>
              <span>Candradimuka</span>
              <ArrowRight20 />
            </a>
          </Link>
        </div>
      </PageSection>
    </MainLayout>
  );
}
