/**
 * Ancient Scroll Reader - Horizontal Scroll Style
 * Features: Landing page, PDF canvas rendering, horizontal scroll with wooden rollers
 */

// ===== Global State =====
const state = {
    pdfDoc: null,
    currentPage: 1,
    totalPages: 0,
    scale: 1.0,
    baseScale: 1.0,
    isLandingPage: true,
    isAnimating: false,
    canvas: null,
    ctx: null,
    maxScale: 4.0,
    minScale: 0.5,
    zoomStep: 0.25
};

// ===== DOM Elements =====
const elements = {
    landingScene: null,
    mainReader: null,
    closedScroll: null,
    pdfUpload: null,
    pdfContainer: null,
    pdfCanvas: null,
    scrollPaper: null,
    scrollWelcome: null,
    currentPageSpan: null,
    totalPagesSpan: null,
    navCurrentPage: null,
    navTotalPage: null,
    prevPageBtn: null,
    nextPageBtn: null,
    zoomInBtn: null,
    zoomOutBtn: null,
    zoomDisplay: null,
    loadingOverlay: null,
    fitWidthBtn: null
};

// ===== Initialize Application =====
function init() {
    // Cache DOM elements
    elements.landingScene = document.getElementById('landing-scene');
    elements.mainReader = document.getElementById('main-reader');
    elements.closedScroll = document.getElementById('closed-scroll');
    elements.pdfUpload = document.getElementById('pdf-upload');
    elements.pdfContainer = document.getElementById('pdf-container');
    elements.pdfCanvas = document.getElementById('pdf-canvas');
    elements.scrollPaper = document.getElementById('scroll-paper');
    elements.scrollWelcome = document.getElementById('scroll-welcome');
    elements.currentPageSpan = document.getElementById('current-page');
    elements.totalPagesSpan = document.getElementById('total-pages');
    elements.navCurrentPage = document.getElementById('nav-current-page');
    elements.navTotalPage = document.getElementById('nav-total-page');
    elements.prevPageBtn = document.getElementById('prev-page');
    elements.nextPageBtn = document.getElementById('next-page');
    elements.zoomInBtn = document.getElementById('zoom-in');
    elements.zoomOutBtn = document.getElementById('zoom-out');
    elements.zoomDisplay = document.getElementById('zoom-display');
    elements.loadingOverlay = document.getElementById('loading-overlay');
    elements.fitWidthBtn = document.getElementById('fit-width');

    // Initialize canvas context
    state.canvas = elements.pdfCanvas;
    state.ctx = elements.pdfCanvas.getContext('2d');

    // Setup event listeners
    setupEventListeners();

    // Initialize canvas size
    resizeCanvas();
    
    // Update zoom display
    updateZoomDisplay();

    // Check for CV URL parameter to auto-load
    checkForCVParameter();
}

// ===== Check for CV URL Parameter =====
function checkForCVParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const cvPath = urlParams.get('cv');

    if (cvPath) {
        // CV parameter found, auto-load the PDF
        loadCVFromURL(cvPath);
    }
}

// ===== Load CV from URL =====
async function loadCVFromURL(cvPath) {
    try {
        showLoading(true);

        // Skip landing page and show main reader directly
        elements.landingScene.classList.add('hidden');
        elements.mainReader.classList.remove('hidden');
        state.isLandingPage = false;

        // Fetch the PDF file
        const response = await fetch(cvPath);
        if (!response.ok) {
            throw new Error('Failed to fetch CV');
        }

        const arrayBuffer = await response.arrayBuffer();

        // Load PDF document
        state.pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        state.totalPages = state.pdfDoc.numPages;
        state.currentPage = 1;

        // Hide welcome message and show PDF container
        elements.scrollWelcome.classList.add('hidden');
        elements.pdfContainer.classList.remove('hidden');

        // Update UI
        updatePageIndicator();
        enableNavigation(true);

        // Render first page with fit to width
        await fitToWidth();

        showLoading(false);
        showNotification('CV loaded successfully! Use arrow keys or buttons to navigate.', 'success');

    } catch (error) {
        console.error('Error loading CV:', error);
        showLoading(false);
        showNotification('Failed to load CV. Please try again.', 'error');
    }
}

