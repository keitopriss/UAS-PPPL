// --- Interactive Contact Form with Real-time Validation ---
const contactForm = document.getElementById("mainContactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const submitFormBtn = document.getElementById("submitFormBtn");
const formSubmissionMessage = document.getElementById("formSubmissionMessage");
const messageCharCount = document.getElementById("messageCharCount");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

function showError(element, message) {
  const errorDisplay = document.getElementById(element.id + "Error");
  element.classList.add("invalid");
  errorDisplay.textContent = message;
}

function clearError(element) {
  const errorDisplay = document.getElementById(element.id + "Error");
  element.classList.remove("invalid");
  errorDisplay.textContent = "";
}

function validateField(inputElement) {
  let isValid = true;
  const value = inputElement.value.trim();

  switch (inputElement.id) {
    case "name":
      if (value.length < 2) {
        showError(inputElement, "Nama minimal 2 karakter.");
        isValid = false;
      } else {
        clearError(inputElement);
      }
      break;
    case "email":
      if (!emailRegex.test(value)) {
        showError(inputElement, "Format email tidak valid.");
        isValid = false;
      } else {
        clearError(inputElement);
      }
      break;
    case "subject":
      if (value.length < 5) {
        showError(inputElement, "Subjek minimal 5 karakter.");
        isValid = false;
      } else {
        clearError(inputElement);
      }
      break;
    case "message":
      if (value.length < 10) {
        showError(inputElement, "Pesan minimal 10 karakter.");
        isValid = false;
      } else if (value.length > 500) {
        showError(inputElement, "Pesan maksimal 500 karakter.");
        isValid = false;
      } else {
        clearError(inputElement);
      }
      messageCharCount.textContent = value.length;
      break;
    case "phone":
      // Validasi opsional untuk telepon jika diisi
      if (value !== "" && !/^\+?[0-9\s-]{7,15}$/.test(value)) {
        showError(inputElement, "Format nomor telepon tidak valid.");
        isValid = false;
      } else {
        clearError(inputElement);
      }
      break;
  }
  return isValid;
}

// Real-time validation on input
nameInput.addEventListener("input", () => validateField(nameInput));
emailInput.addEventListener("input", () => validateField(emailInput));
phoneInput.addEventListener("input", () => validateField(phoneInput));
subjectInput.addEventListener("input", () => validateField(subjectInput));
messageInput.addEventListener("input", () => validateField(messageInput));

// Character counter for message
messageInput.addEventListener("keyup", () => {
  messageCharCount.textContent = messageInput.value.length;
});

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let isFormValid = true;
  // Validate all required fields
  isFormValid = validateField(nameInput) && isFormValid;
  isFormValid = validateField(emailInput) && isFormValid;
  isFormValid = validateField(subjectInput) && isFormValid;
  isFormValid = validateField(messageInput) && isFormValid;
  isFormValid = validateField(phoneInput) && isFormValid; // Validate optional field if filled

  if (isFormValid) {
    submitFormBtn.disabled = true;
    formSubmissionMessage.textContent = "Mengirim pesan...";
    formSubmissionMessage.className = "form-message"; // Reset class

    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim(),
    };

    try {
      // Simulate API call
      console.log("Mengirim data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      // In a real application, you'd send this data to your backend
      // fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      formSubmissionMessage.textContent = "Pesan Anda berhasil terkirim! Terima kasih.";
      formSubmissionMessage.classList.add("success");
      contactForm.reset();
      messageCharCount.textContent = "0"; // Reset counter
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      formSubmissionMessage.textContent = "Gagal mengirim pesan. Silakan coba lagi.";
      formSubmissionMessage.classList.add("error");
    } finally {
      submitFormBtn.disabled = false;
    }
  } else {
    formSubmissionMessage.textContent = "Mohon lengkapi semua bidang yang wajib diisi dengan benar.";
    formSubmissionMessage.classList.add("error");
  }
});

// --- Google Maps Integration ---
let map;
let markers = [];

// Define your branch locations
const locations = [
  {
    id: "main_branch",
    name: "Kedai Kopi Senja - Cabang Utama",
    lat: -7.279703, // Contoh koordinat Surabaya
    lng: 112.791552, // Contoh koordinat Surabaya
    info: "Jl. Contoh No. 123, Surabaya. Buka setiap hari 08:00 - 22:00.",
  },
  {
    id: "mall_outlet",
    name: "Kedai Kopi Senja - Outlet Mall",
    lat: -7.269018, // Contoh koordinat lain
    lng: 112.734898, // Contoh koordinat lain
    info: "Mall ABC Lantai Dasar, Surabaya. Buka setiap hari 10:00 - 21:00.",
  },
  // Tambahkan lokasi lain jika ada
];

