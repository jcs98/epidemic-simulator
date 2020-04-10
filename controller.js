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

const PID_slider = document.querySelector('#PID-slider');
const PID_value = document.querySelector('#PID-value');
PID_slider.addEventListener('input', e => {
    PID += (PID_slider.value / 100 - PID)
    PID_value.textContent = PID;
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

