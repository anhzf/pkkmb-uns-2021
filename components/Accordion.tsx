import { Disclosure } from '@headlessui/react';
import tw, { styled } from 'twin.macro';

const styles = {
  head: tw`w-full p-4 bg-primary-200 font-bold text-lg text-left text-white flex justify-between items-center hover:bg-primary-300`,
  body: tw`p-4 bg-primary-200 bg-opacity-10`,
};

const Accordion = Object.assign(Disclosure, {
  styles,
  Head: styled(Disclosure.Button)(styles.head),
  Body: styled(Disclosure.Panel)(styles.body),
});

export default Accordion;
