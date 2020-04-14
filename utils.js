function randomIntFromRange(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function onMobile() {
    return $(window).width() < 768;
}

function squaredDistance(x1, y1, x2, y2) {
    return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
}
