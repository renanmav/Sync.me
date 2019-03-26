/* eslint-disable react/forbid-prop-types */
import Link from 'next/link';
import PropTypes from 'prop-types';

import { Toolbar, withStyles, Button } from '@material-ui/core';

import MenuDrop from './MenuDrop';

const optionsMenu = [
  {
    text: 'Logout',
    href: '/logout',
  },
];

const styles = (theme) => ({
  toolbar: {
    background: theme.palette.common.white,
    height: theme.spacing.unit * 8,
    padding: `0px ${theme.spacing.unit * 3}px`,
  },
  grow: {
    flexGrow: 1,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    cursor: 'pointer',
    height: 42,
  },
  loginButton: {
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
});

const Header = ({ user, classes }) => (
  <Toolbar className={classes.toolbar}>
    <Link prefetch href="/">
      <a className={classes.center}>
        <img src="/static/images/logo.svg" alt="Sync.me logo" className={classes.image} />
      </a>
    </Link>
    <div className={classes.grow} />
    {user ? (
      <div style={{ whiteSpace: 'nowrap' }}>
        {user.avatarUrl ? (
          <MenuDrop options={optionsMenu} src={user.avatarUrl} alt={user.displayName} />
        ) : null}
      </div>
    ) : (
      <Button color="primary" className={classes.loginButton}>
        <Link prefetch href="/login">
          <a>Login</a>
        </Link>
      </Button>
    )}
  </Toolbar>
);

Header.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
  }),
  classes: PropTypes.object.isRequired,
};

Header.defaultProps = {
  user: null,
};

export default withStyles(styles)(Header);
