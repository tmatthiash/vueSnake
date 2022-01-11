export const getHighScore = () => {
  const score = localStorage.getItem("highscore");
  return score ? score : 0;
};

export const newScore = (scoreValue) => {
  const oldScore = localStorage.getItem("highscore");
  if (!oldScore || oldScore < scoreValue) {
    localStorage.setItem("highscore", scoreValue);
  }
};
