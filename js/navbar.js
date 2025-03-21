const navbar = document.getElementById('navbar');
const navbarModal = document.getElementById('navbar-nav-container');

const navbarCloseButton = document.getElementById('navbar-nav-close-button');
const navbarOpenButton = document.getElementById('navbar-nav-open-button');

const navbarGoTopButton = document.getElementById('gotop-button');

// Open navbar
function navbarOpenModal() {
    document.body.classList.add('modal-open');
    navbar.classList.add('open');
}

// Close navbar
function navbarCloseModal() {
    document.body.classList.remove('modal-open');
    navbar.classList.remove('open');
}

// Check if navbar is opened
function isNavbarModalOpened() {
    if (navbar.classList.contains('open')) {
        return true;
    } else {
        return false;
    }
}

// When the user scrolls down, hide the button
window.addEventListener("scroll", function() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbarGoTopButton.classList.add('shown');
    } else {
        navbarGoTopButton.classList.remove('shown');
    }
});

// When window resize close navbar every time
window.addEventListener("resize", function() {
    if (isNavbarModalOpened()) {
        navbarCloseModal();
    }
});

// Event listener for open the modal
navbarOpenButton.addEventListener('click', navbarOpenModal);

// Event listener for closing the modal
navbarCloseButton.addEventListener('click', navbarCloseModal);

// Click events
navbarModal.addEventListener('click', (e) => {
    // Close modal when clicking outside the image
    if (e.target === navbarModal) {
        navbarCloseModal();
    }
});