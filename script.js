 let isLudoVolumeOn = true; let isCarromVolumeOn = true;
let ludoTurns = ["🔴 Red Turn", "🟢 Green Turn", "🟡 Yellow Turn", "🔵 Blue Turn"];
let ludoColors = ["red", "green", "yellow", "blue"];
let currentTurnIndex = 0; let totalActivePlayers = 2;
let currentDiceValue = 1; let hasRolled = false;

// लूडो गोटियों की पोजीशन ट्रैक करने के लिए (Red और Green टोकन)
let tokenPositions = { red: 0, green: 0 };

function goToLudoPage() {
    let name = document.getElementById("username").value || "खिलाड़ी";
    document.getElementById("page-1").classList.remove("active");
    document.getElementById("page-2").classList.add("active");
    document.getElementById("ludo-welcome-msg").innerText = "चलो खेलते हैं, " + name + "!";
    document.getElementById("ludo-setup").style.display = "block";
    document.getElementById("ludo-gameplay").style.display = "none";
    document.getElementById("ludo-players-section").style.display = "none";
}

function goToCarromPage() {
    let name = document.getElementById("username").value || "खिलाड़ी";
    document.getElementById("page-1").classList.remove("active");
    document.getElementById("page-3").classList.add("active");
    document.getElementById("carrom-welcome-msg").innerText = "चलो खेलते हैं, " + name + "!";
    document.getElementById("carrom-setup").style.display = "block";
    document.getElementById("carrom-gameplay").style.display = "none";
    document.getElementById("carrom-players-section").style.display = "none";
}

function backToHome() {
    document.getElementById("page-2").classList.remove("active");
    document.getElementById("page-3").classList.remove("active");
    document.getElementById("page-1").classList.add("active");
}

function selectLudoMode(mode) {
    if(mode === 'friends') document.getElementById("ludo-players-section").style.display = "block";
    else { startLudoGameplay(2); }
}

function selectCarromMode(mode) {
    if(mode === 'friends') document.getElementById("carrom-players-section").style.display = "block";
    else { startCarromGameplay(2); }
}

// 🎲 15x15 लूडो बोर्ड जनरेटर
function generateLudoBoard() {
    const board = document.getElementById("ludo-board"); board.innerHTML = "";
    for (let r = 0; r < 15; r++) {
        for (let c = 0; c < 15; c++) {
            if (r < 6 && c < 6) { if (r === 0 && c === 0) board.innerHTML += `<div class="home-box bg-red" style="grid-area: 1/1/7/7">RED</div>`; continue; }
            if (r < 6 && c > 8) { if (r === 0 && c === 9) board.innerHTML += `<div class="home-box bg-green" style="grid-area: 1/10/7/16">GREEN</div>`; continue; }
            if (r > 8 && c < 6) { if (r === 9 && c === 0) board.innerHTML += `<div class="home-box bg-blue" style="grid-area: 10/1/16/7">BLUE</div>`; continue; }
            if (r > 8 && c > 8) { if (r === 9 && c === 9) board.innerHTML += `<div class="home-box bg-yellow" style="grid-area: 10/10/16/16">YELLOW</div>`; continue; }
            if (r >= 6 && r <= 8 && c >= 6 && c <= 8) { if (r === 6 && c === 6) board.innerHTML += `<div class="home-box bg-center" style="grid-area: 7/7/10/10">HOME</div>`; continue; }

            let cell = document.createElement("div"); cell.className = "cell"; cell.id = `cell-${r}-${c}`;
            if (r === 6 && c === 1) cell.classList.add("bg-red");
            if (r === 1 && c === 8) cell.classList.add("bg-green");
            if (r === 8 && c === 13) cell.classList.add("bg-yellow");
            if (r === 13 && c === 6) cell.classList.add("bg-blue");
            if (r === 7 && c >= 1 && c <= 5) cell.classList.add("bg-red");
            if (c === 7 && r >= 1 && r <= 5) cell.classList.add("bg-green");
            if (r === 7 && c >= 9 && c <= 13) cell.classList.add("bg-yellow");
            if (c === 7 && r >= 9 && r <= 13) cell.classList.add("bg-blue");
            if ((r===6 && c===1) || (r===2 && c===6) || (r===1 && c===8) || (r===6 && c===12) || (r===8 && c===13) || (r===12 && c===8) || (r===13 && c===6) || (r===8 && c===2)) cell.classList.add("star-cell");
            board.appendChild(cell);
        }
    }
    renderTokens();
}

// गोटियों को उनकी सही जगह पर दिखाना
function renderTokens() {
    document.querySelectorAll('.token').forEach(t => t.remove());
    
    // रेड गोटी का रास्ता (सिंपल टेस्ट पाथ)
    let redPath = [[6,1], [6,2], [6,3], [6,4], [6,5], [7,1], [7,2], [7,3]];
    let pRed = tokenPositions.red < redPath.length ? redPath[tokenPositions.red] :;
    let cellRed = document.getElementById(`cell-${pRed[0]}-${pRed[1]}`);
    if(cellRed) {
        let t = document.createElement('div'); t.className = `token token-red ${currentLudoColor() === 'red' && hasRolled ? 'token-clickable' : ''}`;
        t.onclick = () => moveLudoToken('red'); cellRed.appendChild(t);
    }

    // ग्रीन गोटी का रास्ता
    let greenPath = [[1,8], [2,8], [3,8], [4,8], [5,8], [1,7], [2,7], [3,7]];
    let pGreen = tokenPositions.green < greenPath.length ? greenPath[tokenPositions.green] :;
    let cellGreen = document.getElementById(`cell-${pGreen[0]}-${pGreen[1]}`);
    if(cellGreen) {
        let t = document.createElement('div'); t.className = `token token-green ${currentLudoColor() === 'green' && hasRolled ? 'token-clickable' : ''}`;
        t.onclick = () => moveLudoToken('green'); cellGreen.appendChild(t);
    }
}

