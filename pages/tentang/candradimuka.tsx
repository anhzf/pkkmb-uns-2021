import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight20, ChevronDown20 } from '@carbon/icons-react';
import { Transition } from '@headlessui/react';
import MainLayout from 'components/layouts/MainLayout';
import PageSection from 'components/PageSection';
import Accordion from 'components/Accordion';
import styles from 'styles/About.module.sass';
import shimmer, { toBase64 } from 'components/Shimmer';

export default function Candradimuka() {
  return (
    <MainLayout title="Candradimuka">
      <div className="p-10 pb-0">
        <h1 className="font-bold text-sm text-primary-900 uppercase">TENTANG</h1>
      </div>

      <PageSection>
        <div className="relative w-full">
          <Image
            src="/Logo.png"
            alt="Logo Candradimuka"
            width={400}
            height={300}
            layout="responsive"
            objectFit="scale-down"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}`}
          />
        </div>

        <blockquote className={styles.bigQuote}>
          Suatu tempat penggemblengan dan penempatan jati diri agar memiliki karakter pribadi yang kuat, terlatih dan tangkas
        </blockquote>

        <div className="flex flex-col items-stretch gap-y-1">
          <Accordion
            as="section"
            defaultOpen
          >
            {({ open }) => (
              <>
                <Accordion.Head>
                  <span>Filosofi Logo</span>
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
                  <ul>
                    {/* eslint-disable max-len */}
                    <li>
                      <b className="text-primary-900">Mahkota</b>
                      {' '}
                      pada burung melambangkan tri dharma perguruan tinggi
                    </li>
                    <li>
                      <b className="text-primary-900">Ekor 5</b>
                      {' '}
                      pada burung melambangkan jiwa pancasila dan semangat yang berkobar
                    </li>
                    <li>
                      <b className="text-primary-900">Leher burung yang berbentuk huruf C</b>
                      {' '}
                      merepresantisakan nama &quot;Candradimuka&quot;
                    </li>
                    <li>
                      <b className="text-primary-900">Badan burung yang seperti daun</b>
                      {' '}
                      melambangkan sikap cinta lingkungan, dan green campus
                    </li>
                    {/* eslint-enable max-len */}
                  </ul>
                </Transition>
              </>
            )}
          </Accordion>

          <Accordion as="section">
            {({ open }) => (
              <>
                <Accordion.Head>
                  <span>Filosofi Warna</span>
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
                  <ul>
                    {/* eslint-disable max-len */}
                    <li>
                      <b className="text-brand-1">Merah</b>
                      {' '}
                      melambangkan semangat yg berkobar,
                    </li>
                    <li>
                      <b className="text-brand-2">Kuning</b>
                      {' '}
                      melambangkan persahabatan dan optimisme, dan
                    </li>
                    <li>
                      <b className="text-brand-3">Hijau</b>
                      {' '}
                      melambangkan kehidupan dan pertumbuhan menuju pribadi yang lebih baik
                    </li>
                    {/* eslint-enable max-len */}
                  </ul>
                </Transition>
              </>
            )}
          </Accordion>

          <Link
            href="/tentang"
            passHref
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a css={Accordion.styles.head}>
              <span>PKKMB UNS</span>
              <ArrowRight20 />
            </a>
          </Link>
        </div>
      </PageSection>
    </MainLayout>
  );
}
