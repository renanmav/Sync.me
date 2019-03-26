/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import { compose } from 'recompose';

import withAuth from '../lib/withAuth';
import withLayout from '../lib/withLayout';

const styles = (theme) => ({
  container: {
    textAlign: 'center',
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
  title: {
    margin: `${theme.spacing.unit * 6}px auto`,
    fontSize: theme.spacing.unit * 6,
    fontWeight: 400,
  },
  loginButton: {
    background: theme.palette.common.white,
    height: theme.spacing.unit * 5,
  },
  googleLogo: {
    height: 18,
    marginRight: 10,
  },
});

const Login = ({ classes }) => (
  <div className={classes.container}>
    <Head>
      <title>Login / sync.me</title>
      <meta name="description" content="Login page for sync.me" />
    </Head>
    <p className={classes.title}>Login</p>
    <p>Você ficará logado por 14 dias a menos que você deslogue manualmente.</p>
    <Button variant="contained" className={classes.loginButton} href="/auth/google">
      <img
        src="/static/images/google_logo.svg"
        alt="Logar com o Google"
        className={classes.googleLogo}
      />
      Google Sign-In
    </Button>
  </div>
);

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withAuth({ logoutRequired: true }),
  withLayout(),
  withStyles(styles),
)(Login);
