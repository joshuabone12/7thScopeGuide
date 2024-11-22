// Function to switch tabs and show the relevant section
function showTab(tabId) {
    const sections = document.querySelectorAll('.guide-section');
    sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });
    document.getElementById(tabId).style.display = 'block'; // Show the selected section
}

// Function to open modal with large scope image
function openModal(scopeId) {
    // Set up the large image source
    const largeScopeImg = document.getElementById('largeScope');
    largeScopeImg.src = 'images/' + scopeId + '.png';

    // Make sure the modal is visible
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';

    // Attach event listeners for the magnifier effect
    largeScopeImg.addEventListener('mousemove', moveMagnifier);
    largeScopeImg.addEventListener('mouseleave', hideMagnifier);

    // Reset the magnifier position and visibility
    hideMagnifier();
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';

    const largeScopeImg = document.getElementById('largeScope');
    largeScopeImg.removeEventListener('mousemove', moveMagnifier);
    largeScopeImg.removeEventListener('mouseleave', hideMagnifier);
    hideMagnifier(); // Ensure the magnifier disappears
}

// Function to move the magnifier
function moveMagnifier(event) {
    const magnifier = document.getElementById('magnifier');
    const largeScopeImg = document.getElementById('largeScope');

    // Show the magnifier
    magnifier.style.display = 'block';

    // Get the image's dimensions and cursor position considering the scrolling position
    const rect = largeScopeImg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Prevent the magnifier from going out of bounds
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        hideMagnifier();
        return;
    }

    // Position the magnifier box next to the cursor, adjusted for scroll position
    magnifier.style.left = `${event.pageX + 20}px`;  // Slight offset from the cursor to the right
    magnifier.style.top = `${event.pageY - magnifier.offsetHeight / 2}px`;  // Vertically center with the cursor

    // Position the zoomed background inside the magnifier
    const zoomLevel = 3;  // Set the zoom level
    const backgroundX = -(x * zoomLevel - magnifier.offsetWidth / 2);
    const backgroundY = -(y * zoomLevel - magnifier.offsetHeight / 2);
    magnifier.style.backgroundImage = `url(${largeScopeImg.src})`;
    magnifier.style.backgroundPosition = `${backgroundX}px ${backgroundY}px`;
    magnifier.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
}

// Function to hide the magnifier
function hideMagnifier() {
    const magnifier = document.getElementById('magnifier');
    magnifier.style.display = 'none';
}

// Ensure click events are working as expected
document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to each thumbnail image
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            openModal(thumbnail.id);
        });
    });

    // Add event listeners to navigation buttons
    document.getElementById('hat-guide-btn').addEventListener('click', function () {
        showTab('hat-guide');
    });
    document.getElementById('scoped-rifles-guide-btn').addEventListener('click', function () {
        showTab('scoped-rifles-guide');
    });
    document.getElementById('light-at-guide-btn').addEventListener('click', function () {
        showTab('light-at-guide');
    });

    // Attach click event to modal to close it
    document.getElementById('modal').addEventListener('click', closeModal);
});
