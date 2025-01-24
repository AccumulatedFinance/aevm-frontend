import { Typography, Divider } from "@mui/joy";
import React, { FC } from "react";



import logo from '../resources/logo-mark.svg';

interface IProps {
}

const Footer: FC<IProps> = () => {
  return (
    <>
      <Divider sx={{ mb: 1.5 }}>
        <img src={logo} alt="Accumulated Finance" className="logo" />
      </Divider>
      <Typography sx={{ mb: 1 }}>
        &copy; {new Date().getFullYear()} AEVM. All rights reserved.
      </Typography>
    </>
  )
}

export default Footer;