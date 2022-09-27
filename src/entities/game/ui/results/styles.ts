import { Theme } from '@mui/material';

const styles = {
  answersRow: {
    display: 'flex',
    columnGap: 1,
    alignItems: 'center',
    fontSize: '1rem'
  },

  wordsList: {
    display: 'flex', 
    flexDirection: 'column', 
    rowGap: 1, 
    height: 300, 
    overflow: 'auto',
    
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: ({ palette }: Theme) => palette.grey[200],
    },
    '&::-webkit-scrollbar-thumb': {
      background: ({ palette }: Theme) => palette.secondary.light,
      borderRadius: '2px'
    }
  },

  playButton: {
    p: 0, 
    mr: 1, 
    color: 'info.light', 
    '&:hover': { color: 'grey.700' },
  },

  chartTab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 300,
  },

  title: {
    textAlign: 'center',
    fontSize: { xs: '1.5rem', sm: '2rem'},
    color: 'grey.700',
    mb: 1,
  },

  resultsTitle: {
    fontSize: { xs: "2rem", sm: "3rem" },
    mr: { xs: 1, sm: 3 },
    color: "text.secondary",
  },

  subtitle: {
    textAling: 'center',
  },

  subtitleLink: {
    textDecoration: 'none',
    color: 'text.secondary',
    borderBottom: '1px dashed',
    borderColor: 'grey.400',
    cursor: 'pointer',
  },
  
  pieChart: {
    width: '100%',
    position: 'relative',
    flexBasis: '100%',
    flexGrow: 1,
  },

  percentBox: {
    position: 'absolute', 
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
  },
  
  percentBoxText: {
    color: "success.light",
    fontSize: "3rem"
  },

  tabsStyle: {
    alignItems: 'center',
    columnGap: 1,
    minHeight: 40,
    '& .MuiTabs-flexContainer': { justifyContent: 'flex-end' },
    '& .MuiTabs-indicator': { display: 'none' },
    '& .MuiButtonBase-root': {
      p: 0
    },
  },

  tabStyle: {
    minWidth: { xs: 30, sm: 40 },
    minHeight: 40,
    textTransform: 'none',
    color: 'grey.400',
    '&.Mui-selected': {
      color: 'secondary.main',
    },
  }
}

export default styles;