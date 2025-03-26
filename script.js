let daftarNama = ["Ghasani Salwa Adirlah", "Sani", "sani", "Kambing", "suci", "Suci"];
let colors = ["red", "blue", "yellow", "green", "purple", "pink", "orange"];
let audio = document.getElementById("birthdaySong");

function checkName() {
    let nama = document.getElementById("namaInput").value;
    let profilePic = document.getElementById("profilePic");
}
    if (daftarNama.includes(nama)) {
        document.getElementById("welcomeText").textContent = "Happy Birthday, " + nama + "!";
        document.getElementById("popup").style.display = "none";
        document.getElementById("messageContainer").style.display = "block";
        createBalloons(nama);
        profilePic.src = "img/" + nama.toLowerCase().replace(/\s+/g, "_") + ".jpg";
        profilePic.style.display = "block";
        playBirthdaySong();
    } else {
        alert("Nama tidak ditemukan dalam database! Coba lagi.");
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        checkName();
    }
}
function sendMessage() {
    let message = document.getElementById("messageInput").value.trim();
    if (message === "") {
        alert("Pesan tidak boleh kosong!");
        return;
    }
    const TOKEN = "7924423386:AAFBgJE3TsqKQbHnRBfoOdvXo5b77Ng8Au8";
    const CHAT_ID = "1144262156";
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const data = {
        chat_id: CHAT_ID,
        text: `Pesan Baru dari Pengunjung:\n"${message}"`,
};

fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
    if (data.ok) {
        alert("Pesan berhasil dikirim!");
        document.getElementById("messageInput").value = "";
    } else {
        alert("Gagal mengirim pesan. Coba lagi.");
    }
})
.catch(error => console.error("Error:", error));
}

function createBalloons(name) {
    let container = document.getElementById("balloonContainer");
    container.innerHTML = "";
    let text = "HBD " + name.toUpperCase();
    for (let char of text) {
        let balloon = document.createElement("div");
        balloon.classList.add("balloon");
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.textContent = char;
        container.appendChild(balloon);
    }
}

function playBirthdaySong() {
    audio.play().catch(error => console.log("Audio tidak bisa diputar:", error));
}

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        audio.pause();
    } else {
        audio.play();
    }
});
