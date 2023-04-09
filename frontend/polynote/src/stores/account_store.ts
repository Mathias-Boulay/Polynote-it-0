/** Account metadata state */

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { JwtClaims } from '../models/jwt_claims';

const { persistAtom } = recoilPersist();

export const accountState = atom<JwtClaims | undefined>({
  key: 'account',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
