import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

let globalUser = null;

const withAuth = ({ loginRequired = true, logoutRequired = false }) => (BaseComponent) =>
  class App extends Component {
    static propTypes = {
      user: PropTypes.shape({
        displayName: PropTypes.string,
        email: PropTypes.string.isRequired,
      }),
      isFromServer: PropTypes.bool.isRequired,
    };

    static defaultProps = {
      user: null,
    };

    componentDidMount() {
      const { user, isFromServer } = this.props;

      if (isFromServer) {
        globalUser = user;
      }

      if (loginRequired && !logoutRequired && !user) {
        Router.push('/login');
        return;
      }

      if (logoutRequired && user) {
        Router.push('/');
      }
    }

    static async getInitialProps(ctx) {
      const isFromServer = !!ctx.req;
      const user = ctx.req ? ctx.req.user : globalUser;

      const props = { user, isFromServer };

      if (BaseComponent.getInitialProps) {
        Object.assign(props, (await BaseComponent.getInitialProps(ctx)) || {});
      }

      return props;
    }

    render() {
      const { user } = this.props;

      if (loginRequired && !logoutRequired && !user) {
        return null;
      }

      if (logoutRequired && user) {
        return null;
      }

      return <BaseComponent {...this.props} />;
    }
  };

export default withAuth;
