import { Typography, Paper } from '@mui/material';
import React from 'react';

type GameInformationWrapperProps = React.PropsWithChildren & {
  title?: string;
}

export const GameInformationWrapper = ({ title, children }: GameInformationWrapperProps) => {
  return (
    <Paper elevation={3} sx={{ 
      flexBasis: 400, 
      display: "flex", 
      flexDirection: "column", 
      rowGap: title ? 2 : 2,
      p: { xs: 2, sm: 4 },
      height: "fit-content",
    }}>
      {title &&
        <Typography variant="h2" sx={{ 
          textAlign: "center",
          fontSize: { xs: "2rem", sm: "3rem" },
        }}>
          {title}
        </Typography>}
      {children}
    </Paper>
  )
}
