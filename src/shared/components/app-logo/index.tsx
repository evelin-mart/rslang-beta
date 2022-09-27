import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, useTheme } from '@mui/material';

export const AppLogo = (props: {isMobile: boolean}) => {
  const { palette } = useTheme();
  
  return (
    <Link style={{
      flexGrow: props.isMobile ? 1 : 0,
      color: palette.primary.contrastText,
    }} to='/'>
      <Typography
        variant="h1"
        sx={{ display: props.isMobile ? "block" : "none", fontSize: "2.2rem"}}
      >
        RSLang
      </Typography>
    </Link>
  )
}
