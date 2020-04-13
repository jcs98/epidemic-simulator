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

const P_DETECTION_slider = document.querySelector('#P_DETECTION-slider');
const P_DETECTION_value = document.querySelector('#P_DETECTION-value');
P_DETECTION_slider.addEventListener('input', e => {
    P_DETECTION += (P_DETECTION_slider.value / 100 - P_DETECTION)
    P_DETECTION_value.textContent = P_DETECTION;
});

const PID_slider = document.querySelector('#PID-slider');
const PID_value = document.querySelector('#PID-value');
PID_slider.addEventListener('input', e => {
    PID += (PID_slider.value / 100 - PID)
    PID_value.textContent = PID;
});

const PTRAVEL_slider = document.querySelector('#PTRAVEL-slider');
const PTRAVEL_value = document.querySelector('#PTRAVEL-value');
PTRAVEL_slider.addEventListener('input', e => {
    PTRAVEL += (PTRAVEL_slider.value / 100 - PTRAVEL)
    PTRAVEL_value.textContent = PTRAVEL;
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

function setupControls() {
    PHI_slider.value = PHI * 100;
    PHI_value.textContent = PHI;

    P_DETECTION_slider.value = P_DETECTION * 100;
    P_DETECTION_value.textContent = P_DETECTION;

    PID_slider.value = PID * 100;
    PID_value.textContent = PID;

    PTRAVEL_slider.value = PTRAVEL * 100;
    PTRAVEL_value.textContent = PTRAVEL;

    REPULSE_slider.value = REPULSE * 100;
    REPULSE_value.textContent = REPULSE;

    FPS_slider.value = FPS;
    FPS_value.textContent = FPS;
}
