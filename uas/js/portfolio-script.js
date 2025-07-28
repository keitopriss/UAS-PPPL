// Data Dummy untuk Proyek Portofolio
const projects = [
  {
    id: "korporat-xyz",
    category: "korporat",
    title: "Katering Peluncuran Produk XYZ Tech",
    thumbnail: "img/img ketering/Katering Peluncuran.jpg",
    images: [
      "img/img ketering/ketering 1.jpg",
      "img/img ketering/ketering 2.jpg",
      "img/img ketering/ketering 3.jpg",
    ],
    description:
      "Kami menyediakan layanan katering kopi premium untuk acara peluncuran produk inovatif XYZ Tech. Acara ini dihadiri oleh 200 lebih undangan penting dari berbagai sektor industri. Fokus kami adalah menyajikan minuman kopi berkualitas tinggi yang disesuaikan dengan tema futuristik acara.",
    details: [
      "Jumlah Tamu: 200+",
      "Layanan: Kopi & Teh Bar Lengkap",
      "Lokasi: Grand Ballroom Hotel Senja",
      "Tanggal: 15 Mei 2025",
      "Fitur Spesial: Barista dengan Robot Arm (demo)",
    ],
    testimonial: {
      quote:
        "Kedai Kopi Senja memberikan sentuhan profesional yang luar biasa untuk acara peluncuran kami. Kopi yang lezat dan layanan yang sempurna! Tim mereka sangat responsif dan memahami kebutuhan kami.",
      client: "Sarah Lim, Marketing Director XYZ Tech",
    },
  },
  {
    id: "privat-ulangtahun-bapak-andi",
    category: "privat",
    title: "Pesta Ulang Tahun Bapak Andi",
    thumbnail: "img/ultah/pesta ultah.jpg",
    images: [
      "img/ultah/ultah 1.jpg",
      "img/ultah/ultah 2.jpg",
    ],
    description:
      "Menyelenggarakan coffee corner eksklusif untuk perayaan ulang tahun ke-50 Bapak Andi di kediaman pribadinya. Kami menciptakan suasana hangat dan akrab dengan pilihan kopi favorit keluarga.",
    details: [
      "Jumlah Tamu: 50 orang",
      "Layanan: Private Coffee Bar & Signature Mocktails",
      "Lokasi: Kediaman Pribadi",
      "Tanggal: 20 Juni 2025",
      "Fitur Spesial: Kopi racikan khusus 'Andi's Blend'",
    ],
    testimonial: {
      quote:
        "Sangat terkesan dengan layanan Kedai Kopi Senja di pesta ulang tahun ayah saya. Semua tamu memuji kopinya, dan barista-nya sangat ramah serta profesional. Benar-benar membuat acara lebih berkesan!",
      client: "Budi Santoso, Anak Bapak Andi",
    },
  },
  {
    id: "workshop-mengolah-kopi-rumah",
    category: "workshop",
    title: "Workshop 'Mengolah Kopi di Rumah'",
    thumbnail: "img/workshop/workshop.jpg",
    images: [
      "img/workshop/wrk 1.jpg",
      "img/workshop/wrk 2.jpg",
      "img/workshop/wrk 3.jpg",
    ],
    description:
      "Mengadakan workshop interaktif untuk pecinta kopi yang ingin meningkatkan keterampilan menyeduh kopi di rumah. Peserta belajar mulai dari pemilihan biji, penggilingan, hingga teknik brewing dasar.",
    details: [
      "Jumlah Peserta: 25 orang",
      "Layanan: Workshop & Demo, Kit Kopi",
      "Lokasi: Kedai Kopi Senja (Cabang Utama)",
      "Tanggal: 5 Juli 2025",
      "Materi: Manual Brewing (V60, Aeropress), Pemilihan Biji",
    ],
    testimonial: {
      quote:
        "Workshopnya sangat informatif dan menyenangkan! Barista yang mengajar sangat sabar dan ahli. Sekarang saya bisa membuat kopi enak sendiri di rumah. Terima kasih Kedai Kopi Senja!",
      client: "Rina Dewi, Peserta Workshop",
    },
  },
  {
    id: "kolaborasi-festival-kuliner",
    category: "kolaborasi",
    title: "Partisipasi Festival Kuliner Kota",
    thumbnail: "img/kolabor/kolaborasi.jpg",
    images: [
      "img/kolabor/kola 1.jpg",
      "img/kolabor/kola 2.jpg",
      "img/kolabor/kola 3.jpg",
    ],
    description:
      "Kami berpartisipasi dalam Festival Kuliner Tahunan Kota, menampilkan berbagai kopi spesial dan inovasi menu minuman berbasis kopi kami. Stand kami menjadi salah satu yang paling ramai dikunjungi.",
    details: [
      "Pengunjung: 1000+ (estimasi stand)",
      "Layanan: Penjualan Kopi Spesial & Minuman Inovatif",
      "Lokasi: Lapangan Merdeka Kota",
      "Tanggal: 10-12 Juli 2025",
      "Prestasi: Juara 2 Kategori Minuman Inovatif",
    ],
    testimonial: {
      quote:
        "Kopi Senja selalu menghadirkan kejutan di setiap event. Saya antri panjang untuk mencoba es kopi pisang mereka, dan itu worth it! Selamat atas prestasinya di festival!",
      client: "Andi Wijaya, Pengunjung Festival",
    },
  },
];

