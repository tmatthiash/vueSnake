export const clearAllClasses = () => {
    const allHallucinationCells = document.getElementsByClassName("game-grid-cell");
    for(let j = 0; j < allHallucinationCells.length; j++) {
        allHallucinationCells[j].classList.remove("hallucination");
        allHallucinationCells[j].classList.remove("ghost");
        allHallucinationCells[j].classList.remove("invisible");
        allHallucinationCells[j].classList.remove("game-grid-snake-body");
        allHallucinationCells[j].classList.remove("game-grid-snake-head");
    }

    document.getElementById("game-grid").classList.remove("earthquake");

}