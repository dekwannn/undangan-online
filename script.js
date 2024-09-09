// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdjjE3877uZZZCDfHMBUvzbdGt3fdDVsQ",
    authDomain: "undangan-mepandes-c05ad.firebaseapp.com",
    projectId: "undangan-mepandes-c05ad",
    storageBucket: "undangan-mepandes-c05ad.appspot.com",
    messagingSenderId: "782886313507",
    appId: "1:782886313507:web:17a2fa070d204f42365b96",
    measurementId: "G-9J7VV1TCHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Countdown Timer
const countdownDate = new Date("September 14, 2024 11:00:00").getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(x);
        document.querySelector(".countdown").innerHTML = "Acara telah dimulai!";
    }
}, 1000);

// Intersection Observer
document.addEventListener('DOMContentLoaded', function () {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersect, options);
    const sections = document.querySelectorAll('.section-animate');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Show Invitation
document.addEventListener('DOMContentLoaded', function () {
    const showInvitationButton = document.getElementById('showInvitation');
    const section0 = document.getElementById('section0');
    const sections = document.querySelectorAll('.section:not(#section0)');

    showInvitationButton.addEventListener('click', function () {
        section0.style.opacity = '0';
        section0.style.transition = 'opacity 1s ease-out';

        setTimeout(() => {
            section0.style.display = 'none';
            sections.forEach(section => {
                section.style.display = 'flex';
                setTimeout(() => {
                    section.classList.add('is-visible');
                }, 100);
            });
        }, 1000);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    let isPlaying = true;

    musicToggle.addEventListener('click', function () {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.textContent = '🔇'; // Icon untuk mute
        } else {
            backgroundMusic.play();
            musicIcon.textContent = '🔊'; // Icon untuk unmute
        }
        isPlaying = !isPlaying;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const stickerButton = document.getElementById('stickerButton');
    const stickerModal = document.getElementById('stickerModal');
    const closeModal = document.querySelector('.sticker-modal .close');
    const stickerGallery = document.getElementById('stickerGallery');
    const selectedStickers = document.getElementById('selectedStickers');
    const messageForm = document.getElementById('messageForm');

    // Tampilkan modal stiker
    stickerButton.addEventListener('click', () => {
        stickerModal.style.display = 'block';
    });
    
    // Tutup modal stiker
    closeModal.addEventListener('click', () => {
        stickerModal.style.display = 'none';
    });
    
    // Klik di luar modal untuk menutup
    window.addEventListener('click', (event) => {
        if (event.target === stickerModal) {
            stickerModal.style.display = 'none';
        }
    });

    // Tambahkan stiker ke dalam area tampilan stiker yang dipilih
    document.querySelectorAll('#stickerGallery .sticker').forEach(sticker => {
        sticker.addEventListener('click', () => {
            const stickerUrl = sticker.dataset.url;
            
            // Buat elemen untuk stiker yang dipilih
            const selectedSticker = document.createElement('img');
            selectedSticker.src = stickerUrl;
            selectedSticker.classList.add('selected-sticker');
            
            // Tambahkan stiker ke dalam area tampilan stiker yang dipilih
            selectedStickers.appendChild(selectedSticker);
            
            stickerModal.style.display = 'none';
        });
    });

    // Form Handling
    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const attendance = document.getElementById('attendance').value;
        const message = document.getElementById('message').value;

        // Buat elemen untuk pesan
        const guestMessage = document.createElement('div');
        guestMessage.classList.add('guest-message');

        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        avatar.style.backgroundImage = "url('assets/images/avatarr.png')";

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = name;

        const attendanceElement = document.createElement('div');
        attendanceElement.classList.add('attendance');
        attendanceElement.textContent = `Kehadiran: ${attendance}`;

        const timestampElement = document.createElement('div');
        timestampElement.classList.add('timestamp');
        const now = new Date();
        timestampElement.textContent = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

        const messageTextElement = document.createElement('div');
        messageTextElement.classList.add('message-text');

        // Tambahkan stiker yang dipilih ke dalam pesan sebelum teks
        const selectedStickerImages = selectedStickers.querySelectorAll('.selected-sticker');
        selectedStickerImages.forEach(sticker => {
            const stickerImage = document.createElement('img');
            stickerImage.src = sticker.src;
            stickerImage.classList.add('selected-sticker');
            messageTextElement.appendChild(stickerImage);
        });

        // Tambahkan teks pesan setelah stiker
        const messageTextElementContent = document.createElement('div');
        messageTextElementContent.textContent = message;
        messageTextElement.appendChild(messageTextElementContent);

        // Tambahkan elemen lain ke dalam konten pesan
        messageContent.appendChild(nameElement);
        messageContent.appendChild(attendanceElement);
        messageContent.appendChild(timestampElement);
        messageContent.appendChild(messageTextElement);

        guestMessage.appendChild(avatar);
        guestMessage.appendChild(messageContent);

        document.getElementById('guestMessages').appendChild(guestMessage);

        messageForm.reset();
        selectedStickers.innerHTML = ''; // Kosongkan stiker yang dipilih

        const newMessageRef = ref(database, 'messages/' + Date.now());
        set(newMessageRef, {
            name: name,
            attendance: attendance,
            message: message,
            timestamp: now.toISOString(),
            stickers: Array.from(selectedStickerImages).map(sticker => sticker.src)
        }).then(() => {
            console.log('Message saved successfully.');
        }).catch((error) => {
            console.error('Error saving message:', error);
        });
    });

    // Load Messages from Firebase
    const messagesRef = ref(database, 'messages');

    onValue(messagesRef, (snapshot) => {
        const messagesContainer = document.querySelector('#guestMessages');
        messagesContainer.innerHTML = '';

        snapshot.forEach((childSnapshot) => {
            const messageData = childSnapshot.val();
            const messageElement = document.createElement('div');
            messageElement.className = 'guest-message';

            const avatarElement = document.createElement('div');
            avatarElement.className = 'avatar';
            avatarElement.style.backgroundImage = "url('assets/images/avatarr.png')";

            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';

            const nameElement = document.createElement('div');
            nameElement.className = 'name';
            nameElement.textContent = messageData.name;

            const attendanceElement = document.createElement('div');
            attendanceElement.className = 'attendance';
            attendanceElement.textContent = `Kehadiran: ${messageData.attendance}`;

            const timestampElement = document.createElement('div');
            timestampElement.className = 'timestamp';
            timestampElement.textContent = `${new Date(messageData.timestamp).toLocaleString()}`;

            const messageTextElement = document.createElement('div');
            messageTextElement.className = 'message-text';

            // Tambahkan stiker ke dalam pesan jika ada
            if (messageData.stickers) {
                messageData.stickers.forEach(stickerUrl => {
                    const stickerImage = document.createElement('img');
                    stickerImage.src = stickerUrl;
                    stickerImage.classList.add('selected-sticker');
                    messageTextElement.appendChild(stickerImage);
                });
            }

            // Tambahkan teks pesan setelah stiker
            const messageTextElementContent = document.createElement('div');
            messageTextElementContent.textContent = messageData.message;
            messageTextElement.appendChild(messageTextElementContent);

            messageContent.appendChild(nameElement);
            messageContent.appendChild(attendanceElement);
            messageContent.appendChild(timestampElement);
            messageContent.appendChild(messageTextElement);

            messageElement.appendChild(avatarElement);
            messageElement.appendChild(messageContent);

            messagesContainer.appendChild(messageElement);
        });
    });
});




