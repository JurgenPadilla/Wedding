window.addEventListener('DOMContentLoaded', (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    console.log('Query String:', queryString);
    console.log('URL Params:', urlParams);
    console.log('ID:', id);
    
    fetch('participants.json')
        .then(response => {
            console.log('Fetch response status:', response.status);
            return response.json();
        })
        .then(data => {
            // console.log('Participants data:', data);
            const participant = data.find(p => p.id == id);
            // console.log('Participant:', participant);

            const invitationText = document.getElementById('invitation-text'); // Spanish
            const modalContent = document.getElementById('modal-content'); 

            if (participant) {
                if (invitationText) {
                    let invitationContent = `
                        <h3>Está invitado</h3>
                        <h2>¡Te esperamos!</h2>
                        <h1>${participant.name}</h1>
                        <h4>Invitación válida por</h4>
                        <div class="valid-for">${participant.valid_for}</div>
                        <h4>pase</h4>
                    `;
                    if (participant.valid_for !== 1) {
                        invitationContent = `
                            <h3>Están invitados</h3>
                            <h2>¡Los esperamos!</h2>
                            <h1>${participant.name}</h1>
                            <h4>Invitación válida por</h4>
                            <div class="valid-for">${participant.valid_for}</div>
                            <h4>pases</h4>
                        `;
                    }
                    invitationText.innerHTML = invitationContent;
                }

                if (modalContent) {
                    let iframeContent = '';
                    switch (participant.valid_for) {
                        case 1:
                            iframeContent = `
                                <iframe class="responsive-iframe" src="https://docs.google.com/forms/d/e/1FAIpQLSdkeBWQzoaXsrHe0ufTBtxfq9F4lndbnoXZCgZDjGJ3M5J8hA/viewform?embedded=true" width="640" height="675" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                            `;
                            break;
                        case 2:
                            iframeContent = `
                                <iframe class="responsive-iframe" src="https://docs.google.com/forms/d/e/1FAIpQLSdD9UiTQmz8xDeabbgcvMfoRfCrCD4i4beECQJxbLJ_uFwkxw/viewform?embedded=true" width="640" height="675" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                            `;
                            break;
                        case 3:
                            iframeContent = `
                                <iframe class="responsive-iframe" src="https://docs.google.com/forms/d/e/1FAIpQLSdZQZBlhmDR9zpnIJCdUmCDsB9U2P66d5DrdXrYzFgob76QRQ/viewform?embedded=true" width="640" height="675" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                            `;
                            break;
                        case 4:
                            iframeContent = `
                                <iframe class="responsive-iframe" src="https://docs.google.com/forms/d/e/1FAIpQLSeEi5kHNFRtxdZAjR10JYAtSvz-iBqYey_eLf1vLdx-kQFT-g/viewform?embedded=true" width="640" height="675" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                            `;
                            break;
                        case 5:
                            iframeContent = `
                                <iframe class="responsive-iframe" src="https://docs.google.com/forms/d/e/1FAIpQLSd4drERoMwbb3okooyodoCepIeiZ8AE6-kT4-ueMAHqZhHcOw/viewform?embedded=true" width="640" height="675" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                            `;
                            break;
                        case 6:
                            iframeContent = `
                                <iframe class="responsive-iframe" src="https://docs.google.com/forms/d/e/1FAIpQLSdx8NrR3IyQ-n0kXU9m6qlJEkb_yASLr_oYZOtMVj9kF90eeg/viewform?embedded=true" width="640" height="675" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                            `;
                            break;
                        default:
                            iframeContent = `
                                'No se ha encontrado formulario para esta cantidad de pases'
                            `;
                            break;
                    }
                    modalContent.innerHTML += iframeContent;

                    // Reassign the close button event listener after modifying the modal content
                    const span = document.querySelector(".close-button");
                    span.onclick = function() {
                      modal.style.display = "none";
                    }
                }
    
            } else {
                console.error('Participant not found');
            }
        })
        .catch(error => {
            console.error('Error fetching participants:', error);
        });
});

// script for opening and closing modal
const modal = document.getElementById("confirmModal");
const btn = document.querySelector(".confirm-button");
const span1 = document.querySelector(".close-button");

btn.onclick = function() {
  modal.style.display = "flex";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

span1.onclick = function() {
    modal.style.display = "none";
  }



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

// Intro overlay
document.getElementById('intro-overlay').addEventListener('click', function() {
    this.style.display = 'none';
});

// countdown 
const formatNumber = (number) => number.toString().padStart(2, '0');

const updateCountdown = (lang) => {
    const countdown = document.getElementById('countdown');
    const weddingDate = new Date('2024-08-03T15:30:00');
    const currentDate = new Date();
    const diff = weddingDate - currentDate;
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    const labels = {
        es: ['Días', 'Hrs', 'Min', 'Seg'],
        en: ['Days', 'Hrs', 'Min', 'Sec']
    };

    const [daysLabel, hoursLabel, minutesLabel, secondsLabel] = labels[lang];

    countdown.innerHTML = `
        <div><span class="number">${formatNumber(days)}</span><span>${daysLabel}</span></div>
        <div><span class="number">${formatNumber(hours)}</span><span>${hoursLabel}</span></div>
        <div><span class="number">${formatNumber(minutes)}</span><span>${minutesLabel}</span></div>
        <div><span class="number">${formatNumber(seconds)}</span><span>${secondsLabel}</span></div>
    `;
};

const initializeCountdown = (lang) => {
    setInterval(() => updateCountdown(lang), 1000);
    updateCountdown(lang);
};

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