// Copyright 2017-2018 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import encodeAddress from '@polkadot/util-keyring/address/encode';

// FIXME: This will go away after https://github.com/polkadot-js/apps/issues/128 lands
export default function transformAddresses (publicKeys: Array<Uint8Array>) {
  return publicKeys.map(encodeAddress);
}
