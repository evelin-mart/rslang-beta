
const styles = {
  headerMenu: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    rowGap: 1,
    width: '100%',
  },

  headerMenu_column: {
    flexDirection: 'column',
  },

  headerMenuLink: {
    display: 'block',
    position: 'relative',
    whiteSpace: 'nowrap',

    '&:visited': {
      color: 'inherit',
    }
  },

  headerSubmenuMainLink: {
    cursor: 'pointer',
    color: 'primary.contrastText',
    '&:hover': {
      textDecoration: 'none'
    }
  },

  headerMenuLink_active: {
    backgroundColor: 'transparent',

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -5,
      left: 0,
      width: '100%',
      height: 2,
      backgroundColor: 'primary.contrastText',
    },
  },
};

export default styles;
