<template>
    <div class="legend">
        <h2 class="legend-main-label">Egg Type Legend</h2>
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
        <div class="legend-entry">
            <div class="entry-food food-type-8" />
            <h4 class="entry-text">Hides</h4>
        </div>
        <div class="legend-entry">
            <div class="entry-food food-type-9" />
            <h4 class="entry-text">Earthquake</h4>
        </div>
        <div class="legend-entry">
            <div class="entry-food food-type-10" />
            <h4 class="entry-text">Hallucinations</h4>
        </div>
    </div>
</template>

<script>
export default {
    name: "Legend"
}
</script>

<style scoped>
.legend {
    margin-left: 30px;
}

.legend-main-label {
    margin-top: 0;
}

.legend-entry {
    display: flex;
    margin: 5px 0;
}

.entry-food {
    height: 15px;
    width: 15px;
    border: 1px solid black;
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

.food-type-8 {
    background-color: white; 
}

.food-type-9 {
    background: repeating-linear-gradient(
    45deg,
    white 0px,
    white 2px,
    brown 2px,
    brown 4px
  );
}

.food-type-10 {
    background: repeating-radial-gradient(
    circle,
    white 0px,
    white 2px,
    purple 2px,
    purple 4px
  );
}

.entry-text {
    margin: 0 20px;
}

</style>