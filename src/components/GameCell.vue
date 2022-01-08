<template>
    <div :class="cellClass" > </div>
</template>

<script>
export default {
    name: "GameCell",
    props: ["cellClass"],
    updated() {
        console.log("cell updating")
    }
}
</script>

<style scoped>
.ghost {
    opacity: 0.6;
}

.invisible {
    opacity: 0;
}

.game-grid-cell {
    height: 10px;
    width: 10px;
}

.game-grid-snake-body {
    height: 10px;
    width: 10px;
    background-color: purple;
}

.is-wall {
    background-color: black;
    opacity: 1;
}

.game-grid-snake-food {
    opacity: 1;
    height: 10px;
    width: 10px;
    border-radius: 100% 100% 70% 70%;
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

.food-type-3 {
    background-color: magenta; 
}

.food-type-4 {
    background-color: darkgrey; 
}

.food-type-5 {
    background-color: yellow; 
}


.game-grid-snake-head {
    height: 10px;
    width: 10px;
    background-color: rgb(45, 0, 65);
    opacity: 1;
}
</style>