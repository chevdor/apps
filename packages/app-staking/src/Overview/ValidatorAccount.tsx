// Copyright 2017-2018 @polkadot/app-validator authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { I18nProps } from '@polkadot/ui-app/types';
import { QueueTx$ExtrinsicAdd } from '@polkadot/ui-signer/types';

import React from 'react';
import classes from '@polkadot/ui-app/util/classes';
import IdentityIcon from '@polkadot/ui-react/IdentityIcon';
import RxBalance from '@polkadot/ui-react-rx/Balance';
import withMulti from '@polkadot/ui-react-rx/with/multi';

import translate from '../translate';
import NominatorsFor from './NominatorsFor';

type Props = I18nProps & {
  address: string,
  name: string,
  nominatorsFor?: Array<string>,
  queueExtrinsic: QueueTx$ExtrinsicAdd
};

class Validator extends React.PureComponent<Props> {
  render () {
    const { className, style } = this.props;

    return (
      <div
        className={classes('validator--Account', className)}
        style={style}
      >
        {this.renderAccount()}
      </div>
    );
  }

  private renderAccount () {
    const { address, name, nominatorsFor = [], t } = this.props;
    const isMine = false; // keyring.getAccounts().includes(address)

    return (
      <div className='validator--Account-details'>
        <div>
          <IdentityIcon
            className='validator--Account-icon'
            size={32}
            value={address}
          />
          <div className='validator--Account-info'>
            <div className='validator--Account-name'>{name}</div>
            <div className={classes('validator--Account-address', isMine ? 'isMine' : '')} >{address}</div>
          </div>
        </div>

        <RxBalance
          className='validator--Account-balance'
          label={t('account.balance', {
            defaultValue: 'balance '
          })}
          params={address}
        />
        <NominatorsFor address={address} />
      </div>
    );
  }
}

export default withMulti(
  Validator,
  translate
);
