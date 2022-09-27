import { Typography } from '@mui/material';
import React from 'react';

type FormErrorsProps = {
  errors: {
    path: string,
    message: string
  }[]
}
export const FormErrors = (props: FormErrorsProps) => {
  const { errors } = props;
  const renderedErrors = errors
    .map(({ path, message }) => (
      <Typography
        component="span"
        sx={{ display: "block", fontSize: 14 }}
        key={path[0]}>
        {message}
      </Typography>
    ));
  return (
    <>
      {renderedErrors}
    </>
  )
};