// ===== Event Listeners Setup =====
function setupEventListeners() {
    // Landing page scroll click
    elements.closedScroll.addEventListener('click', openScroll);

    // PDF Upload
    elements.pdfUpload.addEventListener('change', handlePDFUpload);

    // Navigation
    elements.prevPageBtn.addEventListener('click', () => navigatePage(-1));
    elements.nextPageBtn.addEventListener('click', () => navigatePage(1));

    // Zoom Controls
    elements.zoomInBtn.addEventListener('click', () => adjustZoom(state.zoomStep));
    elements.zoomOutBtn.addEventListener('click', () => adjustZoom(-state.zoomStep));
    elements.fitWidthBtn.addEventListener('click', fitToWidth);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);

    // Mouse wheel zoom
    elements.mainReader.addEventListener('wheel', handleWheelZoom, { passive: false });

    // Window resize
    window.addEventListener('resize', debounce(handleResize, 250));
}

// ===== Landing Page: Open Scroll Animation =====
function openScroll() {
    if (state.isAnimating) return;
    
    state.isAnimating = true;
    
    // Add unrolling animation class
    elements.closedScroll.style.animation = 'none';
    elements.closedScroll.style.transform = 'scale(1.1)';
    elements.closedScroll.style.filter = 'drop-shadow(0 0 50px rgba(255, 215, 0, 0.8))';
    
    // After a brief moment, transition to main reader
    setTimeout(() => {
        elements.landingScene.classList.add('hidden');
        elements.mainReader.classList.remove('hidden');
        elements.mainReader.classList.add('scroll-opening');
        
        // Reset animation state
        setTimeout(() => {
            elements.mainReader.classList.remove('scroll-opening');
            state.isAnimating = false;
            state.isLandingPage = false;
        }, 1500);
    }, 500);
}

// ===== PDF Handling with Original Canvas Rendering =====
async function handlePDFUpload(event) {
    const file = event.target.files[0];

    if (!file || file.type !== 'application/pdf') {
        showNotification('Please select a valid PDF file', 'error');
        return;
    }

    try {
        showLoading(true);

        // Read file as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();

        // Load PDF document
        state.pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        state.totalPages = state.pdfDoc.numPages;
        state.currentPage = 1;

        // Hide welcome message and show PDF container
        elements.scrollWelcome.classList.add('hidden');
        elements.pdfContainer.classList.remove('hidden');

        // Update UI
        updatePageIndicator();
        enableNavigation(true);

        // Render first page with fit to width
        await fitToWidth();

        showLoading(false);
        showNotification(`Scroll unrolled! ${state.totalPages} pages of wisdom await.`, 'success');

    } catch (error) {
        console.error('Error loading PDF:', error);
        showLoading(false);
        showNotification('Failed to load the sacred scroll. Please try another file.', 'error');
    }
}

// ===== Render PDF Page to Canvas =====
async function renderPage(pageNumber, customScale = null) {
    if (!state.pdfDoc) return;

    try {
        const page = await state.pdfDoc.getPage(pageNumber);

        // Use custom scale if provided, otherwise use current state scale
        const scaleToUse = customScale !== null ? customScale : state.scale;

        const viewport = page.getViewport({ scale: scaleToUse });

        // Set canvas dimensions
        state.canvas.width = viewport.width;
        state.canvas.height = viewport.height;

        // Render page to canvas
        const renderContext = {
            canvasContext: state.ctx,
            viewport: viewport
        };

        await page.render(renderContext).promise;

        // Apply parchment effect for aged paper look
        applyParchmentEffect();

    } catch (error) {
        console.error('Error rendering page:', error);
        showNotification('Failed to render the scroll page', 'error');
    }
}

