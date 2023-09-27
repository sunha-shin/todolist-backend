import { customAlphabet } from 'nanoid';

export const getNanoId = () => {
  const id = customAlphabet('0123abcd', 8);
  return id();
};
