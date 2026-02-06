'use strict';



/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 * HEADER ANIMATION
 * When scrolled donw to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * SLIDER
 */

const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

let currentSlidePos = 0;

const moveSliderItem = function () {
  sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
}

/**
 * NEXT SLIDE
 */

const slideNext = function () {
  const slideEnd = currentSlidePos >= totalSlidableItems;

  if (slideEnd) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);

/**
 * PREVIOUS SLIDE
 */

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = totalSlidableItems;
  } else {
    currentSlidePos--;
  }

  moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);

/**
 * RESPONSIVE
 */
window.addEventListener("resize", function () {
  totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  moveSliderItem();
});

/**
 * NEWSLETTER SUBSCRIPTION
 */

const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(newsletterForm);
    const formStatus = document.createElement("div");
    formStatus.style.cssText = "margin-top: 15px; padding: 12px; border-radius: 6px; text-align: center;";

    fetch(newsletterForm.action, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        formStatus.style.backgroundColor = "var(--bg-prussian-blue)";
        formStatus.style.color = "var(--text-columbia-blue)";
        formStatus.style.border = "1px solid var(--bg-carolina-blue)";
        formStatus.innerHTML = "✓ <strong>Success!</strong> Thank you for subscribing to my newsletter.";
        newsletterForm.reset();
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, "errors")) {
            formStatus.style.backgroundColor = "var(--bg-prussian-blue)";
            formStatus.style.color = "var(--text-wild-blue-yonder)";
            formStatus.innerHTML = "✗ <strong>Error:</strong> " + data["errors"].map(error => error["message"]).join(", ");
          } else {
            formStatus.style.backgroundColor = "var(--bg-prussian-blue)";
            formStatus.style.color = "var(--text-wild-blue-yonder)";
            formStatus.innerHTML = "✗ <strong>Error:</strong> Oops! There was a problem submitting your form";
          }
        })
      }
    }).catch(error => {
      formStatus.style.backgroundColor = "var(--bg-prussian-blue)";
      formStatus.style.color = "var(--text-wild-blue-yonder)";
      formStatus.innerHTML = "✗ <strong>Error:</strong> Oops! There was a problem submitting your form";
    });

    newsletterForm.appendChild(formStatus);

    setTimeout(() => {
      formStatus.remove();
    }, 5000);
  });
}

/**
 * GITHUB PROJECTS - Dynamic Loading
 */

const githubProjectsContainer = document.getElementById("github-projects");

