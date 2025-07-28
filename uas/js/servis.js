// Data Dummy untuk Katalog Produk/Layanan
const servicesAndProducts = [
  {
    id: "kopi-arabika",
    category: "kopi",
    name: "Kopi Arabika House Blend",
    icon: "coffee", // Ikon Feather
    image: "img/Kopi Arabika House Blend.jpg",
    price: 50000,
    shortDescription: "Biji kopi arabika pilihan dari pegunungan Nusantara, dipanggang dengan profil medium.",
    fullDescription: "Biji kopi arabika pilihan dari pegunungan Nusantara, dipanggang dengan profil medium untuk rasa yang kaya dan aroma floral. Cocok untuk seduhan manual maupun espresso, menawarkan keseimbangan rasa yang sempurna untuk setiap hari Anda.",
    features: ["100% Arabika", "Profil Medium Roast", "Aroma Floral & Citrus", "Tersedia dalam bentuk biji/bubuk"]
  },
  {
    id: "latte-art-class",
    category: "event",
    name: "Kelas Latte Art Pemula",
    icon: "award", // Ikon Feather
    image: "img/kelas-latte-art.jpg",
    price: 250000,
    shortDescription: "Ikuti kelas intensif kami untuk menguasai dasar-dasar latte art.",
    fullDescription: "Ikuti kelas intensif kami untuk menguasai dasar-dasar latte art dan membuat karya seni di cangkir kopi Anda. Dipandu oleh barista profesional, Anda akan belajar teknik menuang dan membuat pola dasar seperti hati dan rosetta.",
    features: ["Durasi 3 Jam", "Pendampingan Barista Profesional", "Sertifikat Partisipasi", "Termasuk bahan"]
  },
  {
    id: "catering-espresso",
    category: "catering",
    name: "Katering Espresso Bar (Mini)",
    icon: "truck", // Ikon Feather
    image: "img/catering-espresso.jpg",
    price: 1500000,
    shortDescription: "Layanan katering mini bar espresso untuk acara kecil Anda.",
    fullDescription: "Layanan katering mini bar espresso untuk acara kecil Anda. Cocok untuk pertemuan atau pesta rumahan, kami akan menyediakan barista dan peralatan lengkap untuk menyajikan kopi berkualitas.",
    features: ["20 Porsi Kopi", "1 Barista (2 Jam)", "Peralatan Bar Lengkap", "Pilihan Kopi Standard"]
  },
  {
    id: "croissant-almond",
    category: "makanan",
    name: "Croissant Almond Panggang",
    icon: "aperture", // Ikon Feather (atau ganti ke 'cookie' jika lebih cocok)
    image: "img/Croissant.jpg",
    price: 20000,
    shortDescription: "Croissant renyah dengan isian dan taburan almond panggang.",
    fullDescription: "Croissant renyah dengan isian dan taburan almond panggang, sempurna sebagai teman kopi sore atau sarapan. Baru dipanggang setiap hari untuk memastikan kesegaran dan rasa terbaik.",
    features: ["Renyah di Luar, Lembut di Dalam", "Isian Krim Almond", "Taburan Almond Panggang", "Baru dipanggang setiap hari"]
  },
  {
    id: "kopi-luwak",
    category: "kopi",
    name: "Kopi Luwak Premium",
    icon: "star", // Ikon Feather
    image: "img/kopi-luwak.jpg",
    price: 500000,
    shortDescription: "Kopi luwak asli dengan rasa yang unik dan eksotis.",
    fullDescription: "Kopi luwak asli dengan rasa yang unik dan eksotis, pengalaman minum kopi yang tak terlupakan. Diproses secara etis dan bersertifikat, menawarkan kehalusan dan kompleksitas rasa yang tiada duanya.",
    features: ["100% Kopi Luwak Asli", "Rasa Halus & Rendah Asam", "Aroma Khas", "Sertifikasi Asal"]
  },
  {
    id: "paket-workshop-corporate",
    category: "event",
    name: "Paket Workshop Kopi Korporat",
    icon: "users", // Ikon Feather
    image: "img/workshop-corporate.jpg",
    price: 5000000,
    shortDescription: "Workshop kopi yang disesuaikan untuk tim perusahaan Anda.",
    fullDescription: "Workshop kopi yang disesuaikan untuk tim perusahaan Anda, meningkatkan kolaborasi dan pengetahuan kopi. Program dapat dirancang khusus sesuai kebutuhan perusahaan Anda, dari dasar pembuatan kopi hingga *coffee tasting*.",
    features: ["Materi Kustom", "Fasilitator Ahli", "Kapasitas 10-20 Orang", "Termasuk Snack & Minuman"]
  },
  {
    id: "sandwich-ayam",
    category: "makanan",
    name: "Sandwich Ayam Panggang",
    icon: "square", // Ikon Feather (jika ada, kalau tidak, ganti ke food atau something else)
    image: "img/sandwich.jpg",
    price: 35000,
    shortDescription: "Sandwich sehat dengan roti gandum, dada ayam panggang, dan sayuran segar.",
    fullDescription: "Sandwich sehat dengan roti gandum, dada ayam panggang, sayuran segar, dan saus spesial. Pilihan sempurna untuk makan siang yang cepat dan bergizi.",
    features: ["Roti Gandum", "Dada Ayam Panggang", "Sayuran Segar", "Cocok untuk Makan Siang"]
  },
  {
    id: "katering-pernikahan",
    category: "catering",
    name: "Katering Pernikahan Mewah",
    icon: "heart", // Ikon Feather
    image: "img/catering-pernikahan.jpg",
    price: 15000000,
    shortDescription: "Paket katering kopi dan makanan lengkap untuk acara pernikahan Anda.",
    fullDescription: "Paket katering kopi dan makanan lengkap untuk acara pernikahan Anda, disesuaikan dengan tema. Kami menyediakan pilihan kopi premium, makanan ringan, dan barista profesional untuk memastikan momen istimewa Anda tak terlupakan.",
    features: ["Pilihan Kopi Premium & Makanan", "Barista Profesional", "Desain Bar Kustom", "Konsultasi Menu Eksklusif"]
  }
];

