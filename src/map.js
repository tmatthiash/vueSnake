export const MAX_WIDTH = 70;
export const MAX_HEIGHT = 40;

export const map = new Array(MAX_WIDTH)

for (var k = 0; k < map.length; k++) {
    map[k] = new Array(MAX_HEIGHT);
}

for (var i = 0; i < MAX_WIDTH; i++) {
    for (var j = 0; j < MAX_HEIGHT; j++) {

        if(i === 0 || j === 0 || i === MAX_WIDTH-1 || j === MAX_HEIGHT-1)
        {
            map[i][j] = 'W'
        } 
        else {
            map[i][j] = ' ';
        }
    }
}
