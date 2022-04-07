// THE MATRIX EFFECT

// Optional sets of characters
const ROMAN_CHARS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789!#$%&+-*/^~[]{}()¿?¡!';
const CYRILLIC_CHARS = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЩЮЯ';
const JAPANESE_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモユヨラリルレロワヰヱヲン〇一二三四五六七八九十';
const COREAN_CHARS = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㄲㄸㅃㅆㅉ';

// Selected set(s) of characters (concatenate to use two or more)
const MATRIX_CHARS = JAPANESE_CHARS;

// Size of code
const TILE_SIZE = 12;
const FONT_SIZE = 12;

// Interval for animation
const MILISECONDS = 50;

// Used to calculate the trail color
const TRAILS = "f9630";

// Get the draw context for the canvas
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Document body adjust
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.width = '100vw';
document.body.style.height = '100vh';
document.body.style.overflow = 'hidden';

// Adjust canvas to the viewport
canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;

const w = canvas.width;
const h = canvas.height;

// Background rectangle
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, w, h);

// Class for each column
class Column {
    constructor() {
        this.y = Math.floor(Math.random() * h);
        this.trail = Array(TRAILS.length).fill('');
    }
}

// Array of columns
const cols = Math.floor(w / TILE_SIZE) + 1;
const arrCols = [];
for (c = 0; c < cols; c++) { arrCols.push(new Column()) }

/**
 * Create the matriz effect
 */
function matrix() {

    // Fade to black
    ctx.fillStyle = '#0001';
    ctx.fillRect(0, 0, w, h);

    // Set the font family and size
    ctx.font = FONT_SIZE + 'px monospace';

    // Update columns
    arrCols.forEach((item, index) => {
        const text = pickOne(MATRIX_CHARS);
        const x = index * TILE_SIZE;
        const y = item.y;
        // Trail generation
        let tpos = item.trail.length;
        while (tpos > 0) {
            tpos -= 1;
            if (tpos == 0) {
                item.trail[tpos] = text;
            } else {
                item.trail[tpos] = item.trail[tpos - 1];
            }
            if (item.trail[tpos] > '') {
                let c = TRAILS[tpos];
                ctx.fillStyle = `#${c}f${c}`;
                ctx.fillText(item.trail[tpos], x, y - tpos * TILE_SIZE);
            }

        }
        // Check column position (plus a random bias) to reset or increment
        if (y > h + Math.random() * h) {
            arrCols[index].y = 0;
        } else {
            arrCols[index].y += TILE_SIZE;
        }
    });
}

/**
 * Select one random char
 * @param {string} chars Set of possible chars
 * @returns {string} The char picked
 */
function pickOne(chars) {
    const l = chars.length;
    return chars[Math.floor(Math.random() * l)];
}

// Initielize the interval to call the matrix effect
setInterval(matrix, MILISECONDS);

window.onresize = () => { location.reload() }

// End of code.