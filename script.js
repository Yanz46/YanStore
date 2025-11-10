/* --- JAVASCRIPT LOGIC --- */
        
let currentLayanan = '';
let currentHarga = '';
const whatsappNumber = '6285124412494'; // Nomor WhatsApp Anda (tanpa tanda +)
const modal = document.getElementById('orderModal');
const customModal = document.getElementById('customOrderModal');

// Objek untuk menyimpan harga per 1000 unit (harga dasar custom)
const basePrices = {
    // Harga per 1000 unit. Disesuaikan dengan harga per 1000 termurah di list Anda.
    follow_ig: 30000, 
    follow_tiktok: 25000,
    views_ig: 2000, // Estimasi 10.000 views = 3.000 -> 1000 views = 300
    views_tiktok: 4000, // Estimasi 10.000 views = 5.000 -> 1000 views = 500
    like_ig: 5000, // Estimasi 1.000 likes = 8.000 
    like_tiktok: 7000, // Estimasi 10.000 likes = 10.000 -> 1000 likes = 1000
};

// --- FUNGSI MODAL STANDAR ---
function openOrderModal(layanan, harga) {
    currentLayanan = layanan;
    currentHarga = harga;
    
    document.getElementById('modalLayanan').innerText = layanan;
    document.getElementById('modalHarga').innerText = 'Rp' + harga;
    modal.style.display = 'block';
}

function closeOrderModal() {
    modal.style.display = 'none';
}

function sendWhatsAppOrder() {
    const nama = document.getElementById('inputNama').value;
    const linkTujuan = document.getElementById('inputLink').value;

    if (!nama || !linkTujuan) {
        alert('Mohon lengkapi Nama dan Link Tujuan terlebih dahulu!');
        return;
    }

    const message = 
        'Halo Kak, saya mau order layanan sosmed.' +
        '\n\n*DETAIL PESANAN*' +
        '\nNama: ' + nama +
        '\nPesanan: ' + currentLayanan +
        '\nHarga: Rp' + currentHarga +
        '\nLink Tujuan: ' + linkTujuan +
        '\n\nMohon diproses, terima kasih.';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    
    closeOrderModal();
    document.getElementById('inputNama').value = '';
    document.getElementById('inputLink').value = '';
}

// --- FUNGSI MODAL CUSTOM BARU ---
function openNewCustomModal() {
    customModal.style.display = 'block';
    // Reset nilai input saat modal dibuka
    document.getElementById('layananCustom').value = '';
    document.getElementById('jumlahCustom').value = '';
    document.getElementById('inputNamaCustom').value = '';
    document.getElementById('inputLinkCustom').value = '';
    document.getElementById('hargaCustom').innerText = 'Rp 0';
    document.getElementById('customOrderBtn').disabled = true;
}

function closeCustomOrderModal() {
    customModal.style.display = 'none';
}

function calculateCustomPrice() {
    const layananSelect = document.getElementById('layananCustom');
    const layananKey = layananSelect.value;
    const jumlah = parseInt(document.getElementById('jumlahCustom').value);
    const hargaDisplay = document.getElementById('hargaCustom');
    const orderBtn = document.getElementById('customOrderBtn');

    if (!layananKey || isNaN(jumlah) || jumlah < 100) {
        hargaDisplay.innerText = 'Rp 0';
        orderBtn.disabled = true;
        return;
    }
    
    // Perhitungan harga
    const pricePerUnit = basePrices[layananKey] / 1000; 
    let totalHarga = Math.round(jumlah * pricePerUnit); 

    // Formatting harga ke Rupiah
    const formattedPrice = totalHarga.toLocaleString('id-ID'); 
    
    hargaDisplay.innerText = `Rp ${formattedPrice}`;
    orderBtn.disabled = false;
    currentLayanan = layananSelect.options[layananSelect.selectedIndex].text;
    currentHarga = formattedPrice; // Simpan harga terformat
}

function sendCustomWhatsAppOrder() {
    const nama = document.getElementById('inputNamaCustom').value;
    const linkTujuan = document.getElementById('inputLinkCustom').value;
    const jumlah = document.getElementById('jumlahCustom').value;

    if (!nama || !linkTujuan || !currentLayanan || currentHarga === '0') {
        alert('Mohon lengkapi semua data dan hitung harga terlebih dahulu!');
        return;
    }

    const message = 
        'Halo Kak, saya mau order layanan custom.' +
        '\n\n*DETAIL PESANAN*' +
        '\nNama: ' + nama +
        '\nPesanan Custom: ' + currentLayanan +
        '\nJumlah: ' + jumlah +
        '\nPerkiraan Harga: Rp' + currentHarga +
        '\nLink Tujuan: ' + linkTujuan +
        '\n\nMohon diproses, terima kasih.';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    
    closeCustomOrderModal();
}


// Menutup modal jika user mengklik area luar modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == customModal) {
        customModal.style.display = "none";
    }
}
