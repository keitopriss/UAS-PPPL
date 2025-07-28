// --- Hero Section: Parallax Scrolling Effect ---
const heroBgParallax = document.querySelector(".hero-bg-parallax");

window.addEventListener("scroll", () => {
  const scrollPosition = window.pageYOffset;
  heroBgParallax.style.transform = `translateY(${scrollPosition * 0.5}px)`; // Adjust 0.5 for desired parallax speed
});

// --- Hero Section: Dynamic Typing Effect ---
const typingEffectElement = document.querySelector(".typing-effect");
const taglines = [
  "Awali harimu dengan semangat kopi.",
  "Rasakan kehangatan dalam setiap tegukan.",
  "Momen terbaik tercipta di Kedai Kopi Senja.",
  "Lebih dari sekadar kopi, ini adalah pengalaman.",
];
let taglineIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100; // milliseconds per character

function type() {
  const currentTagline = taglines[taglineIndex];

  if (isDeleting) {
    typingEffectElement.textContent = currentTagline.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEffectElement.textContent = currentTagline.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentTagline.length) {
    // Finished typing, start deleting after a pause
    typingSpeed = 2000; // Pause at end of typing
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Finished deleting, move to next tagline
    typingSpeed = 50; // Speed up deleting
    isDeleting = false;
    taglineIndex = (taglineIndex + 1) % taglines.length;
  } else {
    typingSpeed = isDeleting ? 50 : 100; // Normal typing/deleting speed
  }

  setTimeout(type, typingSpeed);
}

// Start the typing effect when the DOM is loaded
document.addEventListener("DOMContentLoaded", type);


// --- Interactive Statistics Counter ---
const statisticsSection = document.getElementById("statistics-section");
const statNumbers = document.querySelectorAll(".stat-number");
let hasAnimated = false; // Flag to ensure animation runs only once

function animateCounter(entry) {
  if (entry[0].isIntersecting && !hasAnimated) {
    statNumbers.forEach(stat => {
      const target = +stat.dataset.target; // Convert to number
      let current = 0;
      const increment = target / 200; // Adjust 200 for animation speed (more steps = slower)

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          stat.textContent = Math.ceil(current); // Round up for cleaner numbers
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target; // Ensure exact target is displayed
        }
      };
      updateCounter();
    });
    hasAnimated = true;
  }
}

// Use Intersection Observer to trigger animation when section is in view
const observer = new IntersectionObserver(animateCounter, {
  threshold: 0.5, // Trigger when 50% of the section is visible
});

observer.observe(statisticsSection);


// --- Call-to-Action (CTA) with Smooth Scroll ---
const ctaButton = document.querySelector(".hero .cta-button");

ctaButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default anchor link behavior
  const targetId = ctaButton.getAttribute("href"); // Get target section ID from href
  const targetSection = document.querySelector(targetId);

  if (targetSection) {
    // Scroll smoothly to the target section
    window.scrollTo({
      top: targetSection.offsetTop - document.querySelector('.navbar').offsetHeight, // Adjust for fixed navbar height
      behavior: "smooth",
    });
  }
});


// Ensure feather icons are replaced if this script runs later
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
});

