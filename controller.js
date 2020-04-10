function keyTyped() {
    if (key == 'r') {
        reset();
    }
    else if (key == ' ') {
        $('#playpause').click();
    }
}

function reset() {
    setupPopulation();
    redraw();
}

function togglePause() {
    if (paused) {
        paused = false;
        $('#playpause').prop('checked', false);
        loop();
    }
    else {
        paused = true;
        $('#playpause').prop('checked', true);
        noLoop();
    }
}

$('#playpause').on('click', togglePause);
$('#reset').on('click', reset);

// Slider handlers
const PHI_slider = document.querySelector('#PHI-slider');
const PHI_value = document.querySelector('#PHI-value');
PHI_slider.addEventListener('input', e => {
    PHI += (PHI_slider.value / 100 - PHI)
    PHI_value.textContent = PHI;
});

const PIH_slider = document.querySelector('#PIH-slider');
const PIH_value = document.querySelector('#PIH-value');
PIH_slider.addEventListener('input', e => {
    PIH += (PIH_slider.value / 100 - PIH)
    PIH_value.textContent = PIH;
});

const REPULSE_slider = document.querySelector('#REPULSE-slider');
const REPULSE_value = document.querySelector('#REPULSE-value');
REPULSE_slider.addEventListener('input', e => {
    REPULSE += (REPULSE_slider.value / 100 - REPULSE)
    REPULSE_value.textContent = REPULSE;
});

const FPS_slider = document.querySelector('#FPS-slider');
const FPS_value = document.querySelector('#FPS-value');
FPS_slider.addEventListener('input', e => {
    FPS += (FPS_slider.value - FPS)
    FPS_value.textContent = FPS;
});