// --- Katalog & Pemfilteran Dinamis ---
const catalogGrid = document.querySelector(".catalog-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderCatalog(itemsToRender) {
  catalogGrid.innerHTML = ""; // Bersihkan katalog yang ada

  itemsToRender.forEach((item) => {
    const catalogItem = document.createElement("div");
    catalogItem.classList.add("catalog-item");
    catalogItem.setAttribute("data-category", item.category);
    catalogItem.setAttribute("data-item-id", item.id);
    catalogItem.setAttribute("role", "listitem"); // Added for accessibility

    // Gunakan icon jika ada, fallback ke image
    // Added loading="lazy" for image performance
    catalogItem.innerHTML = `
      ${item.icon ? `<i data-feather="${item.icon}" class="item-icon" aria-hidden="true"></i>` : `<img src="${item.image}" alt="${item.name}" class="item-illustration" loading="lazy">`}
      <h3>${item.name}</h3>
      <p class="short-description">${item.shortDescription}</p>
      <p class="full-description">${item.fullDescription}</p>
      <a href="#" class="read-more-toggle">Baca Selengkapnya</a>
      <span class="price">Rp ${item.price.toLocaleString("id-ID")}</span>
    `;
    catalogGrid.appendChild(catalogItem);
  });

  feather.replace(); // Pastikan ikon Feather diinisialisasi setelah rendering
  attachProgressiveDisclosureListeners(); // Panggil fungsi untuk melampirkan event listener
  attachItemClickListeners(); // Lampirkan listener untuk membuka modal
}

function filterCatalog(category) {
  const allCatalogItems = document.querySelectorAll(".catalog-item");

  allCatalogItems.forEach(item => {
    const isMatched = category === "all" || item.dataset.category === category;

    if (isMatched) {
      item.classList.remove("hidden"); // Hapus kelas hidden jika cocok
      item.style.display = "flex"; // Pastikan ditampilkan sebagai flexbox
      item.removeAttribute("aria-hidden"); // For accessibility
    } else {
      item.classList.add("hidden"); // Tambahkan kelas hidden jika tidak cocok
      item.setAttribute("aria-hidden", "true"); // For accessibility
      // Tambahkan listener untuk menyembunyikan display setelah transisi selesai
      item.addEventListener('transitionend', function handler(e) {
        // Pastikan transisi opacity yang selesai, bukan yang lain
        if (e.propertyName === 'opacity' && item.classList.contains('hidden')) {
          item.style.display = 'none';
          item.removeEventListener('transitionend', handler); // Hapus listener
        }
      });
    }
  });
}

// Event listeners untuk tombol filter
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active"); // Hapus active dari semua
      btn.setAttribute("aria-pressed", "false"); // Update aria-pressed
    });
    button.classList.add("active"); // Tambahkan active ke yang diklik
    button.setAttribute("aria-pressed", "true"); // Update aria-pressed
    const category = button.getAttribute("data-category");
    filterCatalog(category);
  });
});

