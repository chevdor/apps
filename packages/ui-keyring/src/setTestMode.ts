// Copyright 2017-2018 @polkadot/ui-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { State } from './types';

import createOptions from './options';

export default function setTestMode (state: State, isTest: boolean): void {
  state.isTestMode = isTest;

  createOptions(state);
}