// ===== Apply Parchment Effect =====
function applyParchmentEffect() {
    const canvas = state.canvas;
    const ctx = canvas.getContext('2d');

    // Add subtle vignette effect
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(139, 69, 19, 0.1)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ===== Navigation with Scroll Rolling Animation =====
async function navigatePage(direction) {
    if (state.isAnimating || !state.pdfDoc) return;

    const newPage = state.currentPage + direction;
    if (newPage < 1 || newPage > state.totalPages) return;

    state.isAnimating = true;

    // Disable buttons during animation
    enableNavigation(false, true);

    // Trigger scroll rolling animation
    if (direction > 0) {
        // Going to next page - scroll from right to left
        await animateScrollRightToLeft();
    } else {
        // Going to previous page - scroll from left to right
        await animateScrollLeftToRight();
    }

    // Update current page
    state.currentPage = newPage;

    // Render new page with current zoom level
    await renderPage(state.currentPage);

    // Reset animation classes
    resetScrollAnimation();

    // Update UI
    updatePageIndicator();

    // Reset animation state
    state.isAnimating = false;
    enableNavigation(true);
}

// ===== Scroll Animation: Right to Left (Next Page) =====
function animateScrollRightToLeft() {
    return new Promise((resolve) => {
        // Add animation class for right-to-left scroll on the scroll paper
        elements.scrollPaper.classList.add('scrolling-next');
        
        // Play scroll sound effect (optional)
        playScrollSound('forward');

        // Wait for animation to complete
        setTimeout(() => {
            resolve();
        }, 800);
    });
}

// ===== Scroll Animation: Left to Right (Previous Page) =====
function animateScrollLeftToRight() {
    return new Promise((resolve) => {
        // Add animation class for left-to-right scroll on the scroll paper
        elements.scrollPaper.classList.add('scrolling-prev');
        
        // Play scroll sound effect (optional)
        playScrollSound('backward');

        // Wait for animation to complete
        setTimeout(() => {
            resolve();
        }, 800);
    });
}

// ===== Reset Scroll Animation =====
function resetScrollAnimation() {
    // Remove all animation classes
    elements.scrollPaper.classList.remove('scrolling-next', 'scrolling-prev');
    
    // Force a reflow to restart animations if needed
    void elements.scrollPaper.offsetWidth;
}

// ===== Scroll Sound Effect (Optional) =====
function playScrollSound(direction) {
    // Optional: Add audio feedback for scroll effect
    // This would simulate paper rolling on a wooden scroll
    /*
    const audio = new Audio();
    audio.src = direction === 'forward'
        ? 'data:audio/wav;base64,...'  // Rolling sound
        : 'data:audio/wav;base64,...'; // Reverse rolling sound
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Ignore errors if audio can't play
    */
}

// ===== Zoom Functions =====
async function adjustZoom(delta) {
    if (!state.pdfDoc) return;

    const newScale = state.scale + delta;
    
    // Clamp scale to min/max values
    if (newScale < state.minScale || newScale > state.maxScale) return;

    state.scale = newScale;

    // Update zoom display
    updateZoomDisplay();

    // Show loading
    showLoading(true);

    // Re-render current page with new scale
    await renderPage(state.currentPage);

    showLoading(false);
}

async function fitToWidth() {
    if (!state.pdfDoc) return;

    try {
        showLoading(true);

        const page = await state.pdfDoc.getPage(state.currentPage);
        const containerWidth = elements.scrollPaper.offsetWidth - 80; // Account for borders
        const viewportRaw = page.getViewport({ scale: 1 });
        
        // Calculate scale to fit width
        state.scale = containerWidth / viewportRaw.width;
        state.baseScale = state.scale;
        
        // Clamp to reasonable range
        state.scale = Math.max(state.minScale, Math.min(state.scale, 2.0));

        // Update zoom display
        updateZoomDisplay();

        // Render current page
        await renderPage(state.currentPage);

        showLoading(false);
    } catch (error) {
        console.error('Error fitting to width:', error);
        showLoading(false);
    }
}

function handleWheelZoom(event) {
    if (state.isLandingPage) return;

    // Prevent default scroll behavior
    event.preventDefault();

    // Determine zoom direction
    const delta = event.deltaY > 0 ? -state.zoomStep : state.zoomStep;

    // Apply zoom
    adjustZoom(delta);
}

// ===== UI Updates =====
function updatePageIndicator() {
    elements.currentPageSpan.textContent = state.currentPage;
    elements.totalPagesSpan.textContent = state.totalPages;
    elements.navCurrentPage.textContent = state.currentPage;
    elements.navTotalPage.textContent = state.totalPages;
}

function enableNavigation(enabled, excludeCurrent = false) {
    elements.prevPageBtn.disabled = !enabled;
    elements.nextPageBtn.disabled = !enabled;

    if (!enabled) {
        elements.prevPageBtn.style.opacity = '0.4';
        elements.nextPageBtn.style.opacity = '0.4';
    } else {
        elements.prevPageBtn.style.opacity = state.currentPage > 1 ? '1' : '0.4';
        elements.nextPageBtn.style.opacity = state.currentPage < state.totalPages ? '1' : '0.4';
    }
}

function updateZoomDisplay() {
    const zoomPercentage = Math.round(state.scale * 100);
    elements.zoomDisplay.textContent = `${zoomPercentage}%`;
}

function showLoading(show) {
    if (show) {
        elements.loadingOverlay.classList.remove('hidden');
    } else {
        elements.loadingOverlay.classList.add('hidden');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '15px 30px',
        borderRadius: '8px',
        fontFamily: "'Cinzel', serif",
        fontSize: '1rem',
        zIndex: '1000',
        transition: 'all 0.3s ease',
        background: type === 'error'
            ? 'linear-gradient(135deg, #8B0000, #DC143C)'
            : 'linear-gradient(135deg, #DAA520, #FFD700)',
        color: type === 'error' ? '#FFD700' : '#8B0000',
        border: '2px solid ' + (type === 'error' ? '#FFD700' : '#8B0000'),
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
    });

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Keyboard Handler =====
function handleKeyboard(event) {
    if (state.isLandingPage) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openScroll();
        }
        return;
    }

    switch (event.key) {
        case 'ArrowLeft':
        case 'PageUp':
            event.preventDefault();
            navigatePage(-1);
            break;
        case 'ArrowRight':
        case 'PageDown':
            event.preventDefault();
            navigatePage(1);
            break;
        case '+':
        case '=':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                adjustZoom(state.zoomStep);
            }
            break;
        case '-':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                adjustZoom(-state.zoomStep);
            }
            break;
        case '0':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                fitToWidth();
            }
            break;
        case 'Home':
            if (state.pdfDoc && state.currentPage > 1) {
                event.preventDefault();
                state.currentPage = 1;
                renderPage(state.currentPage);
                updatePageIndicator();
            }
            break;
        case 'End':
            if (state.pdfDoc && state.currentPage < state.totalPages) {
                event.preventDefault();
                state.currentPage = state.totalPages;
                renderPage(state.currentPage);
                updatePageIndicator();
            }
            break;
    }
}

// ===== Handle Window Resize =====
function handleResize() {
    if (state.pdfDoc) {
        // Re-fit to width on resize
        fitToWidth();
    }
}

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function resizeCanvas() {
    // Set initial canvas size
    state.canvas.width = 600;
    state.canvas.height = 800;
}

// ===== Initialize on DOM Ready =====
document.addEventListener('DOMContentLoaded', init);

// ===== Export for potential module use =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        openScroll,
        navigatePage,
        adjustZoom,
        renderPage,
        fitToWidth
    };
}
