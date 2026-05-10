const downloadBtn = document.getElementById('downloadBtn');
const loadingContainer = document.getElementById('loading-container');
const progressBar = document.getElementById('progress-bar');
const loadingText = document.getElementById('loading-text');
const overlay = document.getElementById('jumpscare-overlay');
const video = document.getElementById('scaryVideo');

downloadBtn.addEventListener('click', function() {
    // Sembunyikan tombol, munculkan bar loading
    downloadBtn.classList.add('hidden');
    loadingContainer.classList.remove('hidden');

    let progress = 0;
    const speed = 500; // milidetik

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 5;
        if (progress > 100) progress = 100;

        progressBar.style.width = progress + '%';
        loadingText.innerText = `Menyiapkan file... ${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            
            // Jeda sebentar setelah 100% agar kagetnya pas
            setTimeout(() => {
                aktifkanJumpscare();
            }, 500);
        }
    }, speed);
});

function aktifkanJumpscare() {
    overlay.classList.remove('hidden');
    video.volume = 1.0;
    video.load(); // Memuat ulang video p.mp4
    
    // Putar video
    const playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error("Gagal putar video:", error);
            alert("Klik OK untuk melanjutkan download (ini trik agar suara keluar)");
            video.play();
        });
    }

    // Masuk mode layar penuh
    if (overlay.requestFullscreen) {
        overlay.requestFullscreen();
    } else if (overlay.webkitRequestFullscreen) {
        overlay.webkitRequestFullscreen();
    }
}

// Keluar dari jumpscare jika video selesai
video.onended = function() {
    overlay.classList.add('hidden');
    if (document.exitFullscreen) document.exitFullscreen();
};
