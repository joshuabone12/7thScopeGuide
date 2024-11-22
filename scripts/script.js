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
    const largeScopeImg = document.getElementById('largeScope');
    largeScopeImg.src = 'images/' + scopeId + '.png';
    document.getElementById('modal').style.display = 'flex';

    // Set up the magnifying effect
    largeScopeImg.addEventListener('mousemove', moveMagnifier);
    largeScopeImg.addEventListener('mouseleave', hideMagnifier);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';

    // Remove the magnifier effect when closing
    const largeScopeImg = document.getElementById('largeScope');
    largeScopeImg.removeEventListener('mousemove', moveMagnifier);
    largeScopeImg.removeEventListener('mouseleave', hideMagnifier);
    hideMagnifier(); // Ensure the magnifier disappears
}

function moveMagnifier(event) {
    const magnifier = document.getElementById('magnifier');
    const largeScopeImg = document.getElementById('largeScope');

    // Show the magnifier
    magnifier.style.display = 'block';

    // Get the image's dimensions and cursor position
    const rect = largeScopeImg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Prevent the magnifier from going out of bounds
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        hideMagnifier();
        return;
    }

    // Position the magnifier box next to the cursor
    magnifier.style.left = `${event.pageX + 15}px`; // Slight offset from the cursor
    magnifier.style.top = `${event.pageY - 75}px`; // Center vertically around the cursor

    // Position the zoomed background inside the magnifier
    const zoomLevel = 3; // Set the zoom level
    const backgroundX = -(x * zoomLevel - magnifier.offsetWidth / 2);
    const backgroundY = -(y * zoomLevel - magnifier.offsetHeight / 2);
    magnifier.style.backgroundImage = `url(${largeScopeImg.src})`;
    magnifier.style.backgroundPosition = `${backgroundX}px ${backgroundY}px`;
    magnifier.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
}

function hideMagnifier() {
    const magnifier = document.getElementById('magnifier');
    magnifier.style.display = 'none';
}
