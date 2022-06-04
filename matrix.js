// THE MATRIX CODE EFFECT
// (c) 2022 by Erick Levy

// Optional sets of characters
const ROMAN_CHARS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789!#$%&+-*/^~[]{}()¿?¡!';
const CYRILLIC_CHARS = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЩЮЯ';
const JAPANESE_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモユヨラリルレロワヰヱヲン〇一二三四五六七八九十';
const KOREAN_CHARS = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㄲㄸㅃㅆㅉ';
const CUSTOM_CHARS = 'HILLARY';

// Selected set(s) of characters (concatenate to use two or more)
const MATRIX_CHARS = JAPANESE_CHARS;

// Custom colors for the trail of chars

const COLOR_SCHEMES = {

    MATRIX: {
        r: 'f0',
        g: 'ff',
        b: 'f0',
    },

    PRIDE: {
        r: 'fff000f3',
        g: 'f0fff009',
        b: 'f000fff3',
    },

}

// Selectaed trail color scheme (default MATRIX)
const TRAIL_COLOR = COLOR_SCHEMES.PRIDE;

// Size of code (default 12 px)
const TILE_SIZE = 12;
const FONT_SIZE = 12;

// Interval for animation (default 50ms)
const MILISECONDS = 50;
// Animation interval timer (initially null)
var interval = null;

// Get the draw context for the canvas
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

const dec2hex = (dec) => ('0123456789abcdef')[dec % 16];

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
        this.ymax = h + h / 2 * Math.random();
        this.color = TRAIL_COLOR;
        this.trail = Array(Math.max(...Object.values(this.color).map(x => x.length))).fill('');
    }
}

// Array of columns
const cols = Math.floor(w / TILE_SIZE) + 1;
const arrCols = [];
for (let i = 0; i < cols; i++) { arrCols.push(new Column()) }

/**
 * Create the matriz effect generating the char, updating positions and displaying each column
 */
function matrix() {

    // Fade to black
    ctx.fillStyle = '#0001'; // The fourth number is the alpha or opacity component
    ctx.fillRect(0, 0, w, h);

    // Set the font family and size
    ctx.font = FONT_SIZE + 'px monospace';

    // Update columns
    arrCols.forEach((item, index) => {
        const m = pickOne(MATRIX_CHARS);
        const x = index * TILE_SIZE;
        const y = item.y;
        // Trail generation
        let t = item.trail.length;
        // This cycle goes from the last to the first element in the trail
        while (t > 0) {
            t -= 1;
            if (t > 0) {
                // Copy the matrix char from previous trail positions
                item.trail[t] = item.trail[t - 1];
            } else {
                // Use the new one in first position
                item.trail[t] = m;
            }
            // If there is a matrix char in this trail position
            if (item.trail[t] > '') {
                let r = item.color.r[t < item.color.r.length ? t : item.color.r.length];
                let g = item.color.g[t < item.color.g.length ? t : item.color.g.length];
                let b = item.color.b[t < item.color.b.length ? t : item.color.b.length];
                ctx.fillStyle = `#${r}${g}${b}`;
                ctx.fillText(item.trail[t], x, y - t * TILE_SIZE);
            }
        }
        // Check this column position (plus a random bias) to determine whether to reset or increment
        if (y > item.ymax) {
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
    return chars[Math.floor(Math.random() * chars.length)];
}

// EVENT MANAGEMENT

// Reloads when windows size changes to readjust the canvas size
window.onresize = () => { location.reload() }

// Detects keyboard codes to pause/play the matrix
window.onkeyup = (e) => {
    if (e.code === 'Space' || e.key === 'MediaPlayPause') {
        togglePlayPause();
    }
}

function togglePlayPause() {
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    } else {
        interval = setInterval(matrix, MILISECONDS);
    }
}

// Run the matrix
togglePlayPause();

// End of code.