import Link from 'next/link';
import PropTypes from 'prop-types';

import { Toolbar, Grid } from '@material-ui/core';

import { styleToolbar } from './SharedStyles';
import MenuDrop from './MenuDrop';

const optionsMenu = [
  {
    text: 'Logout',
    href: '/logout',
  },
];

const Header = ({ user }) => (
  <div>
    <Toolbar style={styleToolbar}>
      <Grid container direction="row" justify="space-around" align="center">
        <Grid
          item
          sm={10}
          xs={9}
          style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}
        >
          <Link prefetch href="/">
            <a style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/static/images/logo.svg"
                alt="Sync.me logo"
                style={{ margin: '0px auto 0px px', cursor: 'pointer', width: 45 }}
              />
            </a>
          </Link>
        </Grid>
        <Grid
          item
          sm={1}
          xs={3}
          style={{
            textAlign: 'right',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          {user ? (
            <div style={{ whiteSpace: 'nowrap' }}>
              {user.avatarUrl ? (
                <MenuDrop options={optionsMenu} src={user.avatarUrl} alt={user.displayName} />
              ) : null}
            </div>
          ) : (
            <Link prefetch href="/login">
              <a style={{ margin: '0px 20px 0px auto' }}>Login</a>
            </Link>
          )}
        </Grid>
      </Grid>
    </Toolbar>
  </div>
);

Header.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

Header.defaultProps = {
  user: null,
};

export default Header;
