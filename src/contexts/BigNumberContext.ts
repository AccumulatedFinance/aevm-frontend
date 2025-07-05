import BigNumber from 'bignumber.js';
import { createContextWithHook } from './generic/contextFactory';

export const [BigNumberContext, useBigNumberContext] = createContextWithHook<BigNumber>();