import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'app/styles/theme';
import { CssBaseline } from '@mui/material';

export const withTheme = (component: JSX.Element) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {component}
  </ThemeProvider>
);
