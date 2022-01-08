<template>
    <div class="legend">
        <h2>Legend</h2>
        <div class="legend-entry">
            <div class="entry-food food-type-0" />
            <h4 class="entry-text">Normal</h4>
        </div>
        <div class="legend-entry">
            <div class="entry-food food-type-1" />
            <h4 class="entry-text">Extra Growth</h4>
        </div>
        <div class="legend-entry">
            <div class="entry-food food-type-2" />
            <h4 class="entry-text">Fast</h4>
        </div>
            <div class="legend-entry">
            <div class="entry-food food-type-3" />
            <h4 class="entry-text">Blink</h4>
        </div>
        <div class="legend-entry">
            <div class="entry-food food-type-4" />
            <h4 class="entry-text">Ghost Mode</h4>
        </div>
        <div class="legend-entry">
            <div class="entry-food food-type-5" />
            <h4 class="entry-text">Invisible Body</h4>
        </div>
        <div class="legend-entry">
            <div class="entry-food food-type-6" />
            <h4 class="entry-text">Bonus Score</h4>
        </div>
        <div class="legend-entry">
            <div class="entry-food food-type-7" />
            <h4 class="entry-text">No Growth</h4>
        </div>
    </div>
</template>

<script>
export default {
    name: "Legend"
}
</script>

<style scoped>
.legend-entry {
    display: flex;
    margin: 5px 0;
}

.entry-food {
    height: 15px;
    width: 15px;
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
    background-color: magenta ;
}

.food-type-4 {
    background-color: darkgrey ;
}

.food-type-5 {
    background-color: yellow ;
}

.food-type-6 {
    background-color: orange; 
}

.food-type-7 {
    background-color: black; 
}

.entry-text {
    margin: 0 20px;
}

</style>