import React from 'react';
import { Paper, Typography, Box, Stack, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

type StatsItemProps = React.PropsWithChildren & {
  title: string;
  rows: { title: string, value: string | number }[];
}

export const StatsItem = ({ title, rows }: StatsItemProps) => {
  const { palette: { error, success } } = useTheme();
  
  const dataColors = [success.light, error.light];

  const renderRows = () => {
    return rows.map(({ title, value }, i) => {
      const isRightAnswersPercent = (i === 2);
      const correctWordsPercent = isRightAnswersPercent ? parseInt(String(value)) : 0;
      const data = isRightAnswersPercent ? [
        { name: 'Right', value: correctWordsPercent },
        { name: 'Wrong', value: 100 - correctWordsPercent },
      ] : [];
      return (
        <Box key={i}>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            columnGap: 3,
            alignItems: "flex-end",
            pb: 0.5,
            borderBottom: !isRightAnswersPercent ? "dotted 1px #ccc" : "none" }}>
            <Typography variant="h6" sx={{
              color: "grey.700",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: "1.2" }}>
              {title}:
            </Typography>
            {!isRightAnswersPercent &&
              <Typography component="div" sx={{ color: "info.main", fontSize: "1.2rem", lineHeight: "1" }}>
                {value}
              </Typography>}
          </Box>
          {isRightAnswersPercent &&
            <Box sx={{
              width: '100%', height: 150,
              position: 'relative',
              flexBasis: '100%',
              flexGrow: 1,
            }}>
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateY(-50%) translateX(-50%)',
              }}>
                <Typography component="div" sx={{
                  color: "success.light",
                  fontSize: "2.5rem"
                }}>
                  {correctWordsPercent}%
                </Typography>
              </Box>
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <PieChart>
                  <Pie
                    animationDuration={600}
                    data={data}
                    innerRadius={55}
                    outerRadius={60}
                    paddingAngle={(correctWordsPercent === 100 || correctWordsPercent === 0) ? 0 : 3}
                    dataKey="value"
                  >
                    {data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={dataColors[index % dataColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>}
        </Box>)
    })
  }

  return (
    <Paper elevation={3} sx={{ p: 3, minWidth: 270 }}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h5">{title}</Typography>
        {renderRows()}
      </Stack>
    </Paper>
  )
}