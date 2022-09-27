import React from 'react';
import { Page } from 'pages/page';
import { PAGES } from 'shared/constants';
import { useStatistics } from './lib';
import { DailyStats, LongTermStats } from './ui';
import { StatsSectionWrapper } from './ui/section-wrapper/index';
import { Box } from '@mui/material';

export const StatisticsPage = () => {
  const [ loading, stats ] = useStatistics(); 
  return (
    <Page pageName={PAGES.STATISTICS}>
      <StatsSectionWrapper
        loading={loading}
        title={"Статистика пользователя по словам и мини-играм за сегодня"}>
        { stats !== null && <DailyStats stats={stats} /> }
      </StatsSectionWrapper>
      <Box sx={{ mt: 4 }}>
        <StatsSectionWrapper
          loading={loading}
          title={"Долгосрочная статистика по дням"}>
          { stats !== null && <LongTermStats stats={stats} /> }
        </StatsSectionWrapper>
      </Box>
    </Page>
  )
}
