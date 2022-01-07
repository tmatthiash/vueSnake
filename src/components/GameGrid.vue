<template>
    <div class="game-grid" v-if="gameMap !== null">
        <div class="game-grid-column" :key="x" v-for="(x, indexX) in gameMap">
             <div class="game-grid-cell" :key="y" v-for="(y, indexY) in x">{{gameMap[indexX][indexY]}}
                 <div class="game-grid-snake-head" v-if="indexX === xLocation && indexY === yLocation" />
                 <div class="game-grid-snake-body" v-if="locationIsSnakeBody(indexX, indexY)" />
             </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameGrid',
    props: ["gameMap", "xLocation", "yLocation", "snakeBody"],
    methods: {
    locationIsSnakeBody: function(indexX, indexY) {
      const foundMatchingLocation = this.snakeBody.filter((snakeSection) => {
          return snakeSection.x === indexX && snakeSection.y === indexY;
      })
      return foundMatchingLocation.length > 0;
    },
  },
}
</script>

<style scoped>

.game-grid {
    display: flex;
}

.game-grid-column {
    display: flex;
    flex-direction: column;
}

.game-grid-cell {
    height: 20px;
    width: 20px;
    border: 1px solid lightgray;
}

.game-grid-snake-head {
    position: absolute;
    height: 20px;
    width: 20px;
    background-color: red;
}

.game-grid-snake-body {
    position: absolute;
    height: 20px;
    width: 20px;
    background-color: purple;
}
</style>