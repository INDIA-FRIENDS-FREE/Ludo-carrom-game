// पेज बदलने के फंक्शन्स
function goToLudoPage() {
    let name = document.getElementById("username").value;
    if(name == "") { name = "खिलाड़ी"; } // अगर नाम नहीं डाला तो डिफ़ॉल्ट नाम
    
    // पेज 1 छुपाओ, पेज 2 दिखाओ
    document.getElementById("page-1").classList.remove("active");
    document.getElementById("page-2").classList.add("active");
    
    document.getElementById("ludo-welcome-msg").innerText = "चलो खेलते हैं, " + name + "!";
}

function goToCarromPage() {
    let name = document.getElementById("username").value;
    if(name == "") { name = "खिलाड़ी"; }
    
    // पेज 1 छुपाओ, पेज 3 दिखाओ
    document.getElementById("page-1").classList.remove("active");
    document.getElementById("page-3").classList.add("active");
    
    document.getElementById("carrom-welcome-msg").innerText = "चलो खेलते हैं, " + name + "!";
}

function backToHome() {
    // वापस होम पेज पर जाने के लिए
    document.getElementById("page-2").classList.remove("active");
    document.getElementById("page-3").classList.remove("active");
    document.getElementById("page-1").classList.add("active");
}