// --- Modal Detail Item ---
const itemDetailModal = document.getElementById("itemDetailModal");
const closeModalButton = itemDetailModal.querySelector(".close-button");
const modalItemImg = document.getElementById("modalItemImg");
const modalItemName = document.getElementById("modalItemName");
const modalItemDescription = document.getElementById("modalItemDescription");
const modalItemFeatures = document.getElementById("modalItemFeatures");
const modalItemPrice = document.getElementById("modalItemPrice");

function attachProgressiveDisclosureListeners() {
    const catalogItems = document.querySelectorAll('.catalog-item');

    catalogItems.forEach(item => {
        let toggleBtn = item.querySelector('.read-more-toggle');
        const shortDescription = item.querySelector('.short-description');
        const fullDescription = item.querySelector('.full-description');

        // Sembunyikan full-description secara default jika ada
        if (fullDescription) {
            fullDescription.style.maxHeight = '0';
            fullDescription.style.opacity = '0';
            fullDescription.style.overflow = 'hidden';
            shortDescription.style.maxHeight = '5em'; // Pastikan ada nilai awal
            shortDescription.style.opacity = '1';
            shortDescription.style.marginBottom = '1rem';
        }

        // Tampilkan tombol toggle hanya jika ada deskripsi lengkap yang berbeda dari deskripsi singkat
        const hasFullDescription = fullDescription && fullDescription.textContent.trim() !== '';
        const isDifferentDescription = hasFullDescription && fullDescription.textContent.trim() !== shortDescription.textContent.trim();

        if (isDifferentDescription) {
            if (!toggleBtn) { // Buat tombol jika belum ada
                const btn = document.createElement('a');
                btn.href = '#';
                btn.classList.add('read-more-toggle');
                btn.textContent = 'Baca Selengkapnya';
                item.appendChild(btn);
                toggleBtn = btn; // Update toggleBtn reference
            }
            toggleBtn.style.display = 'inline-block';
            toggleBtn.setAttribute("role", "button"); // Added for accessibility
            toggleBtn.setAttribute("aria-expanded", "false"); // Added for accessibility
        } else if (toggleBtn) {
            toggleBtn.style.display = 'none'; // Sembunyikan jika tidak ada full-description atau sama
        }

        if (toggleBtn) {
            // Hapus listener sebelumnya jika ada (untuk menghindari duplikasi saat renderCatalog dipanggil ulang)
            // Menggunakan cloneNode untuk merefresh event listeners
            const oldToggleBtn = toggleBtn.cloneNode(true);
            toggleBtn.parentNode.replaceChild(oldToggleBtn, toggleBtn);
            toggleBtn = oldToggleBtn;

            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                item.classList.toggle('active');

                const isExpanded = item.classList.contains('active');
                toggleBtn.setAttribute("aria-expanded", isExpanded); // Update aria-expanded

                if (isExpanded) {
                    fullDescription.style.maxHeight = fullDescription.scrollHeight + 'px';
                    fullDescription.style.opacity = '1';
                    shortDescription.style.maxHeight = '0';
                    shortDescription.style.opacity = '0';
                    shortDescription.style.marginBottom = '0';
                    toggleBtn.textContent = 'Sembunyikan';
                } else {
                    fullDescription.style.maxHeight = '0';
                    fullDescription.style.opacity = '0';
                    shortDescription.style.maxHeight = '5em'; // Kembali ke nilai awal
                    shortDescription.style.opacity = '1';
                    shortDescription.style.marginBottom = '1rem';
                    toggleBtn.textContent = 'Baca Selengkapnya';
                }
            });
        }
    });
}


function attachItemClickListeners() {
    document.querySelectorAll(".catalog-item").forEach(itemElement => {
        // Hapus listener sebelumnya untuk menghindari duplikasi
        // Menggunakan cloneNode untuk merefresh event listeners
        const oldItemElement = itemElement.cloneNode(true);
        itemElement.parentNode.replaceChild(oldItemElement, itemElement);
        itemElement = oldItemElement; // Perbarui referensi

        itemElement.addEventListener('click', (e) => {
            // Pastikan klik tidak berasal dari tombol toggle "Baca Selengkapnya"
            // or other interactive elements within the card that might have their own handlers
            if (e.target.classList.contains('read-more-toggle') || e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }

            const itemId = itemElement.dataset.itemId;
            const item = servicesAndProducts.find(p => p.id === itemId);

            if (item) {
                // Periksa apakah item.image ada, jika tidak, set src ke placeholder atau kosongkan
                modalItemImg.src = item.image || ''; // Fallback to empty string if no image
                modalItemImg.alt = item.name;
                // Hide image if no specific image is provided and icon is used
                if (item.icon && !item.image) {
                  modalItemImg.style.display = 'none';
                } else {
                  modalItemImg.style.display = 'block';
                }

                modalItemName.textContent = item.name;
                modalItemDescription.textContent = item.fullDescription || item.shortDescription || ''; // Prioritaskan full description

                modalItemPrice.textContent = `Rp ${item.price.toLocaleString("id-ID")}`;

                modalItemFeatures.innerHTML = ""; // Clear existing features
                if (item.features && item.features.length > 0) {
                    item.features.forEach(feature => {
                        const li = document.createElement('li');
                        li.textContent = feature;
                        modalItemFeatures.appendChild(li);
                    });
                } else {
                    modalItemFeatures.innerHTML = "<li>Tidak ada fitur spesifik yang tercantum.</li>";
                }
                itemDetailModal.style.display = "flex"; // Gunakan flex untuk centering
                itemDetailModal.setAttribute("aria-hidden", "false"); // For accessibility
                itemDetailModal.focus(); // Focus the modal for accessibility
            }
        });
    });
}