window.initMap = function () {
  const defaultLocation = { lat: -7.279703, lng: 112.791552 }; // Default: Cabang Utama
  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 12,
    mapId: 'YOUR_CUSTOM_MAP_ID' // Opsional: Gunakan Map ID kustom dari Google Cloud
  });

  // Create markers for all locations
  locations.forEach(location => {
    const marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.name,
    });
    markers.push(marker);

    const infowindow = new google.maps.InfoWindow({
      content: `<strong>${location.name}</strong><br>${location.info}`,
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  });

  // Event listeners for map control buttons
  document.querySelectorAll(".map-btn").forEach(button => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      document.querySelectorAll(".map-btn").forEach(btn => btn.classList.remove("active"));
      // Add active class to the clicked button
      button.classList.add("active");

      const locationId = button.dataset.location;
      const selectedLocation = locations.find(loc => loc.id === locationId);
      if (selectedLocation) {
        map.setCenter({ lat: selectedLocation.lat, lng: selectedLocation.lng });
        map.setZoom(15); // Zoom in when selecting a specific location

        // Open infowindow for the selected marker
        const selectedMarker = markers.find(marker => marker.getTitle() === selectedLocation.name);
        if (selectedMarker) {
            new google.maps.InfoWindow({
                content: `<strong>${selectedLocation.name}</strong><br>${selectedLocation.info}`,
            }).open(map, selectedMarker);
        }
      }
    });
  });
  // Set initial active state for the first button (Cabang Utama)
  document.querySelector('.map-btn[data-location="main_branch"]').classList.add('active');
};


// --- Simulasi Live Chat Sederhana ---
const liveChatWidget = document.getElementById("liveChatWidget");
const openChatBtn = document.getElementById("openChatBtn");
const chatHeader = document.getElementById("chatHeader");
const chatToggleBtn = document.querySelector(".chat-toggle-btn");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendChatBtn = document.getElementById("sendChatBtn");

let isChatOpen = false;

openChatBtn.addEventListener("click", () => {
  liveChatWidget.classList.add("active");
  openChatBtn.style.display = "none";
  isChatOpen = true;
  chatBody.scrollTop = chatBody.scrollHeight; // Scroll to bottom
});

chatToggleBtn.addEventListener("click", () => {
  liveChatWidget.classList.remove("active");
  openChatBtn.style.display = "flex"; // Show the open button again
  isChatOpen = false;
});

function addChatMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message");
  messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
  messageDiv.textContent = message;
  chatBody.appendChild(messageDiv);
  chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to latest message
}

function handleBotResponse(userMessage) {
  const lowerCaseMessage = userMessage.toLowerCase();
  let botResponse = "Maaf, saya tidak mengerti pertanyaan Anda. Bisakah Anda mengulanginya atau mencoba kata kunci lain?";

  if (lowerCaseMessage.includes("jam buka") || lowerCaseMessage.includes("buka jam berapa")) {
    botResponse = "Kedai kami buka setiap hari dari jam 08:00 pagi hingga 10:00 malam.";
  } else if (lowerCaseMessage.includes("lokasi") || lowerCaseMessage.includes("alamat")) {
    botResponse = "Cabang utama kami ada di Jl. Contoh No. 123, Surabaya. Anda bisa melihat peta di bawah untuk detailnya.";
  } else if (lowerCaseMessage.includes("menu")) {
    botResponse = "Anda bisa melihat menu lengkap kami di halaman 'Layanan & Produk'. Kami punya berbagai kopi, teh, dan makanan ringan.";
  } else if (lowerCaseMessage.includes("halo") || lowerCaseMessage.includes("hai")) {
    botResponse = "Halo! Ada yang bisa saya bantu?";
  } else if (lowerCaseMessage.includes("terima kasih") || lowerCaseMessage.includes("makasih")) {
    botResponse = "Sama-sama! Senang bisa membantu.";
  } else if (lowerCaseMessage.includes("katering")) {
      botResponse = "Ya, kami menyediakan layanan katering kopi untuk berbagai acara. Silakan kunjungi halaman Layanan kami untuk detail paket.";
  } else if (lowerCaseMessage.includes("pemesanan")) {
      botResponse = "Untuk pemesanan atau reservasi, Anda bisa mengisi formulir di atas atau datang langsung ke kedai kami.";
  }


  setTimeout(() => {
    addChatMessage(botResponse, "bot");
  }, 800); // Simulate bot typing delay
}

sendChatBtn.addEventListener("click", () => {
  const userMessage = chatInput.value.trim();
  if (userMessage) {
    addChatMessage(userMessage, "user");
    chatInput.value = "";
    handleBotResponse(userMessage);
  }
});

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendChatBtn.click();
  }
});

// Make chat widget draggable
let isDragging = false;
let offsetX, offsetY;

chatHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - liveChatWidget.getBoundingClientRect().left;
    offsetY = e.clientY - liveChatWidget.getBoundingClientRect().top;
    liveChatWidget.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    liveChatWidget.style.left = `${e.clientX - offsetX}px`;
    liveChatWidget.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    liveChatWidget.style.cursor = 'grab';
});


// --- FAQ Accordion with Search Functionality ---
const faqAccordion = document.getElementById("faqAccordion");
const faqSearchInput = document.getElementById("faqSearchInput");

