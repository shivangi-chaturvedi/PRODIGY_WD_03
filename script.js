let startTime;
let running = false;
let lapStartTime;

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - (lapStartTime || 0);
        lapStartTime = 0;
        running = true;
        update();
    }
}

function pauseStopwatch() {
    if (running) {
        lapStartTime = Date.now() - startTime;
        running = false;
    }
}

function resetStopwatch() {
    startTime = 0;
    lapStartTime = 0;
    running = false;
    lapId = 1;
    update();
    document.getElementById('display').textContent = '00:00:00'; // Update display
    document.getElementById('lapList').innerHTML = '';
}


function lap() {
    if (running) {
        const lapTime = Date.now() - startTime;
        const formattedTime = formatTime(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = formattedTime;
        document.getElementById('lapList').appendChild(lapItem);
    }
}

function update() {
    if (running) {
        const elapsedTime = Date.now() - startTime;
        const formattedTime = formatTime(elapsedTime);
        document.getElementById('display').textContent = formattedTime;
        requestAnimationFrame(update);
    }
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = String(milliseconds % 1000).padStart(3, '0');
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${millisecondsFormatted}`;
}

resetStopwatch();  // Initialize the display