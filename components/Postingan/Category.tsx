import Link from 'next/link';
import tw, { styled } from 'twin.macro';
import type { LinkProps } from 'next/link';

interface StyledItemProps {
  active?: boolean;
}

type ItemProps = StyledItemProps
  & Omit<React.HTMLProps<LinkProps>, 'href' | 'passHref'>
  & {
    name?: string;
  };

const StyledItem = styled.a(({ active }: StyledItemProps) => [
  tw`px-4 py-2.5 font-semibold text-sm lowercase rounded-xl transition-colors active:shadow-inner`,
  active
    ? tw`bg-[#FCD186] text-primary-900 shadow-inner hover:bg-[#e2b86e]`
    : tw`bg-white text-gray-900 shadow hover:bg-gray-100`,
]);

const Item = ({
  name, active, children, ...props
}: ItemProps) => (
  <Link
    href={name ? `/postingan/?kategori=${encodeURIComponent(name)}` : '/postingan'}
    passHref
    {...props}
  >
    <StyledItem active={active}>{children}</StyledItem>
  </Link>
);

export {
  Item,
};