function currentLudoColor() { return ludoColors[currentTurnIndex]; }

function startLudoGameplay(count) {
    totalActivePlayers = count; currentTurnIndex = 0; hasRolled = false;
    document.getElementById("ludo-setup").style.display = "none";
    document.getElementById("ludo-gameplay").style.display = "block";
    document.getElementById("ludo-turn-indicator").innerText = ludoTurns[currentTurnIndex];
    generateLudoBoard();
}

function rollLudoDice() {
    if (hasRolled) return;
    currentDiceValue = Math.floor(Math.random() * 6) + 1;
    document.getElementById("ludo-dice").innerText = currentDiceValue;
    hasRolled = true;
    document.getElementById("roll-btn").disabled = true;
    renderTokens();
    
    // अगर गोटी चलने लायक नहीं है तो 1.5 सेकंड में टर्न बदलें
    setTimeout(() => {
        if (hasRolled && ((currentLudoColor()==='red' && tokenPositions.red > 5) || (currentLudoColor()==='green' && tokenPositions.green > 5))) {
            changeLudoTurn();
        }
    }, 1500);
}

function moveLudoToken(color) {
    if (!hasRolled || currentLudoColor() !== color) return;
    tokenPositions[color] += currentDiceValue;
    hasRolled = false;
    document.getElementById("roll-btn").disabled = false;
    renderTokens();
    changeLudoTurn();
}

function changeLudoTurn() {
    hasRolled = false; document.getElementById("roll-btn").disabled = false;
    currentTurnIndex = (currentTurnIndex + 1) % totalActivePlayers;
    document.getElementById("ludo-turn-indicator").innerText = ludoTurns[currentTurnIndex];
    renderTokens();
}

function exitLudoGameplay() { document.getElementById("ludo-gameplay").style.display = "none"; document.getElementById("ludo-setup").style.display = "block"; }

// ⚪ CARROM LOGIC AND GAMEPLAY SETUP
let carromTurns = ["⚪ White Turn", "⚫ Black Turn"];
let carromTurnIndex = 0;

function startCarromGameplay(count) {
    document.getElementById("carrom-setup").style.display = "none";
    document.getElementById("carrom-gameplay").style.display = "block";
    document.getElementById("carrom-turn-indicator").innerText = carromTurns[carromTurnIndex];
    generateCarromCoins();
}

// कैरम बोर्ड पर गोटियाँ सजाना
function generateCarromCoins() {
    const board = document.getElementById("carrom-board");
    // पुरानी गोटियाँ साफ़ करें
    document.querySelectorAll('.carrom-coin').forEach(c => c.remove());
    document.querySelectorAll('.striker').forEach(s => s.remove());

    // सफ़ेद और काली गोटियों को सेंटर के पास सेट करना
    let coinPositions = [
        {top: 150, left: 150, type: 'white'}, {top: 150, left: 170, type: 'black'},
        {top: 170, left: 150, type: 'black'}, {top: 170, left: 170, type: 'white'}
    ];

    coinPositions.forEach((pos, idx) => {
        let coin = document.createElement('div');
        coin.className = `carrom-coin coin-${pos.type}`;
        coin.id = `coin-${idx}`;
        coin.style.top = `${pos.top}px`;
        coin.style.left = `${pos.left}px`;
        board.appendChild(coin);
    });

    // बोर्ड पर नीला स्ट्राइकर जोड़ना
    let striker = document.createElement('div');
    striker.className = 'striker';
    striker.id = 'carrom-striker';
    board.appendChild(striker);
}

// स्लाइडर से स्ट्राइकर को बाएं-दाएं खिसकाना
function moveStriker(val) {
    const striker = document.getElementById("carrom-striker");
    if(striker) striker.style.left = `${val}px`;
}

// 🎯 स्ट्राइकर से हिट (Shoot) करने का एनीमेशन
function shootStriker() {
    const striker = document.getElementById("carrom-striker");
    if(!striker) return;

    // स्ट्राइकर को आगे फेंकने का एनीमेशन
    striker.style.bottom = "160px";

    setTimeout(() => {
        // गोटियों के बिखरने का रैंडम एनीमेशन (भौतिकी का नकली अहसास)
        for(let i=0; i<4; i++) {
            let coin = document.getElementById(`coin-${i}`);
            if(coin) {
                let randomTop = Math.floor(Math.random() * 260) + 40;
                let randomLeft = Math.floor(Math.random() * 260) + 40;
                coin.style.top = `${randomTop}px`;
                coin.style.left = `${randomLeft}px`;
            }
        }
        
        // 1 सेकंड बाद स्ट्राइकर वापस अपनी जगह आ जाएगा और टर्न बदलेगा
        setTimeout(() => {
            striker.style.bottom = "35px";
            carromTurnIndex = (carromTurnIndex + 1) % 2;
            document.getElementById("carrom-turn-indicator").innerText = carromTurns[carromTurnIndex];
        }, 800);

    }, 300);
}

function exitCarromGameplay() { document.getElementById("carrom-gameplay").style.display = "none"; document.getElementById("carrom-setup").style.display = "block"; }
function toggleVolume(g) { alert("Volume toggled for " + g); }
