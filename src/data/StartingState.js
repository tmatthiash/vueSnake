import { map } from "../map"

export const startingState = {
    gameMap: map,
    xLocation: 3,
    yLocation: 3,
    snakeBody: [],
    keyPress: null,
    lastKeyPress: null,
    snakeLength: 5, 
    gameScore: 0,
    snakeFood: {},
    gameSpeed: 90,
    intervalId: null,
    isFoodTeleporting: false
}