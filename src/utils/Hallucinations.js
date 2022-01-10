import { randomInt } from "./RandomInt";

export const generateHallucinations = () => {
  console.log("generate");
  const allCells = document.getElementsByClassName("game-grid-cell");
  for (let i = 0; i < allCells.length; i++) {
    if (randomInt(8) === 0) {
      allCells[i].classList.add("hallucination");
    }
  }
};

export const clearHallucinations = () => {
  const allHallucinationCells =
    document.getElementsByClassName("game-grid-cell");
  for (let j = 0; j < allHallucinationCells.length; j++) {
    allHallucinationCells[j].classList.remove("hallucination");
  }
};
