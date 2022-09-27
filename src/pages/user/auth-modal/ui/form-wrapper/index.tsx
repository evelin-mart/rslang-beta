import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';

type FormWrapperProps = {
  handleButtonClick: () => void;
  buttonText: string;
  title: string;
  children: React.ReactNode;
  loading: boolean;
}

export const FormWrapper = (props: FormWrapperProps) => {
  const { handleButtonClick, title, children, buttonText, loading } = props;
  return (
    <Paper sx={{ p: 3, flexBasis: 400, flexShrink: 1 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ color: "primary", mb: 3, textAlign: "center" }}>
        {title}
      </Typography>
      {children}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          disabled={loading}
          sx={{ textTransform: "none", mt: 2, fontWeight: 400 }}
          onClick={handleButtonClick}
          variant="text">
          {buttonText}
        </Button>
      </Box>
    </Paper>
  )
}