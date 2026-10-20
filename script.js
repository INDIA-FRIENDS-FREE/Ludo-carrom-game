 let isLudoVolumeOn = true;
let isCarromVolumeOn = true;

let ludoTurns = ["🔴 Red Turn", "🟢 Green Turn", "🟡 Yellow Turn", "🔵 Blue Turn"];
let currentTurnIndex = 0;
let totalActivePlayers = 2;

function goToLudoPage() {
    let name = document.getElementById("username").value;
    if(name == "") { name = "खिलाड़ी"; }
    document.getElementById("page-1").classList.remove("active");
    document.getElementById("page-2").classList.add("active");
    document.getElementById("ludo-welcome-msg").innerText = "चलो खेलते हैं, " + name + "!";
    document.getElementById("ludo-setup").style.display = "block";
    document.getElementById("ludo-gameplay").style.display = "none";
    document.getElementById("ludo-players-section").style.display = "none";
}

function goToCarromPage() {
    let name = document.getElementById("username").value;
    if(name == "") { name = "खिलाड़ी"; }
    document.getElementById("page-1").classList.remove("active");
    document.getElementById("page-3").classList.add("active");
    document.getElementById("carrom-welcome-msg").innerText = "चलो खेलते हैं, " + name + "!";
    document.getElementById("carrom-players-section").style.display = "none";
}

function backToHome() {
    document.getElementById("page-2").classList.remove("active");
    document.getElementById("page-3").classList.remove("active");
    document.getElementById("page-1").classList.add("active");
}

function selectLudoMode(mode) {
    let playerSection = document.getElementById("ludo-players-section");
    if(mode === 'friends') {
        playerSection.style.display = "block";
    } else {
        playerSection.style.display = "none";
        alert("🤖 कंप्यूटर मोड चुना गया! 2 प्लेयर्स का गेमप्ले शुरू हो रहा है।");
        startLudoGameplay(2);
    }
}

function selectCarromMode(mode) {
    let playerSection = document.getElementById("carrom-players-section");
    if(mode === 'friends') {
        playerSection.style.display = "block";
    } else {
        playerSection.style.display = "none";
        alert("🤖 कंप्यूटर मोड चुना गया! गेम जल्द ही शुरू होगा।");
    }
}

// 🎲 15x15 असली लूडो बोर्ड बनाने का फंक्शन
function generateLudoBoard() {
    const board = document.getElementById("ludo-board");
    board.innerHTML = ""; // पुराना साफ़ करें

    // 15x15 की लूपिंग (Total 225 Blocks)
    for (let r = 0; r < 15; r++) {
        for (let c = 0; c < 15; c++) {
            
            // 1. बड़े घर (Houses)
            if (r < 6 && c < 6) {
                if (r === 0 && c === 0) board.innerHTML += `<div class="home-box bg-red" style="grid-area: 1/1/7/7">RED</div>`;
                continue;
            }
            if (r < 6 && c > 8) {
                if (r === 0 && c === 9) board.innerHTML += `<div class="home-box bg-green" style="grid-area: 1/10/7/16">GREEN</div>`;
                continue;
            }
            if (r > 8 && c < 6) {
                if (r === 9 && c === 0) board.innerHTML += `<div class="home-box bg-blue" style="grid-area: 10/1/16/7">BLUE</div>`;
                continue;
            }
            if (r > 8 && c > 8) {
                if (r === 9 && c === 9) board.innerHTML += `<div class="home-box bg-yellow" style="grid-area: 10/10/16/16">YELLOW</div>`;
                continue;
            }

            // 2. सेंटर का होम (Center Home Square)
            if (r >= 6 && r <= 8 && c >= 6 && c <= 8) {
                if (r === 6 && c === 6) board.innerHTML += `<div class="home-box bg-center" style="grid-area: 7/7/10/10">HOME</div>`;
                continue;
            }

            // 3. रास्ते के डिब्बे (Path Cells)
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = r;
            cell.dataset.col = c;

            // सुरक्षित स्थान (Safe Stars) और रंगीन रास्ते
            if (r === 6 && c === 1) cell.classList.add("bg-red"); // Red का स्टार्टिंग
            if (r === 1 && c === 8) cell.classList.add("bg-green"); // Green का स्टार्टिंग
            if (r === 8 && c === 13) cell.classList.add("bg-yellow"); // Yellow का स्टार्टिंग
            if (r === 13 && c === 6) cell.classList.add("bg-blue"); // Blue का स्टार्टिंग

            // होम पाथ (Home Paths)
            if (r === 7 && c >= 1 && c <= 5) cell.classList.add("bg-red");
            if (c === 7 && r >= 1 && r <= 5) cell.classList.add("bg-green");
            if (r === 7 && c >= 9 && c <= 13) cell.classList.add("bg-yellow");
            if (c === 7 && r >= 9 && r <= 13) cell.classList.add("bg-blue");

            // स्टार सेल्स (Safe Zones)
            if ((r===6 && c===1) || (r===2 && c===6) || (r===1 && c===8) || (r===6 && c===12) || (r===8 && c===13) || (r===12 && c===8) || (r===13 && c===6) || (r===8 && c===2)) {
                cell.classList.add("star-cell");
            }

            board.appendChild(cell);
        }
    }

    // गोटियाँ जोड़ना (Tokens)
    addTokensToHouses();
}

