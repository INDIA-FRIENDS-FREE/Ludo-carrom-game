 let isLudoVolumeOn = true;
let isCarromVolumeOn = true;

// लूडो खेलने की बारी संभालने के लिए
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
        startLudoGameplay(2); // कंप्यूटर के लिए भी डिफ़ॉल्ट 2 प्लेयर बोर्ड खोलते हैं
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

// प्लेयर चुनने पर गेमप्ले स्क्रीन चालू करना
function startLudoGameplay(playersCount) {
    totalActivePlayers = playersCount;
    currentTurnIndex = 0;
    
    // सेटअप छुपाओ, गेमप्ले दिखाओ
    document.getElementById("ludo-setup").style.display = "none";
    document.getElementById("ludo-gameplay").style.display = "block";
    
    // टर्न इंडिकेटर सेट करें
    document.getElementById("ludo-turn-indicator").innerText = ludoTurns[currentTurnIndex];
    document.getElementById("ludo-dice").innerText = "1";
}

// गेम से बाहर आने के लिए
function exitLudoGameplay() {
    document.getElementById("ludo-gameplay").style.display = "none";
    document.getElementById("ludo-setup").style.display = "block";
    document.getElementById("ludo-players-section").style.display = "none";
}

// 🎲 पासा (Dice Roll) करने का जादुई फंक्शन
function rollLudoDice() {
    let diceEl = document.getElementById("ludo-dice");
    let turnEl = document.getElementById("ludo-turn-indicator");
    
    // 1 से 6 के बीच रैंडम नंबर
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    diceEl.innerText = randomNumber;
    
    // पासा फेंकने के बाद बारी (Turn) बदलें
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