// --- Testimonial Carousel and Star Rating ---
const testimonialsData = [
  {
    rating: 5,
    quote: "Kopi terbaik di kota! Suasananya nyaman, pelayanannya ramah. Sangat direkomendasikan untuk ngopi santai atau kerja.",
    clientName: "Ahmad Fauzi",
    clientTitle: "Karyawan Swasta",
  },
  {
    rating: 4,
    quote: "Suka sekali dengan menu signature mereka. Barista sangat informatif tentang asal-usul biji kopi. Pengalaman yang luar biasa!",
    clientName: "Budi Santoso",
    clientTitle: "Pecinta Kopi",
  },
  {
    rating: 5,
    quote: "Pelayanan katering Kedai Kopi Senja sangat profesional. Acara kantor kami berjalan lancar berkat mereka. Kopi selalu segar dan lezat.",
    clientName: "Citra Dewi",
    clientTitle: "Event Organizer",
  },
  {
    rating: 4,
    quote: "Tempatnya cozy, pas buat nongkrong sore. Sayangnya sering ramai jadi agak susah dapat tempat duduk di jam sibuk.",
    clientName: "Diana Putri",
    clientTitle: "Mahasiswa",
  },
  {
    rating: 5,
    quote: "Saya memesan biji kopi house blend mereka secara online, pengiriman cepat dan kualitasnya tidak pernah mengecewakan. Terus sukses Kedai Kopi Senja!",
    clientName: "Eko Prasetyo",
    clientTitle: "Pengusaha",
  },
];

const testimonialCarousel = document.querySelector(".testimonial-carousel");
const prevBtn = document.querySelector(".testimonial-carousel-container .prev-btn");
const nextBtn = document.querySelector(".testimonial-carousel-container .next-btn");
const carouselDotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;
let autoSlideInterval;

// Function to generate star rating HTML
function getStarRatingHTML(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let starsHTML = '';
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<span class="star">&#9733;</span>';
  }
  if (halfStar) {
    starsHTML += '<span class="star half">&#9733;</span>'; // You might need a specific style for half star if desired
  }
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<span class="star empty">&#9733;</span>'; // Style empty stars differently (e.g., lighter color)
  }

  // Determine rating text
  let ratingText = '';
  if (rating === 5) ratingText = 'Sangat Puas';
  else if (rating >= 4) ratingText = 'Puas';
  else if (rating >= 3) ratingText = 'Cukup Puas';
  else ratingText = 'Kurang Puas';


  return `
    <div class="star-rating" data-rating="${rating}">
      ${starsHTML}
      <div class="rating-detail">${rating.toFixed(1)} dari 5 bintang (${ratingText})</div>
    </div>
  `;
}

// Function to load testimonials dynamically
function loadTestimonials() {
  testimonialCarousel.innerHTML = "";
  carouselDotsContainer.innerHTML = "";

  testimonialsData.forEach((testimonial, index) => {
    const testimonialItem = document.createElement("div");
    testimonialItem.classList.add("testimonial-item");

    testimonialItem.innerHTML = `
      ${getStarRatingHTML(testimonial.rating)}
      <p class="quote">"${testimonial.quote}"</p>
      <p class="client-name">- ${testimonial.clientName}</p>
      <p class="client-title">${testimonial.clientTitle}</p>
    `;
    testimonialCarousel.appendChild(testimonialItem);

    // Create carousel dots
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("data-index", index);
    dot.addEventListener("click", () => showTestimonial(index));
    carouselDotsContainer.appendChild(dot);
  });
  updateCarousel(); // Update active dot and slide position
}

// Function to update carousel position and active dot
function updateCarousel() {
  const offset = -currentIndex * testimonialCarousel.offsetWidth;
  testimonialCarousel.style.transform = `translateX(${offset}px)`;

  document.querySelectorAll(".carousel-dots .dot").forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// Function to show specific testimonial (for dots)
function showTestimonial(index) {
  currentIndex = index;
  updateCarousel();
  resetAutoSlide();
}

// Navigation buttons
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex === 0) ? testimonialsData.length - 1 : currentIndex - 1;
  updateCarousel();
  resetAutoSlide();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex === testimonialsData.length - 1) ? 0 : currentIndex + 1;
  updateCarousel();
  resetAutoSlide();
});

// Auto-sliding functionality
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex === testimonialsData.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  }, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Initialize carousel on page load
document.addEventListener("DOMContentLoaded", () => {
  loadTestimonials();
  startAutoSlide();

  // Handle window resize to re-calculate slide offset
  window.addEventListener('resize', () => {
    updateCarousel();
  });
});