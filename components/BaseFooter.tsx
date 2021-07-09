import { SiTiktok, SiInstagram, SiWhatsapp } from 'react-icons/si';
import 'twin.macro';
import type { ReactNode } from 'react';

interface SectionListProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
}

interface SectionListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  url: string;
  icon?: ReactNode;
}

const SectionList = ({ title, children, ...props }: SectionListProps) => (
  <section
    tw="py-4"
    {...props}
  >
    <ul className="p-2 pb-2 flex flex-col gap-y-4">
      <h6 className="mb-2 font-bold text-gray-300">{title}</h6>
      {children}
    </ul>
  </section>
);

const SectionListItem = ({
  url, children, icon, ...props
}: SectionListItemProps) => (
  <li {...props}>
    <a
      href={url}
      className="font-bold leading-6 flex items-center gap-x-4"
    >
      {icon}
      {children}
    </a>
  </li>
);

const BaseFooter = (props: React.HTMLAttributes<HTMLElement>) => (
  <footer
    tw="w-full px-4 py-10 bg-primary-900 text-white flex flex-col gap-y-4 divide-y divide-gray-500"
    {...props}
  >
    <section className="pb-4">
      <h6 className="font-bold">PKKMB UNS 2021 - Candradimuka</h6>
    </section>

    <SectionList title="Media Sosial">
      <SectionListItem
        url="https://www.tiktok.com/@generasiuns"
        icon={<SiTiktok />}
      >
        @generasiuns
      </SectionListItem>

      <SectionListItem
        url="https://www.instagram.com/generasiuns"
        icon={<SiInstagram />}
      >
        @generasiuns
      </SectionListItem>
    </SectionList>

    <SectionList title="Narahubung">
      <SectionListItem
        url="https://www.wa.me/6281299724412"
        icon={<SiWhatsapp />}
      >
        62812 9972 4412 (Ibad - Ketua)
      </SectionListItem>
    </SectionList>

    <SectionList title="Navigasi">
      <SectionListItem url="/">
        Tentang
      </SectionListItem>

      <SectionListItem url="/">
        Berita
      </SectionListItem>

      <SectionListItem url="/">
        Toko
      </SectionListItem>

      <SectionListItem url="/">
        Credits
      </SectionListItem>
    </SectionList>

    <section className="pt-8 flex justify-center">
      <span className="font-bold text-center text-gray-300">© Team Website PKKMB UNS 2021</span>
    </section>
  </footer>
);

export default BaseFooter;
