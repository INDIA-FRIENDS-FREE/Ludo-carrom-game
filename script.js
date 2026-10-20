 let isLudoVolumeOn = true; 
let isCarromVolumeOn = true;
let ludoTurns = ["🔴 Red Turn", "🟢 Green Turn", "🟡 Yellow Turn", "🔵 Blue Turn"];
let ludoColors = ["red", "green", "yellow", "blue"];
let currentTurnIndex = 0; 
let totalActivePlayers = 2;
let currentDiceValue = 1; 
let hasRolled = false;

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
    if(mode === 'friends') {
        document.getElementById("ludo-players-section").style.display = "block";
    } else { 
        alert("🤖 कंप्यूटर मोड चुना गया!");
        startLudoGameplay(2); 
    }
}

function selectCarromMode(mode) {
    if(mode === 'friends') {
        document.getElementById("carrom-players-section").style.display = "block";
    } else { 
        alert("🤖 कंप्यूटर मोड चुना गया!");
        startCarromGameplay(2);
    }
}

function generateLudoBoard() {
    const board = document.getElementById("ludo-board"); 
    board.innerHTML = "";
    
    for (let r = 0; r < 15; r++) {
        for (let c = 0; c < 15; c++) {
            if (r < 6 && c < 6) { if (r === 0 && c === 0) board.innerHTML += `<div class="home-box bg-red" style="grid-area: 1/1/7/7">RED</div>`; continue; }
            if (r < 6 && c > 8) { if (r === 0 && c === 9) board.innerHTML += `<div class="home-box bg-green" style="grid-area: 1/10/7/16">GREEN</div>`; continue; }
            if (r > 8 && c < 6) { if (r === 9 && c === 0) board.innerHTML += `<div class="home-box bg-blue" style="grid-area: 10/1/16/7">BLUE</div>`; continue; }
            if (r > 8 && c > 8) { if (r === 9 && c === 9) board.innerHTML += `<div class="home-box bg-yellow" style="grid-area: 10/10/16/16">YELLOW</div>`; continue; }
            if (r >= 6 && r <= 8 && c >= 6 && c <= 8) { if (r === 6 && c === 6) board.innerHTML += `<div class="home-box bg-center" style="grid-area: 7/7/10/10">HOME</div>`; continue; }

            let cell = document.createElement("div"); 
            cell.className = "cell"; 
            cell.id = `cell-${r}-${c}`;
            
            if (r === 6 && c === 1) cell.classList.add("bg-red");
            if (r === 1 && c === 8) cell.classList.add("bg-green");
            if (r === 8 && c === 13) cell.classList.add("bg-yellow");
            if (r === 13 && c === 6) cell.classList.add("bg-blue");
            if (r === 7 && c >= 1 && c <= 5) cell.classList.add("bg-red");
            if (c === 7 && r >= 1 && r <= 5) cell.classList.add("bg-green");
            if (r === 7 && c >= 9 && c <= 13) cell.classList.add("bg-yellow");
            if (c === 7 && r >= 9 && r <= 13) cell.classList.add("bg-blue");
            
            if ((r===6 && c===1) || (r===2 && c===6) || (r===1 && c===8) || (r===6 && c===12) || (r===8 && c===13) || (r===12 && c===8) || (r===13 && c===6) || (r===8 && c===2)) {
                cell.classList.add("star-cell");
            }
            board.appendChild(cell);
        }
    }
    renderTokens();
}

function renderTokens() {
    document.querySelectorAll('.token').forEach(t => t.remove());
    
    // रेड पाथ रो/कॉलम
    let redPathR =;
    let redPathC =;
    let pRed = tokenPositions.red < redPathR.length ? tokenPositions.red : redPathR.length - 1;
    let cellRed = document.getElementById(`cell-${redPathR[pRed]}-${redPathC[pRed]}`);
    if(cellRed) {
        let t = document.createElement('div'); 
        t.className = `token token-red ${ludoColors[currentTurnIndex] === 'red' && hasRolled ? 'token-clickable' : ''}`;
        t.onclick = () => moveLudoToken('red'); 
        cellRed.appendChild(t);
    }

    // ग्रीन पाथ रो/कॉलम
    let greenPathR =;
    let greenPathC =;
    let pGreen = tokenPositions.green < greenPathR.length ? tokenPositions.green : greenPathR.length - 1;
    let cellGreen = document.getElementById(`cell-${greenPathR[pGreen]}-${greenPathC[pGreen]}`);
    if(cellGreen) {
        let t = document.createElement('div'); 
        t.className = `token token-green ${ludoColors[currentTurnIndex] === 'green' && hasRolled ? 'token-clickable' : ''}`;
        t.onclick = () => moveLudoToken('green'); 
        cellGreen.appendChild(t);
    }
}

