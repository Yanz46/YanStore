const userIdInput = document.getElementById("userId");
const diamondAmountSelect = document.getElementById("diamondAmount");
const topupButton = document.getElementById("topupButton");

function updateWhatsappLink() {
    const selectedAmount = diamondAmountSelect.value;
    const userId = userIdInput.value;
    if (selectedAmount && userId) {
        const message = `Top-Up Free Fire - ID: ${userId} - ${selectedAmount} Diamonds`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/6283191658203?text=${encodedMessage}`;
        topupButton.href = whatsappLink;
    } else {
        topupButton.href = "#"; // Nonaktifkan tautan jika ID atau jumlah diamond kosong
    }
}

diamondAmountSelect.addEventListener("change", updateWhatsappLink);
userIdInput.addEventListener("input", updateWhatsappLink);

// Panggil updateWhatsappLink saat halaman dimuat untuk inisialisasi
updateWhatsappLink();
