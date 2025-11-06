/* --- JAVASCRIPT LOGIC --- */
        
let currentLayanan = '';
let currentHarga = '';
const whatsappNumber = '6285124412494'; // Nomor WhatsApp Anda (tanpa tanda +)
const modal = document.getElementById('orderModal');

// Fungsi untuk membuka Modal dan mengisi detail pesanan
function openOrderModal(layanan, harga) {
    currentLayanan = layanan;
    currentHarga = harga;
    
    document.getElementById('modalLayanan').innerText = layanan;
    document.getElementById('modalHarga').innerText = 'Rp' + harga;
    modal.style.display = 'block';
}

// Fungsi untuk menutup Modal
function closeOrderModal() {
    modal.style.display = 'none';
}

// Fungsi untuk membuat dan mengirim pesan via WhatsApp
function sendWhatsAppOrder() {
    const nama = document.getElementById('inputNama').value;
    const linkTujuan = document.getElementById('inputLink').value;

    if (!nama || !linkTujuan) {
        alert('Mohon lengkapi Nama dan Link Tujuan terlebih dahulu!');
        return;
    }

    // Format pesan order
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

// Menutup modal jika user mengklik area luar modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