// घरों के अंदर गोटियाँ दिखाना
function addTokensToHouses() {
    // हम केवल रेड और ग्रीन की एक-एक टोकन टेस्ट के लिए बोर्ड पर रख रहे हैं
    const startCellRed = document.querySelector('[data-row="6"][data-col="1"]');
    if(startCellRed) startCellRed.innerHTML += `<div class="token token-red"></div>`;

    const startCellGreen = document.querySelector('[data-row="1"][data-col="8"]');
    if(startCellGreen) startCellGreen.innerHTML += `<div class="token token-green"></div>`;
}

function startLudoGameplay(playersCount) {
    totalActivePlayers = playersCount;
    currentTurnIndex = 0;
    
    document.getElementById("ludo-setup").style.display = "none";
    document.getElementById("ludo-gameplay").style.display = "block";
    
    document.getElementById("ludo-turn-indicator").innerText = ludoTurns[currentTurnIndex];
    document.getElementById("ludo-dice").innerText = "1";

    // बोर्ड जनरेट करें
    generateLudoBoard();
}

function exitLudoGameplay() {
    document.getElementById("ludo-gameplay").style.display = "none";
    document.getElementById("ludo-setup").style.display = "block";
    document.getElementById("ludo-players-section").style.display = "none";
}

function rollLudoDice() {
    let diceEl = document.getElementById("ludo-dice");
    let turnEl = document.getElementById("ludo-turn-indicator");
    
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    diceEl.innerText = randomNumber;
    
    currentTurnIndex = (currentTurnIndex + 1) % totalActivePlayers;
    turnEl.innerText = ludoTurns[currentTurnIndex];
}

function setPlayers(gameType, count) {
    alert(gameType.toUpperCase() + " गेम में " + count + " प्लेयर्स का सेटअप सेट हो गया है!");
}

function toggleVolume(gameType) {
    if(gameType === 'ludo') {
        isLudoVolumeOn = !isLudoVolumeOn;
        let btn = document.getElementById("ludo-vol-btn");
        btn.innerText = isLudoVolumeOn ? "🔊 Volume: ON" : "🔇 Volume: OFF";
        btn.style.background = isLudoVolumeOn ? "#e94560" : "#555";
    } else if(gameType === 'carrom') {
        isCarromVolumeOn = !isCarromVolumeOn;
        let btn = document.getElementById("carrom-vol-btn");
        btn.innerText = isCarromVolumeOn ? "🔊 Volume: ON" : "🔇 Volume: OFF";
        btn.style.background = isCarromVolumeOn ? "#e94560" : "#555";
    }
}
