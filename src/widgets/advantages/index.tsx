import { Accordion, AccordionDetails, AccordionSummary, Theme, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import { advantages } from 'shared/constants/advanages'

export const Advantages = () => {

  return (
    <>
      <Typography component="h3" sx={{ 
        typography: { xs: 'h6', md: 'h4'},
        textShadow: ({ palette }: Theme) => `1px 1px 3px ${palette.text.primary}`,
      }}>
        Наши преимущества:
      </Typography>
      <div style={{margin: '5vh auto', width: '80%'}}>
        {advantages.map((item, index) => {
          return (
            <Accordion sx={{mb: 1}} key={index}>
              <AccordionSummary id={`panel${index}-header`} aria-controls={`panel${index}-content`} expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{typography: { xs: 'h6', md: 'h4'}}}>
                  {item.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{fontSize: { xs: '14px', md: '16px'}}}>
                  {item.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </div>
    </>
  )
}
