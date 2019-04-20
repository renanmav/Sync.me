import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Menu } from '@material-ui/core';
import Link from 'next/link';

class MenuDrop extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(String).isRequired,
  };

  state = {
    open: false,
    anchorEl: undefined,
  };

  button = undefined;

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { options, src, alt } = this.props;
    const { open, anchorEl } = this.state;

    return (
      <div>
        <Avatar
          role="presentation"
          aria-owns="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
          onKeyPress={this.handleClick}
          src={src}
          alt={alt}
          style={{ cursor: 'pointer' }}
        />
        <Menu id="simple-menu" anchorEl={anchorEl} open={open} onClose={this.handleClose}>
          <p />
          {options.map((option) => (
            <div id="wrappingLink" key={option.text}>
              <Link prefetch href={option.href} as={option.as || option.href}>
                <a style={{ padding: '0px 20px' }}>{option.text}</a>
              </Link>
              <p />
            </div>
          ))}
        </Menu>
      </div>
    );
  }
}

export default MenuDrop;
