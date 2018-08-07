// Copyright 2017-2018 @polkadot/app-validator authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BareProps } from '@polkadot/ui-app/types';

import React from 'react';
import storage from '@polkadot/storage';
import classes from '@polkadot/ui-app/util/classes';
import withMulti from '@polkadot/ui-react-rx/with/multi';
import withStorage from '@polkadot/ui-react-rx/with/storage';

import transformAddresses from '../encodeAddresses';

type Props = BareProps & {
  address: string,
  nominatorsFor?: Array<string>
};

class NominatorsFor extends React.PureComponent<Props> {
  render () {
    const { className, nominatorsFor, style } = this.props;

    if (!nominatorsFor || nominatorsFor.length === 0) {
      return null;
    }

    // FIXME: This should just be <AddressMini value={address} />
    // ui-app/AddressMini
    return (
      <div className={classes('validator--NominatorsFor', className)}>
        {nominatorsFor.map((address) => (
          <div>{address}</div>
        ))}
      </div>
    );
  }
}

export default withMulti(
  NominatorsFor,
  withStorage(
    storage.staking.public.nominatorsFor,
    {
      paramProp: 'address',
      propName: 'nominatorsFor',
      transform: transformAddresses
    }
  )
);
