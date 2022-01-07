<template>
    <div :class="cellClass" > </div>
</template>

<script>
export default {
    name: "GameCell",
    props: ["cellClass"]
}
</script>

<style scoped>
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
}

.game-grid-snake-food {
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

.food-type-3 {
    background-color: magenta; 
}


.game-grid-snake-head {
    height: 10px;
    width: 10px;
    background-color: red;
}
</style>