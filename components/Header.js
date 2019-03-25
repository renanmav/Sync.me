import Link from 'next/link';
import PropTypes from 'prop-types';

import { Toolbar, Grid, Avatar } from '@material-ui/core';

import { styleToolbar } from './SharedStyles';

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
            <img
              src="/static/images/favicon32.png"
              alt="Sync.me logo"
              style={{ margin: '0px auto 0px px', cursor: 'pointer' }}
            />
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
              <Avatar
                src={user.avatarUrl}
                alt={user.displayName}
                style={{ margin: '0px auto 0px 20px' }}
              />
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
