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
            :key="y"
            :cellClass="buildClassNames(indexX, indexY)"
            v-for="(y, indexY) in x"/>
        </div>
</template>

<script>
import GameCell from './GameCell.vue';

export default {
    name: "GameRow",
    components: { GameCell },
    props: ["gameMap",
        "snakeBody", 
        "snakeFood",
        "indexX", 
        "xLocation", 
        "yLocation", 
        "x"],
    methods: {
        locationIsSnakeBody: function(indexX, indexY) {
            const foundMatchingLocation = this.snakeBody.filter((snakeSection) => {
                return snakeSection.x === indexX && snakeSection.y === indexY;
            })
            return foundMatchingLocation.length > 0;
        },
        buildClassNames(indexX, indexY) {
            let className = "game-grid-cell";
            if(this.gameMap[indexX][indexY] === 'W'){
                className += " is-wall"
            }

            if(indexX === this.xLocation && indexY === this.yLocation) {
                className += " game-grid-snake-head"
            }

            if(this.locationIsSnakeBody(indexX, indexY)) {
                className += " game-grid-snake-body"
            }

            if(indexX === this.snakeFood.x && indexY === this.snakeFood.y) {
                className += " game-grid-snake-food"
                className += " food-type-" + this.snakeFood.type;
            }

            return className
        }
    },
}
</script>

<style scoped>

</style>