if (githubProjectsContainer) {
  const GITHUB_USERNAME = "nazmul-haque-nihal";
  const REPO_COUNT = 6;

  async function fetchGitHubProjects() {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${REPO_COUNT}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      
      const repositories = await response.json();
      displayGitHubProjects(repositories);
    } catch (error) {
      console.error("Error fetching GitHub projects:", error);
      githubProjectsContainer.innerHTML = `
        <div class="github-error">
          <p style="color: var(--text-wild-blue-yonder); text-align: center; padding: 40px;">
            <ion-icon name="alert-circle" style="font-size: 3rem; margin-bottom: 10px;"></ion-icon>
            <br>
            Unable to load projects from GitHub. Please try again later.
          </p>
        </div>
      `;
    }
  }

  function displayGitHubProjects(repositories) {
    if (repositories.length === 0) {
      githubProjectsContainer.innerHTML = `
        <p style="color: var(--text-wild-blue-yonder); text-align: center;">No repositories found.</p>
      `;
      return;
    }

    const projectsHTML = repositories.map(repo => {
      const updatedAt = new Date(repo.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });

      const languageColors = {
        "JavaScript": "#f1e05a",
        "TypeScript": "#2b7489",
        "Python": "#3572A5",
        "HTML": "#e34c26",
        "CSS": "#563d7c",
        "Java": "#b07219",
        "C++": "#f34b7d",
        "Ruby": "#701516",
        "Go": "#00ADD8",
        "Rust": "#dea584",
        "PHP": "#4F5D95",
        "Swift": "#F05138",
        "Kotlin": "#A97BFF",
        "Dart": "#00B4AB"
      };

      const languageColor = languageColors[repo.language] || "#8b949e";

      const topics = repo.topics && repo.topics.length > 0 
        ? repo.topics.slice(0, 4).map(topic => 
            `<a href="https://github.com/topics/${topic}" target="_blank" class="github-topic">#${topic}</a>`
          ).join('')
        : '';

      const stars = repo.stargazers_count > 0 
        ? `<div class="github-project-stars">
            <ion-icon name="star"></ion-icon>
            <span>${repo.stargazers_count}</span>
           </div>`
        : '';

      return `
        <article class="github-project-card">
          <div class="github-project-header">
            <h3 class="github-project-title">
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                ${repo.name}
              </a>
            </h3>
            ${stars}
          </div>
          
          ${repo.description ? `<p class="github-project-description">${repo.description}</p>` : ''}
          
          <div class="github-project-meta">
            ${repo.language ? `
              <span class="github-project-language">
                <span class="language-dot" style="background-color: ${languageColor};"></span>
                ${repo.language}
              </span>
            ` : ''}
            <span class="github-project-updated">Updated: ${updatedAt}</span>
          </div>
          
          ${topics ? `<div class="github-project-topics">${topics}</div>` : ''}
          
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="github-project-link">
            <span>View Repository</span>
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </a>
        </article>
      `;
    }).join('');

    githubProjectsContainer.innerHTML = `<div class="github-projects-grid">${projectsHTML}</div>`;
  }

  // Fetch projects when page loads
  fetchGitHubProjects();
}

/**
 * CONTENT PROTECTION
 * NOTE: These measures provide basic protection but are not 100% foolproof.
 * Determined users can bypass these with browser developer tools,
 * viewing page source, taking screenshots, or using download tools.
 * For true protection, consider server-side rendering and authentication.
 */

// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  console.log('Right-click is disabled on this website.');
  return false;
});

// Disable text selection
document.addEventListener('selectstart', function(e) {
  // Allow selection in input fields and textareas
  if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
    return false;
  }
});

// Disable keyboard shortcuts for copying
document.addEventListener('keydown', function(e) {
  // Ctrl+C, Ctrl+A, Ctrl+S, Ctrl+U, Ctrl+Shift+I, F12
  if (
    (e.ctrlKey || e.metaKey) &&
    (e.key === 'c' || e.key === 'a' || e.key === 's' || e.key === 'u' ||
     e.key === 'C' || e.key === 'A' || e.key === 'S' || e.key === 'U')
  ) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      return false;
    }
  }

  // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools shortcuts)
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
  ) {
    e.preventDefault();
    return false;
  }
});

// Disable drag and drop
document.addEventListener('dragstart', function(e) {
  e.preventDefault();
  return false;
});

// Warn about copying images
document.addEventListener('copy', function(e) {
  // Check if an image is being copied
  const selection = window.getSelection();
  if (selection && selection.type === 'Range' && selection.containsNode(document.body, true)) {
    e.preventDefault();
    console.log('Copying content is disabled on this website.');
    return false;
  }
});

// Add watermark on images (optional)
function addWatermark() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.dataset.watermarked) {
      img.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert('This image is protected by copyright. © 2024 Nazmul Haque');
        return false;
      });
      img.dataset.watermarked = 'true';
    }
  });
}

// Run watermark function when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addWatermark);
} else {
  addWatermark();
}

// Observe for dynamically added images
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length) {
      addWatermark();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Console warning
console.log('%c⚠️ Security Warning', 'color: red; font-size: 20px; font-weight: bold;');
console.log('%cThis website and its content are protected by copyright.', 'color: orange; font-size: 14px;');
console.log('%cUnauthorized copying, distribution, or modification is prohibited.', 'color: orange; font-size: 14px;');
console.log('%c© 2024 Nazmul Haque. All rights reserved.', 'color: green; font-size: 14px;');
