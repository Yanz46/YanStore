document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const serviceSelect = document.getElementById('service');
    const quantityInput = document.getElementById('quantity');
    const minQtySpan = document.getElementById('min-qty');
    const maxQtySpan = document.getElementById('max-qty');
    const submitBtn = document.getElementById('submitBtn');

    // Nomor WhatsApp yang akan menerima pesan
    const whatsappNumber = '6282229795661'; // Format internasional tanpa '+' atau spasi

    // Dummy data untuk layanan (di dunia nyata ini akan dari API back-end)
    const servicesData = {
        whatsapp: [
            { id: '5952', name: 'WhatsApp Channel Members ~ REAL ~ Max 1K ~...', min: 10, max: 1000 },
            { id: '6001', name: 'WhatsApp Channel Members ~ BOT ~ Max 5K ~...', min: 50, max: 5000 },
        ],
        tiktok: [
            { id: '101', name: 'TikTok Likes ~ Indo ~ Max 100K', min: 100, max: 100000 },
            { id: '102', name: 'TikTok Followers ~ Global ~ Max 50K', min: 50, max: 50000 },
            { id: '103', name: 'TikTok Views ~ Instant ~ Max 1M', min: 1000, max: 1000000 },
            { id: '104', name: 'TikTok Comments ~ Custom ~ Max 500', min: 10, max: 500 },
        ],
        youtube: [
            { id: '201', name: 'YouTube Subscribers ~ Real ~ Max 5K', min: 10, max: 5000 },
            { id: '202', name: 'YouTube Views ~ High Retention ~ Max 100K', min: 500, max: 100000 },
            { id: '203', name: 'YouTube Likes ~ Targeted ~ Max 10K', min: 20, max: 10000 },
            { id: '204', name: 'YouTube Views Live ~ 30 Min ~ Max 500', min: 10, max: 500 },
            { id: '205', name: 'YouTube Comments ~ Custom ~ Max 200', min: 5, max: 200 },
        ],
        instagram: [
            { id: '301', name: 'Instagram Followers ~ Real ~ Max 20K', min: 50, max: 20000 },
            { id: '302', name: 'Instagram Likes ~ Indo ~ Max 50K', min: 20, max: 50000 },
            { id: '303', name: 'Instagram Views ~ Reel/Video ~ Max 1M', min: 1000, max: 1000000 },
            { id: '304', name: 'Instagram Comments ~ Custom ~ Max 300', min: 10, max: 300 },
        ],
        facebook: [
            { id: '401', name: 'Facebook Followers ~ Page ~ Max 10K', min: 50, max: 10000 },
            { id: '402', name: 'Facebook Views ~ Video ~ Max 500K', min: 1000, max: 500000 },
            { id: '403', name: 'Facebook Likes ~ Post ~ Max 20K', min: 50, max: 20000 },
            { id: '404', name: 'Facebook Comments ~ Post ~ Max 100', min: 5, max: 100 },
        ],
        telegram: [
            { id: '501', name: 'Telegram Members ~ Real ~ Max 5K', min: 50, max: 5000 },
            { id: '502', name: 'Telegram Members ~ Bot ~ Max 10K', min: 100, max: 10000 },
        ]
    };

    function populateServices(category) {
        serviceSelect.innerHTML = '';
        const currentServices = servicesData[category] || [];
        currentServices.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = `${service.id} - ${service.name}`;
            serviceSelect.appendChild(option);
        });
        updateQuantityRange();
    }

    function updateQuantityRange() {
        const selectedServiceId = serviceSelect.value;
        const selectedCategory = categorySelect.value;
        const currentService = servicesData[selectedCategory]?.find(s => s.id === selectedServiceId);

        if (currentService) {
            quantityInput.min = currentService.min;
            quantityInput.max = currentService.max;
            minQtySpan.textContent = currentService.min;
            maxQtySpan.textContent = currentService.max.toLocaleString('id-ID');

            let currentQuantity = parseInt(quantityInput.value);
            if (isNaN(currentQuantity) || currentQuantity < currentService.min) {
                quantityInput.value = currentService.min;
            } else if (currentQuantity > currentService.max) {
                quantityInput.value = currentService.max;
            }
        } else {
            quantityInput.min = 1;
            quantityInput.max = 10000;
            minQtySpan.textContent = 1;
            maxQtySpan.textContent = '10 000';
            quantityInput.value = 10;
        }
    }

    // Event Listeners
    categorySelect.addEventListener('change', () => {
        populateServices(categorySelect.value);
    });

    serviceSelect.addEventListener('change', updateQuantityRange);
    quantityInput.addEventListener('input', updateQuantityRange);

    // Event Listener untuk tombol submit
    submitBtn.addEventListener('click', () => {
        const category = categorySelect.value;
        const serviceId = serviceSelect.value;
        const serviceName = serviceSelect.options[serviceSelect.selectedIndex].textContent;
        const link = document.getElementById('link').value;
        const quantity = quantityInput.value;

        // Validasi sederhana (opsional tapi disarankan)
        if (!link || link.trim() === '') {
            alert('Mohon masukkan Link target.');
            return;
        }
        if (parseInt(quantity) < parseInt(quantityInput.min) || parseInt(quantity) > parseInt(quantityInput.max)) {
            alert(`Kuantitas harus antara ${quantityInput.min} dan ${quantityInput.max}.`);
            return;
        }

        // Buat pesan WhatsApp
        const message = `Halo, saya ingin memesan layanan:\n\n` +
                        `Kategori: ${category.toUpperCase()}\n` +
                        `Layanan: ${serviceName}\n` +
                        `Link: ${link}\n` +
                        `Jumlah: ${quantity}\n\n` +
                        `Mohon diproses. Terima kasih!`;

        // Encode pesan agar aman untuk URL
        const encodedMessage = encodeURIComponent(message);
        
        // Arahkan ke link WhatsApp dengan nomor Anda dan pesan pre-filled
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });

    // Initial load
    populateServices(categorySelect.value);
});
