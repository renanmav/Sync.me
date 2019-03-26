/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import withLayout from '../lib/withLayout';
import withAuth from '../lib/withAuth';

class Index extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    user: null,
  };

  state = {};

  render() {
    return (
      <div style={{ padding: '10px 45px' }}>
        <Head>
          <title>Dashboard / sync.me</title>
          <meta name="description" content="List of cloud connected devices" />
        </Head>
        <p>Dashboard</p>
      </div>
    );
  }
}

export default compose(
  withAuth({ loginRequired: true }),
  withLayout(),
)(Index);
