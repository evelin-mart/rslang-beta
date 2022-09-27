const styles = {

  menuOpenedMainStyles: {
    position: 'fixed',
    top: 'var(--header-height)',
    width: '100%',
  },

  menuOpenedBgStyles: (scrollbarWidth: number) => ({
    pr: `${scrollbarWidth}px`,
    backgroundPosition: `calc(50% - ${scrollbarWidth / 2}px) top`,
  }),
}

export default styles;