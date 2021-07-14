/* eslint-disable max-len */
import { SiInstagram, SiTiktok } from 'react-icons/si';
import type { IconType } from 'react-icons';

// footer
interface SocmedItem {
  name: string;
  label: string;
  url: string;
  icon: IconType;
}

export const socmed: SocmedItem[] = [
  {
    name: 'akun tiktok',
    label: '@generasiuns',
    url: 'https://www.tiktok.com/@generasiuns',
    icon: SiTiktok,
  },
  {
    name: 'akun ig',
    label: '@generasiuns',
    url: 'https://www.instagram.com/generasiuns',
    icon: SiInstagram,
  },
];

interface ContactPerson {
  name: string;
  label: string;
  url: string;
}

export const contactPersons: ContactPerson[] = [
  {
    name: 'ketua',
    label: '62812 9972 4412 (Ibad - Ketua)',
    url: 'https://wa.me/6281299724412',
  },
];

// pages/index

export const Home = {
  aboutPkkmb: 'PKKMB UNS merupakan wadah akselerasi adaptasi kampus untuk mahasiswa baru. Mengusung tema Mahasura Muda sebagai manifestasi harapan agar mahasiswa baru UNS tumbuh menjadi insan pembelajar, pencipta, dan penggerak!',
};

// pages/tentang
export const Tentang = {
  aboutPkkmb: 'PKKMB UNS merupakan akronim dari Pengenalan Kehidupan Kampus Mahasiswa Baru Universitas Sebelas Maret. Tujuan kegiatan ini adalah sebagai akselerasi adaptasi mahasiswa baru UNS terhadap dunia kampus dimana antara dunia sekolah dan dunia kuliah akan terasa sangat berbeda.',
};
