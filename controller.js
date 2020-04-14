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
    PHI += ((PHI_slider.value / 100).toFixed(2) - PHI)
    PHI_value.textContent = floor(PHI * 100) + " %";
});

const P_DETECTION_slider = document.querySelector('#P_DETECTION-slider');
const P_DETECTION_value = document.querySelector('#P_DETECTION-value');
P_DETECTION_slider.addEventListener('input', e => {
    P_DETECTION += ((P_DETECTION_slider.value / 100).toFixed(2) - P_DETECTION)
    P_DETECTION_value.textContent = floor(P_DETECTION * 100) + " %";
});

const PID_slider = document.querySelector('#PID-slider');
const PID_value = document.querySelector('#PID-value');
PID_slider.addEventListener('input', e => {
    PID += ((PID_slider.value / 100).toFixed(2) - PID)
    PID_value.textContent = floor(PID * 100) + " %";
});

const PTRAVEL_slider = document.querySelector('#PTRAVEL-slider');
const PTRAVEL_value = document.querySelector('#PTRAVEL-value');
PTRAVEL_slider.addEventListener('input', e => {
    PTRAVEL += ((PTRAVEL_slider.value / 100).toFixed(2) - PTRAVEL)
    PTRAVEL_value.textContent = floor(PTRAVEL * 100) + " %";
});

const REPULSE_slider = document.querySelector('#REPULSE-slider');
const REPULSE_value = document.querySelector('#REPULSE-value');
REPULSE_slider.addEventListener('input', e => {
    REPULSE += ((REPULSE_slider.value / 100).toFixed(2) - REPULSE)
    REPULSE_value.textContent = floor(REPULSE * 100) + " %";
});

const PCENTRAL_LOCATIONS_slider = document.querySelector('#PCENTRAL_LOCATIONS-slider');
const PCENTRAL_LOCATIONS_value = document.querySelector('#PCENTRAL_LOCATIONS-value');
PCENTRAL_LOCATIONS_slider.addEventListener('input', e => {
    PCENTRAL_LOCATIONS += ((PCENTRAL_LOCATIONS_slider.value / 100).toFixed(2) - PCENTRAL_LOCATIONS)
    PCENTRAL_LOCATIONS_value.textContent = floor(PCENTRAL_LOCATIONS * 100) + " %";
});

const FPS_slider = document.querySelector('#FPS-slider');
const FPS_value = document.querySelector('#FPS-value');
FPS_slider.addEventListener('input', e => {
    FPS += (FPS_slider.value - FPS)
    FPS_value.textContent = FPS;
});

function setupControls() {
    PHI_slider.value = floor(PHI * 100);
    PHI_value.textContent = floor(PHI * 100) + " %";

    P_DETECTION_slider.value = floor(P_DETECTION * 100);
    P_DETECTION_value.textContent = floor(P_DETECTION * 100) + " %";

    PID_slider.value = floor(PID * 100);
    PID_value.textContent = floor(PID * 100) + " %";

    PTRAVEL_slider.value = floor(PTRAVEL * 100);
    PTRAVEL_value.textContent = floor(PTRAVEL * 100) + " %";

    REPULSE_slider.value = floor(REPULSE * 100);
    REPULSE_value.textContent = floor(REPULSE * 100) + " %";

    PCENTRAL_LOCATIONS_slider.value = floor(PCENTRAL_LOCATIONS * 100);
    PCENTRAL_LOCATIONS_value.textContent = floor(PCENTRAL_LOCATIONS * 100) + " %";

    FPS_slider.value = FPS;
    FPS_value.textContent = FPS;
}

function updateStatsDisplay(healthyCount, infectedCount, deceasedCount) {
    $("#healthy-count").html(healthyCount);
    $("#infected-count").html(infectedCount);
    $("#deceased-count").html(deceasedCount);
}
