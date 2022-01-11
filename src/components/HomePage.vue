<template>
  <div class="score-label">
    Score: {{ gameScore }}. Highscore: {{ retrieveHighScore() }}
  </div>
  <h4 class="explanation-label">
    (Most eggs increase your score and body length by 3)
  </h4>
  <div class="game-wrapper">
    <game-grid
      :gameMap="gameMap"
      :xLocation="xLocation"
      :yLocation="yLocation"
      :snakeBody="snakeBody"
      :snakeFood="snakeFood"
    />
    <Legend />
  </div>
  <!-- <button class="reset-button" v-if="this.intervalId === null" @click="resetGame()">RESET (Space Bar)</button> -->
</template>

<script>
import GameGrid from "./GameGrid.vue";
import { map, MAX_HEIGHT, MAX_WIDTH } from "../map";
import Legend from "./Legend.vue";
import { getFoodCoords } from "../utils/GetFoodCoords";
import { randomInt } from "../utils/RandomInt";
import {
  clearHallucinations,
  generateHallucinations,
} from "../utils/Hallucinations";
import { startingState } from "../data/StartingState";
import { getHighScore, newScore } from "../utils/LocalStorage";

export default {
  name: "HomePage",
  components: {
    GameGrid,
    Legend,
  },
  emits: ["collide", "reset"],
  data() {
    return {
      gameMap: null,
      xLocation: startingState.xLocation,
      yLocation: startingState.yLocation,
      snakeBody: [],
      keyPress: startingState.keyPress,
      lastKeyPress: startingState.lastKeyPress,
      snakeLength: startingState.snakeLength,
      gameScore: startingState.gameScore,
      snakeFood: {},
      gameSpeed: startingState.gameSpeed,
      intervalId: startingState.intervalId,
      isFoodTeleporting: startingState.isFoodTeleporting,
    };
  },
  methods: {
    retrieveHighScore() {
      return getHighScore();
    },
    hasColided() {
      if (this.yLocation === 0) return true;
      if (this.xLocation === 0) return true;
      if (this.xLocation === MAX_WIDTH - 1) return true;
      if (this.yLocation === MAX_HEIGHT - 1) return true;

      if (document.getElementsByClassName("ghost").length > 0) return false;

      const collisionsWithSelf = this.snakeBody.filter((snakeSection) => {
        return (
          snakeSection.x === this.xLocation && snakeSection.y === this.yLocation
        );
      });
      if (collisionsWithSelf.length > 0) return true;

      return false;
    },
    hasHitFood() {
      return (
        this.xLocation === this.snakeFood.x &&
        this.yLocation === this.snakeFood.y
      );
    },
    handleEatFood() {
      this.gameSpeed = 90;
      this.isFoodTeleporting = false;

      if (document.getElementsByClassName("ghost").length > 0)
        this.switchGhostModeTo(false);
      if (document.getElementsByClassName("invisible").length > 0)
        this.switchInvisibleModeTo(false);
      if (document.getElementsByClassName("hallucination").length > 0)
        clearHallucinations();
      if (document.getElementById("game-grid")) {
        document.getElementById("game-grid").classList.remove("earthquake");
      }

      switch (this.snakeFood.type) {
        case 0:
          this.gameScore += 3;
          this.snakeLength += 3;
          break;
        case 1:
          this.gameScore += 3;
          this.snakeLength += 10;
          break;
        case 2:
          this.gameSpeed = 50;
          this.gameScore += 3;
          this.snakeLength += 3;
          break;
        case 3:
          this.gameScore += 3;
          this.snakeLength += 3;
          break;
        case 4:
          this.snakeLength += 3;
          this.gameScore += 3;
          this.switchGhostModeTo(true);
          break;
        case 5:
          this.snakeLength += 3;
          this.gameScore += 3;
          this.switchInvisibleModeTo(true);
          break;
        case 6:
          this.snakeLength += 3;
          this.gameScore += 10;
          break;
        case 7:
          this.gameScore += 3;
          break;
        case 8:
          this.gameScore += 3;
          this.snakeLength += 3;
          break;
        case 9:
          this.gameScore += 3;
          this.snakeLength += 3;
          document.getElementById("game-grid").classList.add("earthquake");
          break;
        case 10:
          this.gameScore += 3;
          this.snakeLength += 3;
          generateHallucinations();
          break;
      }
      this.resetMoveSpeed();
      this.createNewSnakeFood();
    },
    resetMoveSpeed() {
      clearInterval(this.intervalId);
      this.setMovingInterval();
    },
    clearAllOldFoods() {
      const previousFood = document.getElementsByClassName(
        "game-grid-snake-food"
      )[0];
      previousFood?.classList.remove("game-grid-snake-food");
      previousFood?.classList.remove("food-type-0");
      previousFood?.classList.remove("food-type-1");
      previousFood?.classList.remove("food-type-2");
      previousFood?.classList.remove("food-type-3");
      previousFood?.classList.remove("food-type-4");
      previousFood?.classList.remove("food-type-5");
      previousFood?.classList.remove("food-type-6");
      previousFood?.classList.remove("food-type-7");
      previousFood?.classList.remove("food-type-8");
      previousFood?.classList.remove("food-type-9");
      previousFood?.classList.remove("food-type-10");
    },
    createNewSnakeFood() {
      this.clearAllOldFoods();
      const foodType = randomInt(11);
      // const foodType = 10;
      const foodCoords = getFoodCoords(this.snakeBody);
      const newFoodX = foodCoords.x;
      const newFoodY = foodCoords.y;
      this.snakeFood = {
        x: newFoodX,
        y: newFoodY,
        type: foodType,
      };

      const newFood = document.getElementsByClassName(
        `cell-${newFoodX}-${newFoodY}`
      )[0];
      newFood.classList.add("game-grid-snake-food");
      newFood.classList.add(`food-type-${foodType}`);

      if (foodType === 3) {
        this.isFoodTeleporting = true;
      }
    },
    moveSnake() {
      const previousSnakeHead = document.getElementsByClassName(
        "game-grid-snake-head"
      )[0];
      previousSnakeHead?.classList.remove("game-grid-snake-head");
      previousSnakeHead?.classList.add("game-grid-snake-body");

      switch (this.keyPress) {
        case "w":
          if (this.lastKeyPress !== "s") {
            this.lastKeyPress = this.keyPress;
            this.yLocation -= 1;
          } else {
            this.yLocation += 1;
          }
          break;
        case "s":
          if (this.lastKeyPress !== "w") {
            this.lastKeyPress = this.keyPress;
            this.yLocation += 1;
          } else {
            this.yLocation -= 1;
          }
          break;
        case "a":
          if (this.lastKeyPress !== "d") {
            this.lastKeyPress = this.keyPress;
            this.xLocation -= 1;
          } else {
            this.xLocation += 1;
          }
          break;
        case "d":
          if (this.lastKeyPress !== "a") {
            this.lastKeyPress = this.keyPress;
            this.xLocation += 1;
          } else {
            this.xLocation -= 1;
          }
          break;
      }
      const snakeHead = document.getElementsByClassName(
        `cell-${this.xLocation}-${this.yLocation}`
      )[0];
      snakeHead.classList.add("game-grid-snake-head");
    },
    setMovingInterval() {
      this.intervalId = setInterval(() => {
        this.snakeBody.push({ x: this.xLocation, y: this.yLocation });
        if (this.snakeBody.length > this.snakeLength) {
          const removedSection = this.snakeBody.shift();
          const nowOpen = document.getElementsByClassName(
            `cell-${removedSection.x}-${removedSection.y}`
          )[0];
          const snakeSegmentsThatMightNeedToStayBecauseOfGhostMode =
            this.snakeBody.filter((segment) => {
              return (
                segment.x === removedSection.x && segment.y === removedSection.y
              );
            });
          if (snakeSegmentsThatMightNeedToStayBecauseOfGhostMode.length === 0) {
            nowOpen.classList.remove("game-grid-snake-body");
          }
        }

        this.moveSnake();

        if (this.isFoodTeleporting) {
          this.checkToTeleport();
        }

        if (this.keyPress) {
          if (this.hasColided()) {
            newScore(this.gameScore);
            console.log("COLLISION");
            this.$emit("collide");
            this.switchInvisibleModeTo(false);
            clearInterval(this.intervalId);
            this.intervalId = null;
          }
          if (this.hasHitFood()) {
            this.handleEatFood();
          }
        }
      }, this.gameSpeed);
    },
    checkToTeleport() {
      if (randomInt(40) === 0) {
        this.clearAllOldFoods();
        const foodCoords = getFoodCoords(this.snakeBody);
        const newFoodX = foodCoords.x;
        const newFoodY = foodCoords.y;
        this.snakeFood = {
          x: newFoodX,
          y: newFoodY,
          type: 3,
        };
        const newFood = document.getElementsByClassName(
          `cell-${newFoodX}-${newFoodY}`
        )[0];
        newFood.classList.add("game-grid-snake-food");
        newFood.classList.add("food-type-3");
      }
    },
    switchGhostModeTo(on) {
      if (on) {
        const ghosts = document.getElementsByClassName("game-grid-cell");
        for (let i = 0; i < ghosts.length; i++) {
          ghosts[i].classList.add("ghost");
        }
      } else {
        const ghosts = document.getElementsByClassName("game-grid-cell");
        for (let i = 0; i < ghosts.length; i++) {
          ghosts[i].classList.remove("ghost");
        }
      }
    },
    switchInvisibleModeTo(on) {
      if (on) {
        const ghosts = document.getElementsByClassName("game-grid-cell");
        for (let i = 0; i < ghosts.length; i++) {
          ghosts[i].classList.add("invisible");
        }
      } else {
        const ghosts = document.getElementsByClassName("game-grid-cell");
        for (let i = 0; i < ghosts.length; i++) {
          ghosts[i].classList.remove("invisible");
        }
      }
    },
  },
  mounted() {
    this.gameMap = map;

    setTimeout(() => {
      this.createNewSnakeFood();
    }, 200);

    this.setMovingInterval();

    window.addEventListener("keypress", (e) => {
      if (e.key === " ") {
        this.$emit("reset");
      }
      const allowedKeys = ["w", "a", "s", "d"];
      if (allowedKeys.includes(e.key)) {
        this.keyPress = e.key;
      }
    });
  },
};
</script>

<style scoped>
.game-wrapper {
  display: flex;
  justify-content: center;
}

.score-label {
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 10px;
}

.explanation-label {
  margin: 10px;
  font-size: 13px;
  font-weight: normal;
}
</style>
