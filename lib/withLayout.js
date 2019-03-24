import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/Header';

function withLayout(BaseComponent) {
  // eslint-disable-next-line react/prefer-stateless-function
  class App extends Component {
    render() {
      return (
        <div>
          <CssBaseline />
          <Header {...this.props} />
          <BaseComponent {...this.props} />
        </div>
      );
    }
  }

  return App;
}

export default withLayout;
