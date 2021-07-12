import { SiWhatsapp } from 'react-icons/si';
import * as content from '@/content-data';
import 'twin.macro';
import type { ReactNode } from 'react';
import Link from 'next/link';

interface SectionListProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
}

interface SectionListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  url: string;
  icon?: ReactNode;
}

const navItems: {url: string; label: string}[] = [
  { label: 'Beranda', url: '/' },
  { label: 'Tentang', url: '/tentang' },
  { label: 'Berita', url: '#' },
  { label: 'Toko', url: '#' },
  { label: 'Credits', url: '#' },
];

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
    <Link href={url}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="font-bold text-white leading-6 flex items-center gap-x-4 hover:text-primary-200">
        {icon}
        {children}
      </a>
    </Link>
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
      {content.socmed.map(({
        name, label, url, icon: Icon,
      }) => (
        <SectionListItem
          key={name}
          url={url}
          icon={<Icon />}
        >
          {label}
        </SectionListItem>
      ))}
    </SectionList>

    <SectionList title="Narahubung">
      {content.contactPersons.map(({ name, label, url }) => (
        <SectionListItem
          key={name}
          url={url}
          icon={<SiWhatsapp />}
        >
          {label}
        </SectionListItem>
      ))}
    </SectionList>

    <SectionList title="Navigasi">
      {navItems.map(({ label, url }) => (
        <SectionListItem
          key={label}
          url={url}
        >
          {label}
        </SectionListItem>
      ))}
    </SectionList>

    <section className="pt-8 flex justify-center">
      <span className="font-bold text-center text-gray-300">© Team Website PKKMB UNS 2021</span>
    </section>
  </footer>
);

export default BaseFooter;
