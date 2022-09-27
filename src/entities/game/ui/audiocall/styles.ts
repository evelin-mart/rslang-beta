const styles = {
  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexBasis: '100%',
  },
  
  answersContainer: {
    display: "flex",
    columnGap: 2,
    justifyContent: "center",
    flexWrap: "wrap",
    mt: { xs: 1, sm: 5 },
    width: '100%',
  },

  answerButton: {
    fontSize: "1rem",
    textTransform: "none",
    minWidth: "fit-content",
    maxWidth: 200,
  },

  nextButton: {
    display: "flex",
    justifyContent: "center",
    mt: { xs: 1, sm: 5 },
  }
}

export default styles;