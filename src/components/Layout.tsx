import React, { FC, ReactNode } from 'react';
import Box, { BoxProps } from '@mui/joy/Box';
import { Grid, GridProps } from '@mui/joy';
import PropTypes from "prop-types";


interface ILayoutProps {
  children: ReactNode;
}

interface IHeaderProps extends BoxProps {
}

interface IFooterProps extends GridProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> & { Header: React.FC<IHeaderProps> } & { Footer: React.FC<IFooterProps> } = ({ children }) => {
  return (
    <div className="App">
      {/* Other layout components or structure */}
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: (props, propName, componentName, location, propFullName) => {
    const value = props[propName];
    // Check for bigint
    if (typeof value === 'bigint') {
      return new Error(
        `Invalid prop \`${propName}\` of type \`bigint\` supplied to \`${componentName}\`, expected a valid ReactNode.`
      );
    }
    // Default to PropTypes.node validation
    return PropTypes.node(props, propName, componentName, location, propFullName);
  },
};

const Header: FC<IHeaderProps> = (props) => {
  return (
    <Box
      component="header"
      className="Header navbar"
      {...props}
      sx={[
        {
          p: 2,
          gap: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gridColumn: '1 / -1',
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}
interface IFooterProps extends GridProps {
  children: ReactNode;
}

const Footer: FC<IFooterProps> = ({ children, ...props }) => {
  return (
    <Grid container className="App-footer" {...props}>
      <Grid xs={12} sm={10} padding={4}>
        {children}
      </Grid>
    </Grid>
  );
}

Layout.Header = Header;
Layout.Footer = Footer;

export default Layout;