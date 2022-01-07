<template>
    <div>Test</div>
    <game-grid :gameMap="gameMap" :xLocation="xLocation" :yLocation="yLocation" :snakeBody="snakeBody"/>
</template>

<script>
import GameGrid from './GameGrid.vue'
import { map } from '../map'

export default {
    name: 'HomePage',
    components: {
        GameGrid
    },
    data() {
        return {      
            gameMap: null,
            xLocation: 3,
            yLocation: 3,
            snakeBody: [],
            keyPress: null,
            snakeLength: 5
        };
    },
    mounted() {
        this.gameMap = map;
        setInterval(() => {
            this.snakeBody.push({x: this.xLocation, y: this.yLocation});    
            switch(this.keyPress) {
                case 'w':                    
                    this.yLocation -=1;
                    break;
                case 's':
                    this.yLocation +=1;
                    break;
                case 'a':
                    this.xLocation -=1;
                    break;
                case 'd':
                    this.xLocation +=1;
                    break;
            }            
        }, 1000)


        window.addEventListener("keypress", e => {
            this.keyPress = e.key;
    });
    }
}
</script>

<style scoped>
</style>