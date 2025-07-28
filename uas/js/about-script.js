// --- Timeline Interaktif dengan Animasi Saat Scroll ---
const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target); // Berhenti mengamati setelah terlihat
      }
    });
  },
  {
    threshold: 0.4, // Memicu saat 40% item terlihat
  }
);

timelineItems.forEach((item) => {
  timelineObserver.observe(item);
});

// --- Statistik Perusahaan dengan Penghitung Animasi ---
const statsCounters = document.querySelectorAll("#company-stats .count");
const speed = 200; // Sesuaikan untuk kecepatan animasi (lebih rendah lebih cepat)

const animateStatCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const initialCount = +counter.innerText;
  const increment = target / speed; // Hitung penambahan per frame

  if (initialCount < target) {
    counter.innerText = Math.ceil(initialCount + increment);
    setTimeout(() => animateStatCounter(counter), 1); // Lanjutkan animasi
  } else {
    counter.innerText = target; // Pastikan berhenti tepat di target
  }
};

const statsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStatCounter(entry.target);
        observer.unobserve(entry.target); // Berhenti mengamati setelah animasi
      }
    });
  },
  {
    threshold: 0.5, // Memicu saat 50% elemen terlihat
  }
);

statsCounters.forEach((counter) => {
  statsObserver.observe(counter);
});

// Penggantian Feather Icons untuk ikon baru yang ditambahkan secara dinamis atau saat memuat halaman
// Ini sudah ada di script.js utama Anda, tetapi ada baiknya memastikan itu berjalan untuk halaman ini juga jika belum
// dicakup oleh pendengar DOMContentLoaded umum.
document.addEventListener("DOMContentLoaded", () => {
  feather.replace();
});

// PENTING: Pastikan script.js utama Anda menangani toggle navbar dan smooth scroll jika Anda membagikannya.
// Jika tidak, Anda mungkin perlu menyalin bagian-bagian tersebut di sini juga, atau memastikan script.js dimuat terlebih dahulu.
// Template about.html yang disediakan menautkan script.js dan about-script.js.