const faqData = [
  {
    question: "Apa saja layanan katering yang ditawarkan?",
    answer:
      "Kami menawarkan paket katering kopi dan teh lengkap untuk berbagai acara seperti pernikahan, acara korporat, ulang tahun, dan gathering. Paket bisa disesuaikan dengan kebutuhan Anda.",
  },
  {
    question: "Bagaimana cara melakukan reservasi meja?",
    answer:
      "Anda bisa melakukan reservasi meja melalui telepon, WhatsApp, atau datang langsung ke kedai kami. Untuk acara besar, disarankan reservasi minimal H-3.",
  },
  {
    question: "Apakah Kedai Kopi Senja menerima pembayaran non-tunai?",
    answer:
      "Ya, kami menerima berbagai metode pembayaran non-tunai seperti kartu debit/kredit, QRIS, dan dompet digital (OVO, GoPay, Dana).",
  },
  {
    question: "Apakah ada program loyalitas untuk pelanggan?",
    answer:
      "Tentu! Kami memiliki program loyalitas 'Senja Poin' di mana Anda bisa mengumpulkan poin setiap pembelian dan menukarkannya dengan diskon atau produk gratis. Tanyakan kepada barista kami untuk pendaftaran.",
  },
  {
    question: "Apakah ada wifi gratis di Kedai Kopi Senja?",
    answer:
      "Ya, kami menyediakan fasilitas WiFi gratis untuk semua pelanggan kami. Anda bisa menanyakan password kepada staf kami.",
  },
  {
    question: "Bisakah saya memesan biji kopi untuk dibawa pulang?",
    answer:
    "Tentu saja! Kami menjual berbagai jenis biji kopi pilihan dari petani lokal maupun internasional, dalam bentuk biji utuh maupun bubuk sesuai permintaan Anda.",
  },
  {
    question: "Apakah ada pilihan menu vegan/vegetarian?",
    answer:
    "Kami memiliki beberapa pilihan menu makanan dan minuman yang cocok untuk vegan atau vegetarian. Silakan tanyakan kepada staf kami untuk rekomendasi.",
  },
  {
    question: "Apakah ada parkir yang memadai?",
    answer:
    "Ya, di cabang utama kami menyediakan area parkir yang cukup luas untuk mobil dan motor. Untuk outlet di mall, tersedia parkir mall.",
  },
];

function renderFAQs(filteredFaqs) {
  faqAccordion.innerHTML = "";
  filteredFaqs.forEach((faq, index) => {
    const faqItem = document.createElement("div");
    faqItem.classList.add("faq-item");
    faqItem.innerHTML = `
            <button class="accordion-header" id="faq-header-${index}">
                ${faq.question}
                <i data-feather="chevron-down" class="accordion-icon"></i>
            </button>
            <div class="accordion-content" id="faq-content-${index}">
                <p>${faq.answer}</p>
            </div>
        `;
    faqAccordion.appendChild(faqItem);
  });
  feather.replace(); // Re-initialize feather icons for new elements
  attachAccordionListeners(); // Attach listeners to new headers
}

function attachAccordionListeners() {
  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling; // The accordion-content div
      const icon = header.querySelector(".accordion-icon");

      header.classList.toggle("active");
      icon.classList.toggle("active");

      if (content.classList.contains("show")) {
        content.classList.remove("show");
        content.style.maxHeight = null; // Reset max-height to allow transition
      } else {
        // Close other open accordions
        document.querySelectorAll(".accordion-content.show").forEach(openContent => {
            openContent.classList.remove("show");
            openContent.style.maxHeight = null;
            openContent.previousElementSibling.classList.remove("active"); // Remove active from header
            openContent.previousElementSibling.querySelector('.accordion-icon').classList.remove("active"); // Remove active from icon
        });

        content.classList.add("show");
        // Set max-height to scrollHeight to enable CSS transition
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

faqSearchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm) ||
      faq.answer.toLowerCase().includes(searchTerm)
  );
  renderFAQs(filteredFaqs);
});

// Initial render of FAQs
document.addEventListener("DOMContentLoaded", () => {
  renderFAQs(faqData);
  // Optional: Initialize Google Maps if it hasn't loaded via defer
  if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
    console.warn("Google Maps API not loaded yet. Ensure 'YOUR_Maps_API_KEY' is replaced and script is correct.");
    // Fallback or retry loading here if needed, or rely solely on defer/async.
  } else {
    // If initMap function is called by the Google Maps script itself (via callback=initMap)
    // you might not need to call it here explicitly unless for testing purposes.
    // window.initMap(); // Call only if not relying on callback in script src
  }

  // Set initial state for the map button (first one active)
  const firstMapButton = document.querySelector('.map-btn[data-location="main_branch"]');
  if (firstMapButton) {
      firstMapButton.classList.add('active');
  }
});

// Data Dummy untuk Lokasi Peta (sesuaikan dengan lokasi Anda)
