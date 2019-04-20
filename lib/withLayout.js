import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from 'next/router';
import NProgress from 'nprogress';

import Header from '../components/Header';
import getContext from './context';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const withLayout = () => (BaseComponent) =>
  class App extends Component {
    static propTypes = {
      pageContext: PropTypes.object, //eslint-disable-line
    };

    static defaultProps = {
      pageContext: null,
    };

    constructor(props) {
      super(props);
      const { pageContext } = this.props;
      this.pageContext = pageContext || getContext();
    }

    static getInitialProps(ctx) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx);
      }

      return {};
    }

    componentDidMount() {
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <MuiThemeProvider
          theme={this.pageContext.theme}
          sheetsManager={this.pageContext.sheetsManager}
        >
          <CssBaseline />
          <div>
            <Header {...this.props} pageContext={this.pageContext} />
            <BaseComponent {...this.props} pageContext={this.pageContext} />
          </div>
        </MuiThemeProvider>
      );
    }
  };

export default withLayout;