function startLudoGameplay(count) {
    totalActivePlayers = count; 
    currentTurnIndex = 0; 
    hasRolled = false;
    tokenPositions.red = 0;
    tokenPositions.green = 0;
    document.getElementById("ludo-setup").style.display = "none";
    document.getElementById("ludo-gameplay").style.display = "block";
    document.getElementById("ludo-turn-indicator").innerText = ludoTurns[currentTurnIndex];
    document.getElementById("ludo-dice").innerText = "1";
    document.getElementById("roll-btn").disabled = false;
    generateLudoBoard();
}

function rollLudoDice() {
    if (hasRolled) return;
    currentDiceValue = Math.floor(Math.random() * 6) + 1;
    document.getElementById("ludo-dice").innerText = currentDiceValue;
    hasRolled = true;
    document.getElementById("roll-btn").disabled = true;
    renderTokens();
    
    setTimeout(() => {
        if (hasRolled) {
            changeLudoTurn();
        }
    }, 2000);
}

function moveLudoToken(color) {
    if (!hasRolled || ludoColors[currentTurnIndex] !== color) return;
    tokenPositions[color] += currentDiceValue;
    hasRolled = false;
    document.getElementById("roll-btn").disabled = false;
    renderTokens();
    changeLudoTurn();
}

function changeLudoTurn() {
    hasRolled = false; 
    document.getElementById("roll-btn").disabled = false;
    currentTurnIndex = (currentTurnIndex + 1) % totalActivePlayers;
    document.getElementById("ludo-turn-indicator").innerText = ludoTurns[currentTurnIndex];
    renderTokens();
}

function exitLudoGameplay() { 
    document.getElementById("ludo-gameplay").style.display = "none"; 
    document.getElementById("ludo-setup").style.display = "block"; 
}

// CARROM
let carromTurns = ["⚪ White Turn", "⚫ Black Turn"];
let carromTurnIndex = 0;

function startCarromGameplay(count) {
    document.getElementById("carrom-setup").style.display = "none";
    document.getElementById("carrom-gameplay").style.display = "block";
    document.getElementById("carrom-turn-indicator").innerText = carromTurns[carromTurnIndex];
    generateCarromCoins();
}

function generateCarromCoins() {
    const board = document.getElementById("carrom-board");
    document.querySelectorAll('.carrom-coin').forEach(c => c.remove());
    document.querySelectorAll('.striker').forEach(s => s.remove());

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

    let striker = document.createElement('div');
    striker.className = 'striker';
    striker.id = 'carrom-striker';
    board.appendChild(striker);
}

function moveStriker(val) {
    const striker = document.getElementById("carrom-striker");
    if(striker) striker.style.left = `${val}px`;
}

function shootStriker() {
    const striker = document.getElementById("carrom-striker");
    if(!striker) return;

    striker.style.bottom = "160px";

    setTimeout(() => {
        for(let i=0; i<4; i++) {
            let coin = document.getElementById(`coin-${i}`);
            if(coin) {
                let randomTop = Math.floor(Math.random() * 240) + 50;
                let randomLeft = Math.floor(Math.random() * 240) + 50;
                coin.style.top = `${randomTop}px`;
                coin.style.left = `${randomLeft}px`;
            }
        }
        
        setTimeout(() => {
            striker.style.bottom = "35px";
            carromTurnIndex = (carromTurnIndex + 1) % 2;
            document.getElementById("carrom-turn-indicator").innerText = carromTurns[carromTurnIndex];
        }, 600);

    }, 200);
}

function exitCarromGameplay() { 
    document.getElementById("carrom-gameplay").style.display = "none"; 
    document.getElementById("carrom-setup").style.display = "block"; 
}

function toggleVolume(g) { 
    let btn = document.getElementById(g + "-vol-btn");
    if(btn.innerText.includes("ON")) {
        btn.innerText = "🔇 Volume: OFF";
        btn.style.background = "#555";
    } else {
        btn.innerText = "🔊 Volume: ON";
        btn.style.background = "#e94560";
    }
}
