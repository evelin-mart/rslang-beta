import { Box, Theme } from '@mui/material';
import React from 'react';
import styles from './styles.module.scss';
import iconReverseImg from 'shared/images/icon-reverse.svg';

const front = {
  transform: 'perspective(600px) rotateY(0)',
  background: ({ palette : { primary }}: Theme) => (
    `url(${iconReverseImg}) no-repeat center, linear-gradient(${primary.contrastText}, ${primary.main})`
  ),
}

export const DeveloperCard = (props: {name: string, image: string, description: string}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Box className={styles.front} sx={front}>
        </Box>
        <Box className={styles.back} sx={{ bgcolor: "background.default"}}>
          <div className={styles.imageWrapper}>
            <img src={props.image} alt="avatar" className={styles.avatar} />
          </div>
          <div className={styles.content}>
            <h4>
              {props.name}
            </h4>
            <p>
              {props.description}
            </p>
          </div>
        </Box>
      </div>
    </div>
  )
}
