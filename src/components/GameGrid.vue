<template>
    <div class="game-grid" v-if="gameMap !== null">
        <div class="game-grid-column" :key="x" v-for="(x, indexX) in gameMap">
             <div 
                class="game-grid-cell" 
                :class="{ 'is-wall': gameMap[indexX][indexY] === 'W' }" 
                :key="y" 
                v-for="(y, indexY) in x">
                 <div class="game-grid-snake-head" v-if="indexX === xLocation && indexY === yLocation" />
                 <div class="game-grid-snake-body" v-if="locationIsSnakeBody(indexX, indexY)" />
                 <div 
                    class="game-grid-snake-food" 
                    :class="'food-type-' + snakeFood.type"
                    v-if="indexX === snakeFood.x && indexY === snakeFood.y" />
             </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameGrid',
    props: ["gameMap", "xLocation", "yLocation", "snakeBody", "snakeFood"],
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
    height: 10px;
    width: 10px;
    /* border: 1px solid lightgray; */
}

.game-grid-snake-head {
    position: absolute;
    height: 10px;
    width: 10px;
    background-color: red;
}

.game-grid-snake-body {
    position: absolute;
    height: 10px;
    width: 10px;
    background-color: purple;
}

.game-grid-snake-food {
    position: absolute;
    height: 10px;
    width: 10px;
    background-color: green;
    border-radius: 40%;
}

.food-type-0 {
    background-color: green; 
}

.food-type-1 {
    background-color: blue; 
}

.food-type-2 {
    background-color: red; 
}

.is-wall {
    background-color: black;
}
</style>