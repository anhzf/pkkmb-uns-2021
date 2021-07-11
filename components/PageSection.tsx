import tw from 'twin.macro';

interface Props extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  bgDark?: boolean;
}

const PageSection = ({
  title, bgDark = false, children, ...props
}: Props) => (
  <section
    tw="overflow-hidden px-4 py-16 flex flex-col gap-y-12"
    {...props}
  >
    {title && (
      <h2
        tw="font-bold text-6xl"
        css={bgDark ? tw`text-white` : tw`text-gray-900`}
      >
        {title}
      </h2>
    )}

    {children}
  </section>
);

export default PageSection;