closeModalButton.addEventListener("click", () => {
  itemDetailModal.style.display = "none";
  itemDetailModal.setAttribute("aria-hidden", "true"); // For accessibility
});

window.addEventListener("click", (event) => {
  if (event.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
    itemDetailModal.setAttribute("aria-hidden", "true"); // For accessibility
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && itemDetailModal.style.display === 'flex') {
    itemDetailModal.style.display = 'none';
    itemDetailModal.setAttribute("aria-hidden", "true");
  }
});


// --- Kalkulator Harga / Estimasi Biaya ---
const serviceTypeSelect = document.getElementById("serviceType");
const quantityInput = document.getElementById("quantity");
const calculatePriceBtn = document.getElementById("calculatePriceBtn");
const estimatedPriceDisplay = document.getElementById("estimatedPrice");

const servicePrices = {
  "catering-paket-a": 1500000, // Harga dasar per paket
  "catering-paket-b": 3500000,
  "event-ruang-kecil": 500000, // Harga per jam
  "event-ruang-besar": 1200000, // Harga per jam
  "workshop-kopi": 250000, // Harga per orang
};

calculatePriceBtn.addEventListener("click", () => {
  const serviceType = serviceTypeSelect.value;
  const quantity = parseInt(quantityInput.value);

  if (isNaN(quantity) || quantity <= 0) {
    alert("Jumlah harus angka positif.");
    return;
  }

  let basePrice = servicePrices[serviceType];
  let estimatedTotal = basePrice * quantity;

  estimatedPriceDisplay.textContent = `Rp ${estimatedTotal.toLocaleString("id-ID")}`;
});

// --- Scroll to Form dari Tabel Perbandingan ---
document.querySelectorAll(".scroll-to-form").forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const customizeFormSection = document.getElementById("customize-package");
    if (customizeFormSection) {
      customizeFormSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});


// --- Formulir Kustomisasi Paket ---
const customPackageForm = document.querySelector(".custom-package-form");
const formMessage = document.getElementById("formMessage");

customPackageForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("custName").value,
    email: document.getElementById("custEmail").value,
    phone: document.getElementById("custPhone").value,
    eventType: document.getElementById("eventType").value,
    eventDate: document.getElementById("eventDate").value,
    attendees: document.getElementById("attendees").value,
    packageDetails: document.getElementById("packageDetails").value,
  };

  // Di sini Anda akan mengirim data formulir.
  // Untuk contoh ini, kita hanya akan mensimulasikan pengiriman.
  console.log("Data Formulir Kustomisasi:", formData);

  formMessage.textContent = "Permintaan Anda sedang diproses...";
  formMessage.className = "form-message"; // Reset class

  try {
    // Simulasi penundaan pengiriman ke server
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Anda akan menambahkan logika pengiriman data ke server di sini
    // Contoh: fetch('/api/send-custom-request', { method: 'POST', body: JSON.stringify(formData) });

    formMessage.textContent = "Terima kasih! Permintaan Anda telah terkirim. Kami akan segera menghubungi Anda.";
    formMessage.classList.add("success");
    customPackageForm.reset(); // Bersihkan formulir
  } catch (error) {
    console.error("Gagal mengirim formulir:", error);
    formMessage.textContent = "Terjadi kesalahan saat mengirim permintaan Anda. Silakan coba lagi.";
    formMessage.classList.add("error");
  }
});


// Inisialisasi: Render katalog saat DOM selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog(servicesAndProducts);
  // Initial filter to show "all" items and set the active button
  const initialFilterButton = document.querySelector('.filter-btn[data-category="all"]');
  if (initialFilterButton) {
    initialFilterButton.classList.add('active');
    initialFilterButton.setAttribute("aria-pressed", "true");
  }
});