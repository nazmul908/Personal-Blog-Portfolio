/**
 * Comprehensive Website Security Module
 * Protects against copying, downloading, and unauthorized access
 */

// Disable Right Click Context Menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Disable Common Copy Shortcuts (Ctrl+C, Ctrl+U, Ctrl+S, F12, etc.)
document.addEventListener('keydown', function(e) {
    // Prevent F12 (Developer Tools)
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }

    // Prevent Ctrl+U (View Source), Ctrl+S (Save), Ctrl+P (Print)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 's' || e.key === 'p')) {
        e.preventDefault();
        return false;
    }

    // Prevent Ctrl+Shift+I (Developer Tools), Ctrl+Shift+C, Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) {
        e.preventDefault();
        return false;
    }

    // Prevent Ctrl+C, Ctrl+X (Copy, Cut) - but allow in input fields
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x')) {
        const target = e.target;
        const tagName = target.tagName.toLowerCase();
        if (tagName !== 'input' && tagName !== 'textarea' && !target.isContentEditable) {
            e.preventDefault();
            return false;
        }
    }

    // Prevent Ctrl+A (Select All) - but allow in input fields
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        const target = e.target;
        const tagName = target.tagName.toLowerCase();
        if (tagName !== 'input' && tagName !== 'textarea' && !target.isContentEditable) {
            e.preventDefault();
            return false;
        }
    }
});

// Disable Text Selection
document.addEventListener('mousedown', function(e) {
    const target = e.target;
    const tagName = target.tagName.toLowerCase();

    // Allow selection in input fields and textareas
    if (tagName === 'input' || tagName === 'textarea' || target.isContentEditable) {
        return;
    }

    // Prevent text selection on other elements
    if (e.detail > 1) {
        e.preventDefault();
    }
});

// Disable Double Click Selection
document.addEventListener('dblclick', function(e) {
    const target = e.target;
    const tagName = target.tagName.toLowerCase();

    if (tagName !== 'input' && tagName !== 'textarea' && !target.isContentEditable) {
        e.preventDefault();
        return false;
    }
});

// Disable Copy Event
document.addEventListener('copy', function(e) {
    const target = e.target;
    const tagName = target.tagName.toLowerCase();

    if (tagName !== 'input' && tagName !== 'textarea' && !target.isContentEditable) {
        e.preventDefault();
        return false;
    }
});

// Disable Cut Event
document.addEventListener('cut', function(e) {
    const target = e.target;
    const tagName = target.tagName.toLowerCase();

    if (tagName !== 'input' && tagName !== 'textarea' && !target.isContentEditable) {
        e.preventDefault();
        return false;
    }
});

// Disable Drag and Drop
document.addEventListener('dragstart', function(e) {
    const target = e.target;
    const tagName = target.tagName.toLowerCase();

    if (tagName === 'img' || tagName === 'a') {
        e.preventDefault();
        return false;
    }
});

// Add CSS to prevent text selection
const style = document.createElement('style');
style.textContent = `
    * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
    }

    input,
    textarea,
    [contenteditable="true"] {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
    }

    /* Prevent image dragging */
    img {
        -webkit-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
    }
`;
document.head.appendChild(style);

// Detect Developer Tools
(function detectDevTools() {
    const threshold = 160;
    const devTools = {
        open: false,
        orientation: null
    };

    setInterval(function() {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        const orientation = widthThreshold ? 'vertical' : 'horizontal';

        if (!(heightThreshold && widthThreshold) &&
            ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) ||
             widthThreshold || heightThreshold)) {
            if (!devTools.open || devTools.orientation !== orientation) {
                devTools.open = true;
                devTools.orientation = orientation;
                // Optionally redirect or show warning
                console.clear();
                console.log('%cThis website is protected. Developer tools are disabled.', 'color: red; font-size: 20px; font-weight: bold;');
            }
        } else {
            devTools.open = false;
            devTools.orientation = null;
        }
    }, 500);
})();

// Prevent Print
window.addEventListener('beforeprint', function(e) {
    e.preventDefault();
    alert('Printing is disabled on this website.');
    return false;
});

// Prevent Save As
window.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        alert('Saving this page is disabled.');
        return false;
    }
});

// Console Warning
console.clear();
console.log('%c⚠️ SECURITY WARNING', 'color: red; font-size: 24px; font-weight: bold;');
console.log('%cThis website is protected by copyright and security measures.', 'color: orange; font-size: 14px;');
console.log('%cUnauthorized copying, downloading, or reproduction is prohibited.', 'color: orange; font-size: 14px;');
console.log('%cCopyright © 2024 Nazmul Haque. All rights reserved.', 'color: gray; font-size: 12px;');
console.log('%cIf you are a legitimate user, please disregard this message.', 'color: green; font-size: 12px;');

// Add invisible watermark to body
const watermark = document.createElement('div');
watermark.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 100px;
    color: rgba(0, 0, 0, 0.03);
    pointer-events: none;
    z-index: 9999;
    font-weight: bold;
    letter-spacing: 20px;
    text-transform: uppercase;
`;
watermark.textContent = 'NAZMUL HAQUE';
document.body.appendChild(watermark);
