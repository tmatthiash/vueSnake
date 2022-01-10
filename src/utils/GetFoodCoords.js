import { MAX_HEIGHT, MAX_WIDTH } from "../map";
import { randomInt } from "./RandomInt";

export const getFoodCoords = (snakeBody) => {
  let coords;
  let collidedSegments;

  do {
    coords = {
      x: randomInt(MAX_WIDTH - 2) + 1,
      y: randomInt(MAX_HEIGHT - 2) + 1,
    };
    collidedSegments = snakeBody.filter((segment) => {
      return segment.x === coords.x && segment.y === coords.y;
    });
  } while (collidedSegments.length > 0);
  return coords;
};
