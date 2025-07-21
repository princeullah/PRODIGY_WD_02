let startTime = 0;
    let timer = null; 
    let elapsed = 0;

    const display = document.querySelector(".time");
    const buttons = document.querySelectorAll("button");
    const startBtn = buttons[0];
    const pauseBtn = buttons[1];
    const resetBtn = buttons[2];
    const lapBtn = buttons[3];

    const lapsContainer = document.createElement("div");
    lapsContainer.style.marginTop = "20px";
    lapsContainer.style.textAlign = "center";
    document.body.appendChild(lapsContainer);

    function formatTime(ms) {
        let totalSeconds = Math.floor(ms / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let hundredths = Math.floor((ms % 1000) / 10);

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(hundredths).padStart(2, '0')}`;
    }

    function updateDisplay() {
        const now = Date.now();
        const diff = now - startTime + elapsed;
        display.textContent = formatTime(diff);
    }

    startBtn.onclick = () => {
        if (!timer) {
            startTime = Date.now();
            timer = setInterval(updateDisplay, 10); 
        }
    };

    pauseBtn.onclick = () => {
        if (timer) {
            clearInterval(timer); 
            timer = null;
            elapsed += Date.now() - startTime;
        }
    };

    resetBtn.onclick = () => {
        clearInterval(timer); 
        timer = null;        
        startTime = 0;
        elapsed = 0;
        display.textContent = "00:00:00";
        lapsContainer.innerHTML = "";
    };

    lapBtn.onclick = () => {
        const time = display.textContent;
        const lap = document.createElement("p");
        lap.textContent = `Lap ${lapsContainer.children.length + 1}: ${time}`;
        lap.style.color = "white";
        lap.style.margin = "5px 0";
        lapsContainer.appendChild(lap);
    };