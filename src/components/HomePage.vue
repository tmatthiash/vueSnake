<template>
    <div>Score: {{snakeLength-5}}</div>
    <game-grid 
        :gameMap="gameMap" 
        :xLocation="xLocation" 
        :yLocation="yLocation" 
        :snakeBody="snakeBody"
        :snakeFood="snakeFood"
        />
</template>

<script>
import GameGrid from './GameGrid.vue'
import { map, MAX_HEIGHT, MAX_WIDTH } from '../map'

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
            lastKeyPress: null,
            snakeLength: 5,
            snakeFood: {}
        };
    },
    methods: {
        hasColided() {
            if(this.yLocation === 0) return true;
            if(this.xLocation === 0) return true;
            if(this.xLocation === MAX_WIDTH-1) return true;
            if(this.yLocation === MAX_HEIGHT-1) return true;

            const collisionsWithSelf = this.snakeBody.filter((snakeSection) => {
                return snakeSection.x === this.xLocation && snakeSection.y === this.yLocation
            })
            if(collisionsWithSelf.length > 0) return true;

            return false;
        },
        hasHitFood() {
            return this.xLocation === this.snakeFood.x && this.yLocation === this.snakeFood.y;
        },
        getRandomInt(maxNumber) {
            return Math.floor(Math.random() * maxNumber);
        },
        moveSnake() {
            switch(this.keyPress) {
                case 'w':                    
                    if(this.lastKeyPress !== 's') {
                        this.lastKeyPress = this.keyPress;
                        this.yLocation -=1;
                    }
                    else {
                        this.yLocation +=1
                    }
                    break;
                case 's':
                    if(this.lastKeyPress !== 'w') {
                        this.lastKeyPress = this.keyPress;
                        this.yLocation +=1;
                    }
                    else {
                        this.yLocation -=1
                    }
                    break;
                case 'a':
                    if(this.lastKeyPress !== 'd') {
                        this.lastKeyPress = this.keyPress;
                        this.xLocation -=1;
                    }
                    else {
                        this.xLocation +=1
                    }
                    break;
                case 'd':
                    if(this.lastKeyPress !== 'a') {
                        this.lastKeyPress = this.keyPress;
                        this.xLocation +=1;
                    }
                    else {
                        this.xLocation -=1
                    }
                    break;
            }
        }
    },
    mounted() {
        this.gameMap = map;

        this.snakeFood = { x: this.getRandomInt(MAX_WIDTH-2) + 1, y: this.getRandomInt(MAX_HEIGHT-2) + 1, type: this.getRandomInt(2)}

        const intervalID = setInterval(() => {
            this.snakeBody.push({x: this.xLocation, y: this.yLocation});
            if(this.snakeBody.length > this.snakeLength) {
                this.snakeBody.shift();
            }
        
            this.moveSnake();
        
            if(this.keyPress) {

                if(this.hasColided()) {
                    console.log(this.xLocation, this.yLocation)
                    console.log("COLLISION")
                    clearInterval(intervalID);
                }
                if(this.hasHitFood()) {
                    this.snakeLength += 3;
                    this.snakeFood = { x: this.getRandomInt(MAX_WIDTH-2) + 1, y: this.getRandomInt(MAX_HEIGHT-2) + 1 }
                }
            }
            
        }, 100)


        window.addEventListener("keypress", e => {
            this.keyPress = e.key;
    });
    }
}
</script>

<style scoped>
</style>