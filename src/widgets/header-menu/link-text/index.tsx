import { Typography } from '@mui/material';
import React from 'react';
import styles from '../styles';

type MenuLinkTextProps = {
  isColumn: boolean;
  title: string;
  isActive?: boolean;
}

export const MenuLinkText = ({ isColumn, title, isActive }: MenuLinkTextProps) => {
  return (
    <Typography
      component="span"
      width="fit-content"
      variant={isColumn ? "h5" : "subtitle1"}
      sx={[
        styles.headerMenuLink,
        isActive !== undefined && isActive && styles.headerMenuLink_active
      ]}
    >
      {title}
    </Typography>
  )
}