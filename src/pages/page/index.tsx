import { Typography, Grid, Container, Box } from '@mui/material';
import React from 'react';
import { ResponsiveAppBar } from 'widgets/header';
import { Footer } from 'widgets/footer';
import { PAGES } from 'shared/constants';
import pagesBackgrounds from 'app/styles/pages-backgrounds';
import { useScrollbarWidth } from 'shared/lib';
import styles from './style';
import { useUi } from 'shared/lib/store/ui';

export type PageProps = {
  pageName: PAGES;
  title?: string;
  children?: React.ReactNode;
  pt?: number;
};

export const Page = (props: PageProps) => {
  const { scrollbarWidth } = useScrollbarWidth();
  const { isBodyOverflow } = useUi();
  const { pageName, title, children, pt } = props;
  const isFooter = pageName !== PAGES.GAME;
  
  const { bg = '', filter = '' } = pagesBackgrounds[pageName] || {};

  return (
    <>
      <ResponsiveAppBar />
      <Box component="main" sx={[
        { display: "flex" },
        isBodyOverflow && styles.menuOpenedMainStyles,
      ]}>
        <Box sx={[
          { background: bg, flexGrow: 1 },
          isBodyOverflow && styles.menuOpenedBgStyles(scrollbarWidth),
        ]}>
          <Box sx={{ backdropFilter: filter, height: "100%" }}>
            <Container maxWidth="lg" sx={{
              display: "flex", flexDirection: "column",
              height: "100%", 
              pb: 5, 
              pt: title ? 2 : 0 }}>
              {title &&
                <Typography variant='h6' marginBottom={2}>
                  {title}
                </Typography>}
              <Grid sx={{ flexGrow: 1, pt: pt !== undefined ? pt : (title ? 0 : 3) }}>
                {children}
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>
      {isFooter && <Footer />}
    </>
  );
};
