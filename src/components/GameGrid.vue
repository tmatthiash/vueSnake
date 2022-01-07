<template >
    <div class="game-grid" v-if="gameMap !== null">
        <div class="game-grid-column" :key="x" v-for="(x, indexX) in gameMap">
             <!-- <div 
                class="game-grid-cell" 
                :class="{ 'is-wall': gameMap[indexX][indexY] === 'W',
                    'game-grid-snake-body' : locationIsSnakeBody(indexX, indexY) }" 
                :key="y" 
                v-for="(y, indexY) in x"> -->
                <game-row 
                    :gameMap="gameMap" 
                    :snakeFood="snakeFood"
                    :snakeBody="snakeBody" 
                    :indexX="indexX" 
                    :xLocation="xLocation" 
                    :yLocation="yLocation" :x="x" />
                 <!-- <div class="game-grid-snake-head" v-if="indexX === xLocation && indexY === yLocation" />
                 <div 
                    class="game-grid-snake-food" 
                    :class="'food-type-' + snakeFood.type"
                    v-if="indexX === snakeFood.x && indexY === snakeFood.y" />
             </div> -->
        </div>
    </div>
</template>

<script>
import GameRow from "./GameRow.vue"

export default {
    name: 'GameGrid',
    components: { GameRow },
    props: ["gameMap", "xLocation", "yLocation", "snakeBody", "snakeFood"],
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
</style>