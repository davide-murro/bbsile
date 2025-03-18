const galleryMediaList = document.querySelectorAll('.gallery-media');
const galleryModal = document.getElementById('gallery-modal-container');
const galleryModalMedia = document.getElementById('gallery-modal-media-container');

const galleryPrevMediaButton = document.getElementById('gallery-modal-slider-prev-button');
const galleryNextMediaButton = document.getElementById('gallery-modal-slider-next-button');
const galleryCloseModalButton = document.getElementById('gallery-modal-close-button');

let galleryMediaCurrentIndex = null;
let galleryMediaCurrentMedia = null;

// Set the media to show on the modal
function gallerySetMedia(index) {
    galleryMediaCurrentIndex = index;
    galleryMediaCurrentMedia = galleryMediaList[index].cloneNode(true);
    galleryModalMedia.replaceChildren(galleryMediaCurrentMedia);
}

// Function to open modal and set the media to zoom
function galleryOpenModal(index) {
    document.body.classList.add('modal-open');
    gallerySetMedia(index);
    galleryModal.classList.add('open');
}

// Close modal
function galleryCloseModal () {
    document.body.classList.remove('modal-open');
    galleryModal.classList.remove('open');
}

// Show / Hide media buttons
function galleryToggleMediaButtons() {
    galleryPrevMediaButton.classList.toggle('hidden');
    galleryNextMediaButton.classList.toggle('hidden');
    galleryCloseModalButton.classList.toggle('hidden');
}

// Show next media
function galleryNextMedia() {
    const newModalMediaCurrentIndex = (galleryMediaCurrentIndex + 1) % galleryMediaList.length;
    gallerySetMedia(newModalMediaCurrentIndex);
}

// Show previous media
function galleryPrevMedia() {
    const newModalMediaCurrentIndex = (galleryMediaCurrentIndex - 1 + galleryMediaList.length) % galleryMediaList.length;
    gallerySetMedia(newModalMediaCurrentIndex);
}

// Event listener to open modal when clicking on an media
galleryMediaList.forEach((item, index) => {
    item.addEventListener('click', () => galleryOpenModal(index));
});

// Event listener for closing the modal
galleryCloseModalButton.addEventListener('click', galleryCloseModal);

// Event listeners for slider buttons
galleryNextMediaButton.addEventListener('click', galleryNextMedia);
galleryPrevMediaButton.addEventListener('click', galleryPrevMedia);

// Click events
galleryModal.addEventListener('click', (e) => {
    // Close modal when clicking outside the image
    if (e.target === galleryModal || e.target === galleryModalMedia) {
        galleryCloseModal();
    }
    // Show / Hide button when click on media
    if (e.target === galleryMediaCurrentMedia) {
        galleryToggleMediaButtons();
    }
});