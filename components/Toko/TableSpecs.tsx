import tw, { styled } from 'twin.macro';

const cellStyle = tw`p-4 text-sm text-left border-[1.5px] border-white`;

export const TH = styled.th(() => [cellStyle, tw`w-40 bg-primary-100 font-bold text-white`]);

export const TD = styled.td(() => [cellStyle, tw`bg-gray-100 font-medium text-gray-700`]);
