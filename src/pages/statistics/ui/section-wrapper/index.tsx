import React from 'react';
import { CircularProgress, Grid, Box, Typography } from '@mui/material';

type StatsSectionWrapperProps = React.PropsWithChildren & {
  title: string;
  loading: boolean;
}

export const StatsSectionWrapper = ({ title, loading, children }: StatsSectionWrapperProps) => {

  return (
    <Grid component="section">
      <Typography variant="h5" component="h3" sx={{
        mb: { xs: 2, md: 3 },
        textAlign: "center",
        fontSize: { xs: "1.3rem", md: "1.5rem" },
      }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {loading
          ? <CircularProgress color="secondary"/>
          : children }
      </Box>
    </Grid>
  )
}