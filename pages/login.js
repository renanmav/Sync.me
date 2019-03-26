/* eslint-disable react/jsx-one-expression-per-line */
import Head from 'next/head';
import { Button } from '@material-ui/core';

import withAuth from '../lib/withAuth';
import withLayout from '../lib/withLayout';
import { styleLoginButton } from '../components/SharedStyles';

const Login = () => (
  <div style={{ textAlign: 'center', margin: '0 20px' }}>
    <Head>
      <title>Login / sync.me</title>
      <meta name="description" content="Login page for sync.me" />
    </Head>
    <p style={{ margin: '45px auto', fontSize: '44px', fontWeight: '400' }}>Login</p>
    <p>Você ficará logado por 14 dias a menos que você deslogue manualmente.</p>
    <Button variant="contained" style={styleLoginButton} href="/auth/google">
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Logar com o Google"
        style={{ height: 18, marginRight: 10 }}
      />
      Google Sign-In
    </Button>
  </div>
);
export default withAuth(withLayout(Login), { logoutRequired: true });
