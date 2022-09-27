import { Page } from 'pages/page';
import { Grid, Theme, Typography } from '@mui/material';
import { Advantages } from 'widgets/advantages';
import { AboutTeam } from 'widgets/about-team';
import { PAGES } from 'shared/constants';

export const MainPage = () => {
  return (
    <Page pageName={PAGES.MAIN}>
      <Grid sx={{ color: "grey.50" }}>
        <Typography component="h2" sx={{
          textShadow: ({ palette }: Theme) => `1px 1px 3px ${palette.text.primary}`,
          mt: 1, mb: 3,
          typography: { xs: 'h5', md: 'h3'}
        }}>
          RSLang - удобное приложение для изучения английского языка!
        </Typography>
        <Grid component="section">
          <Advantages/>
        </Grid>
        <Grid component="section">
          <AboutTeam/>
        </Grid>
      </Grid>
    </Page>
  )
}

