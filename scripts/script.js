// YouTube Player Variable
let player;

// Function called when YouTube iframe API is ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('backgroundVideo', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Function called when the player is ready
function onPlayerReady(event) {
    player.setVolume(20); // Start with a slightly higher volume level of 20%
    player.playVideo(); // Play the video automatically
}

// Function to ensure the video stops after initial play
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.stopVideo(); // Stop video after it finishes playing
    }
}

// Function to toggle the volume levels between Low, Medium, and Mute
let currentVolumeState = 'low';

function toggleVolume() {
    const volumeButton = document.getElementById('volumeButton');

    if (currentVolumeState === 'low') {
        player.setVolume(50); // Set volume to 50%
        volumeButton.innerText = 'Volume: Medium';
        currentVolumeState = 'medium';
    } else if (currentVolumeState === 'medium') {
        player.setVolume(0); // Mute the volume
        volumeButton.innerText = 'Volume: Mute';
        currentVolumeState = 'mute';
    } else {
        player.setVolume(20); // Set volume to 20% (low level)
        volumeButton.innerText = 'Volume: Low';
        currentVolumeState = 'low';
    }
}

// Function to toggle video play/pause
let isPlaying = true;

function togglePlayPause() {
    if (isPlaying) {
        player.pauseVideo(); // Pause the video
        document.getElementById('play-pause-button').innerText = 'Play Video';
    } else {
        player.playVideo(); // Play the video
        document.getElementById('play-pause-button').innerText = 'Pause Video';
    }
    isPlaying = !isPlaying; // Toggle the playing state
}

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
