function randomIntFromRange(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function onMobile() {
    return $(window).width() < 500;
}
