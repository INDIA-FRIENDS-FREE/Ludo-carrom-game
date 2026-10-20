 // वॉल्यूम का स्टेटस रखने के लिए वेरिएबल्स
let isLudoVolumeOn = true;
let isCarromVolumeOn = true;

function goToLudoPage() {
    let name = document.getElementById("username").value;
    if(name == "") { name = "खिलाड़ी"; }
    
    document.getElementById("page-1").classList.remove("active");
    document.getElementById("page-2").classList.add("active");
    document.getElementById("ludo-welcome-msg").innerText = "चलो खेलते हैं, " + name + "!";
    
    // नया पेज खुलने पर पुराना प्लेयर सेक्शन छुपा दें
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

// लूडो मोड सेलेक्ट करने पर
function selectLudoMode(mode) {
    let playerSection = document.getElementById("ludo-players-section");
    if(mode === 'friends') {
        playerSection.style.display = "block"; // फ्रेंड्स चुनने पर प्लेयर ऑप्शन दिखेगा
    } else {
        playerSection.style.display = "none";  // कंप्यूटर चुनने पर छुप जाएगा
        alert("🤖 कंप्यूटर मोड चुना गया! गेम जल्द ही शुरू होगा।");
    }
}

// कैरम मोड सेलेक्ट करने पर
function selectCarromMode(mode) {
    let playerSection = document.getElementById("carrom-players-section");
    if(mode === 'friends') {
        playerSection.style.display = "block";
    } else {
        playerSection.style.display = "none";
        alert("🤖 कंप्यूटर मोड चुना गया! गेम जल्द ही शुरू होगा।");
    }
}

// प्लेयर की संख्या चुनने पर
function setPlayers(gameType, count) {
    alert(gameType.toUpperCase() + " गेम में " + count + " प्लेयर्स का सेटअप सेट हो गया है!");
}

// वॉल्यूम ऑन/ऑफ करने का फंक्शन
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