// --- Project Showcase dengan Filtering & Lightbox ---
const portfolioGrid = document.querySelector(".portfolio-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentLightboxImages = []; // Array of image URLs for the current project
let currentLightboxIndex = 0;   // Current image index in lightbox

// Lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCloseBtn = document.querySelector(".lightbox-close-btn");

// Project Detail Modal elements
const projectDetailModal = document.getElementById("projectDetailModal");
const modalCloseButton = projectDetailModal.querySelector(".close-button");
const modalProjectTitle = document.getElementById("modalProjectTitle");
const modalProjectCategory = document.getElementById("modalProjectCategory");
const modalMainProjectImg = document.getElementById("modalMainProjectImg");
const modalProjectDescription = document.getElementById("modalProjectDescription");
const modalClientTestimonial = document.getElementById("modalClientTestimonial");
const modalProjectDetailsList = document.getElementById("modalProjectDetailsList");
const modalGalleryThumbnailContainer = projectDetailModal.querySelector(".modal-gallery-thumbnail");

function renderPortfolio(itemsToRender) {
  portfolioGrid.innerHTML = ""; // Clear existing grid

  itemsToRender.forEach((project) => {
    const portfolioItem = document.createElement("div");
    portfolioItem.classList.add("portfolio-item");
    portfolioItem.setAttribute("data-category", project.category);

    portfolioItem.innerHTML = `
      <img src="${project.thumbnail}" alt="${project.title}">
      <div class="item-overlay">
        <h3>${project.title}</h3>
        <p>${project.description.substring(0, 100)}...</p>
        <button class="view-project-btn" data-project-id="${project.id}">Lihat Proyek</button>
      </div>
    `;
    portfolioGrid.appendChild(portfolioItem);
  });
  attachViewProjectButtonListeners();
}

function filterPortfolio(category) {
  const allItems = document.querySelectorAll(".portfolio-item");
  allItems.forEach(item => {
    const itemCategory = item.getAttribute("data-category");
    if (category === "all" || itemCategory === category) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}


// Event listeners for filter buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const category = button.getAttribute("data-category");
    filterPortfolio(category);
  });
});

// Function to open Lightbox
function openLightbox(images, startIndex) {
  currentLightboxImages = images;
  currentLightboxIndex = startIndex;
  lightboxImg.src = currentLightboxImages[currentLightboxIndex];
  lightbox.style.display = "block";
}

// Function to navigate slides in Lightbox
window.plusSlides = function(n) {
  currentLightboxIndex += n;
  if (currentLightboxIndex >= currentLightboxImages.length) {
    currentLightboxIndex = 0;
  }
  if (currentLightboxIndex < 0) {
    currentLightboxIndex = currentLightboxImages.length - 1;
  }
  lightboxImg.src = currentLightboxImages[currentLightboxIndex];
};

lightboxCloseBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Close lightbox when clicking outside the image
window.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.style.display = "none";
  }
});


// Function to attach listeners for 'Lihat Proyek' buttons
function attachViewProjectButtonListeners() {
  document.querySelectorAll(".view-project-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent portfolio item hover from interfering
      const projectId = e.target.dataset.projectId;
      const project = projects.find((p) => p.id === projectId);

      if (project) {
        modalProjectTitle.textContent = project.title;
        modalProjectCategory.textContent = project.category.charAt(0).toUpperCase() + project.category.slice(1); // Capitalize first letter
        modalMainProjectImg.src = project.images[0]; // Set main image to first image
        modalMainProjectImg.setAttribute('data-current-index', 0); // Track current image index for lightbox

        modalProjectDescription.textContent = project.description;

        // Populate testimonial
        modalClientTestimonial.querySelector(".quote").textContent = `"${project.testimonial.quote}"`;
        modalClientTestimonial.querySelector(".client-info").textContent = `- ${project.testimonial.client}`;

        // Populate project details list
        modalProjectDetailsList.innerHTML = "";
        project.details.forEach((detail) => {
          const li = document.createElement("li");
          li.textContent = detail;
          modalProjectDetailsList.appendChild(li);
        });

        // Populate thumbnail gallery
        modalGalleryThumbnailContainer.innerHTML = "";
        project.images.forEach((imgSrc, index) => {
          const thumbImg = document.createElement("img");
          thumbImg.src = imgSrc;
          thumbImg.alt = `Thumbnail ${index + 1}`;
          thumbImg.classList.add("modal-thumbnail");
          if (index === 0) {
            thumbImg.classList.add("active"); // Set first thumbnail as active
          }
          thumbImg.addEventListener("click", () => {
            modalMainProjectImg.src = imgSrc;
            modalMainProjectImg.setAttribute('data-current-index', index); // Update current image index
            // Remove active from all thumbnails and add to clicked one
            modalGalleryThumbnailContainer.querySelectorAll('.modal-thumbnail').forEach(t => t.classList.remove('active'));
            thumbImg.classList.add('active');
          });
          modalGalleryThumbnailContainer.appendChild(thumbImg);
        });

        // Event listener for main image to open lightbox
        modalMainProjectImg.onclick = () => {
          const currentIndex = parseInt(modalMainProjectImg.getAttribute('data-current-index'));
          openLightbox(project.images, currentIndex);
        };


        projectDetailModal.style.display = "block";
      }
    });
  });
}

modalCloseButton.addEventListener("click", () => {
  projectDetailModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === projectDetailModal) {
    projectDetailModal.style.display = "none";
  }
});

// Inisialisasi: Render portofolio saat DOM selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  renderPortfolio(projects); // Render semua proyek secara default
  feather.replace(); // Pastikan ikon Feather diinisialisasi
});