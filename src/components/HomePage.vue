<template>
    <div>Score: {{snakeLength-5}}</div>
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
</template>

<script>
import GameGrid from './GameGrid.vue'
import { map, MAX_HEIGHT, MAX_WIDTH } from '../map'
import Legend from './Legend.vue';

export default {
    name: 'HomePage',
    components: {
        GameGrid,
        Legend
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
            snakeFood: {},
            gameSpeed: 100,
            intervalId: null,
            isFoodTeleporting: false,
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
        handleEatFood() {            
            this.gameSpeed = 100;
            this.isFoodTeleporting = false;
            switch(this.snakeFood.type) {
                case 0:
                    this.snakeLength += 3;
                    break;
                case 1:
                    this.snakeLength += 10;
                    break;                
                case 2:
                    this.gameSpeed = 50;
                    this.snakeLength += 3;                    
                    break;                
                case 3:
                    this.snakeLength += 3;
                    break;
            }
            this.resetMoveSpeed();
            this.createNewSnakeFood(); 
        },
        getRandomInt(maxNumber) {
            return Math.floor(Math.random() * maxNumber);
        },
        resetMoveSpeed() {
            clearInterval(this.intervalId);
            this.setMovingInterval();
        },
        createNewSnakeFood() {
            const foodType = this.getRandomInt(4) 
            this.snakeFood = { 
                x: this.getRandomInt(MAX_WIDTH-2) + 1, 
                y: this.getRandomInt(MAX_HEIGHT-2) + 1, 
                type: foodType 
            }
            if(foodType === 3) {
                this.isFoodTeleporting = true;
            }
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
        },
        setMovingInterval() {
            this.intervalId = setInterval(() => {
            this.snakeBody.push({x: this.xLocation, y: this.yLocation});
            if(this.snakeBody.length > this.snakeLength) {
                this.snakeBody.shift();
            }
        
            this.moveSnake();

            console.log(this.isFoodTeleporting);

            if(this.isFoodTeleporting) {
                this.checkToTeleport()
            }
        
            if(this.keyPress) {

                if(this.hasColided()) {
                    console.log("COLLISION")
                    clearInterval(this.intervalId);
                }
                if(this.hasHitFood()) {
                    this.handleEatFood();
                }
            }
            
        }, this.gameSpeed)
        },
        checkToTeleport() {
            if(this.getRandomInt(30) === 0) {
                this.snakeFood = { 
                    x: this.getRandomInt(MAX_WIDTH-2) + 1, 
                    y: this.getRandomInt(MAX_HEIGHT-2) + 1, 
                    type: 3 
                }
            }
        }
    },
    mounted() {
        this.gameMap = map;

        this.createNewSnakeFood();

        this.setMovingInterval();

        window.addEventListener("keypress", e => {
            this.keyPress = e.key;
    });
    }
}
</script>

<style scoped>
.game-wrapper {
    display: flex;
    justify-content: space-around;
}
</style>