const cookiesModal = document.getElementById('cookies-modal');
const cookiesFrame = document.getElementById('cookies-frame');
const cookiesElementList = document.querySelectorAll('.cookies-required');

const cookiesAcceptButton = document.getElementById('cookies-accept-button');
const cookiesDeclineButton = document.getElementById('cookies-decline-button');

// load cookies
if (!localStorage.getItem("cookiesAccepted")) {
    if (cookiesModal) {
        cookiesModal.classList.add('shown');
    }
    document.body.classList.remove('cookies-accepted');
} else if(localStorage.getItem("cookiesAccepted") == "true") {
    document.body.classList.add('cookies-accepted');
} else {
    document.body.classList.remove('cookies-accepted');
}

// accept cookies
function cookiesAccept() {
    localStorage.setItem("cookiesAccepted", "true");
    document.body.classList.add('cookies-accepted');
    if (cookiesModal) {
        cookiesModal.classList.remove('shown');
    }
}

// decline cookies
function cookiesDecline() {
    localStorage.setItem("cookiesAccepted", "false");
    document.body.classList.remove('cookies-accepted');
    if (cookiesModal) {
        cookiesModal.classList.remove('shown');
    }
}

// Event listener for open the modal
cookiesAcceptButton.addEventListener('click', cookiesAccept);

// Event listener for closing the modal
cookiesDeclineButton.addEventListener('click', cookiesDecline);