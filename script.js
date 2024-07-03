window.addEventListener('DOMContentLoaded', (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    
    fetch('participants.json')
        .then(response => response.json())
        .then(data => {
            const participant = data.find(p => p.id == id);
            const invitationText = document.getElementById('invitation-text');
            const invitationText1 = document.getElementById('invitation-text1'); //English
            if (participant) {
                let invitationContent = `
                    <h3>Está invitado</h3>
                    <h2>¡Te esperamos!</h2>
                    <h1>${participant.name}</h1>
                    <h4>Invitación válida por ${participant.valid_for} pase.</h4>
                    <div class="valid-for">${participant.valid_for}</div>
                `;
                if (participant.valid_for !== 1) {
                    invitationContent = `
                        <h3>Están invitados</h3>
                        <h2>¡Los esperamos!</h2>
                        <h1>${participant.name}</h1>
                        <h4>Invitación válida por ${participant.valid_for} pases.</h4>
                        <div class="valid-for">${participant.valid_for}</div> 
                        
                    `;
                }
                invitationText.innerHTML = invitationContent;

                // English
                let invitationContent1 = `
                    <h3>You are invited</h3>
                    <h2>We are waiting for you!</h2>
                    <h1>${participant.name}</h1>
                    <h4>Invitation valid for ${participant.valid_for} pass.</h4>
                    <div class="valid-for">${participant.valid_for}</div>
                `;
                if (participant.valid_for !== 1) {
                    invitationContent1 = `
                        <h3>You are invited</h3>
                        <h2>We are waiting for you!</h2>
                        <h1>${participant.name}</h1>
                        <h4>Invitation valid for ${participant.valid_for} passes.</h4>
                        <div class="valid-for">${participant.valid_for}</div> 
                        
                    `;
                }
                invitationText1.innerHTML = invitationContent1;
            }
        });
});

const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }


        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

    });

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

// Modal Functionality
const modal = document.getElementById("confirmModal");
const btn = document.querySelector(".confirm-button");
const span = document.querySelector(".close-button");

btn.onclick = function() {
  modal.style.display = "flex";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Intro overlay
document.getElementById('intro-overlay').addEventListener('click', function() {
    this.style.display = 'none';
});

// countdown 
const countdown = document.getElementById('countdown');
const weddingDate = new Date('2024-08-03T00:00:00');

const formatNumber = (number) => number.toString().padStart(2, '0');

const updateCountdown = () => {
    const currentDate = new Date();
    const diff = weddingDate - currentDate;
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    countdown.innerHTML = `
        <div><span class="number">${formatNumber(days)}</span><span>Días</span></div>
        <div><span class="number">${formatNumber(hours)}</span><span>Hrs</span></div>
        <div><span class="number">${formatNumber(minutes)}</span><span>Min</span></div>
        <div><span class="number">${formatNumber(seconds)}</span><span>Seg</span></div>
    `;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// qr
const qrModal = document.getElementById("qrModal");
const qrBtn = document.querySelector(".qr-button");
const qrSpan = document.querySelector(".close-button-qr");

qrBtn.onclick = function() {
    qrModal.style.display = "flex";
}

qrSpan.onclick = function() {
    qrModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == qrModal) {
        qrModal.style.display = "none";
    }
}