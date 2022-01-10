<template>
  <!-- <div 
        class="game-grid-cell" 
        :class="{ 'is-wall': gameMap[indexX][indexY] === 'W',
        'game-grid-snake-body' : locationIsSnakeBody(indexX, indexY) }" 
        :key="y" 
        v-for="(y, indexY) in x">
            <div class="game-grid-snake-head" v-if="indexX === xLocation && indexY === yLocation" />
            <div 
                class="game-grid-snake-food" 
                :class="'food-type-' + snakeFood.type"
                v-if="indexX === snakeFood.x && indexY === snakeFood.y" />
        </div> -->
  <div v-if="gameMap !== undefined">
    <game-cell
      :key="indexX + indexY"
      :cellClass="buildClassNames(indexX, indexY)"
      v-for="(y, indexY) in x"
    />
  </div>
</template>

<script>
import GameCell from "./GameCell.vue";

export default {
  name: "GameRow",
  components: { GameCell },
  props: [
    "gameMap",
    "snakeBody",
    "snakeFood",
    "indexX",
    "xLocation",
    "yLocation",
    "x",
  ],
  methods: {
    locationIsSnakeBody: function (indexX, indexY) {
      const foundMatchingLocation = this.snakeBody.filter((snakeSection) => {
        return snakeSection.x === indexX && snakeSection.y === indexY;
      });
      return foundMatchingLocation.length > 0;
    },
    buildClassNames(indexX, indexY) {
      let className = "game-grid-cell";
      className += ` cell-${indexX}-${indexY}`;
      if (this.gameMap[indexX][indexY] === "W") {
        className += " is-wall";
      }

      return className;
    },
  },
};
</script>

<style scoped></style>
