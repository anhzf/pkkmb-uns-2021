import { InView } from 'react-intersection-observer';
import tw from 'twin.macro';

interface Props extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  bgDark?: boolean;
  triggerTitleAnimationOnce?: boolean;
}

const PageSection = ({
  title, bgDark = false, triggerTitleAnimationOnce, children, ...props
}: Props) => (
  <section
    tw="overflow-hidden px-4 py-16 flex flex-col gap-y-12"
    {...props}
  >
    {title && (
      <InView triggerOnce={triggerTitleAnimationOnce}>
        {({ inView, ref }) => (
          <div
            ref={ref}
            className="overflow-hidden"
          >
            <h2
              tw="font-bold text-6xl"
              css={bgDark ? tw`text-white` : tw`text-gray-900`}
              className={`animate__animated ${inView ? 'animate__slideInUp' : 'translate-y-full'}`}
            >
              {title}
            </h2>
          </div>
        )}
      </InView>
    )}

    {children}
  </section>
);

export default PageSection;
