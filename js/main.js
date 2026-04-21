// ===== global variable =====
let bookmarks = JSON.parse(localStorage.getItem('virtualHumanBookmarks')) || [];

// ===== Execute after page loading is complete =====
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initBookmarks();
  initFlipCards();
  initModals();
});

// ===== Navigation Function =====
function initNavigation() {
  // ===== Set the active navigation highlight for the current page =====
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || 
        (currentPath.includes('home.html')) ||
        (currentPath.includes(href) && href !== '/static/')) {
      link.classList.add('active');
    }
  });
  
  // ===== Mobile Menu =====
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.add('active');
    });
  }
  
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  }
  
  // ===== Clicking mobile menu links closes the menu =====
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  });
}

// ===== Bookmark Function =====
function initBookmarks() {
  // Update the status of all favorite buttons
  updateBookmarkButtons();
  
  // Update the bookmark count display
  updateBookmarkCount();
  
  // Bind the bookmark button click events
  const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
  bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // 防止触发卡片点击
      const caseId = this.getAttribute('data-case-id');
      toggleBookmark(caseId);
    });
  });
}

function toggleBookmark(caseId) {
  const index = bookmarks.indexOf(caseId);
  
  if (index === -1) {
    // Add to Favorites
    bookmarks.push(caseId);
  } else {
    // Remove from Favorites
    bookmarks.splice(index, 1);
  }
  
  // Save to localStorage
  localStorage.setItem('virtualHumanBookmarks', JSON.stringify(bookmarks));
  
  // update UI
  updateBookmarkButtons();
  updateBookmarkCount();
}

function updateBookmarkButtons() {
  const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
  bookmarkBtns.forEach(btn => {
    const caseId = btn.getAttribute('data-case-id');
    if (bookmarks.includes(caseId)) {
      btn.classList.add('active');
      btn.innerHTML = '★';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '☆';
    }
  });
}

function updateBookmarkCount() {
  const countElement = document.querySelector('.bookmark-count');
  if (countElement) {
    if (bookmarks.length > 0) {
      countElement.style.display = 'inline-flex';
      countElement.querySelector('span').textContent = bookmarks.length + ' SAVED';
    } else {
      countElement.style.display = 'none';
    }
  }
}

// ===== Flip Card Function =====
function initFlipCards() {
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  });
}

// ===== Modal Function =====
function initModals() {
  // Click on the case card to open a pop-up window
  const caseCards = document.querySelectorAll('.case-card');
  caseCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // If you click the bookmark button, do not open a pop-up window
      if (e.target.closest('.bookmark-btn')) return;
      
      const caseId = this.getAttribute('data-case-id');
      openModal(caseId);
    });
  });
  
  // ===== Close Modal =====
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // ESC Close pop-up
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

// ===== Case Data =====
const caseData = {
  'lil-miquela': {
    name: 'Lil Miquela',
    tagline: 'The Pioneer',
    color: 'green',
    followers: '2.7M+',
    origin: 'Los Angeles, USA',
    created: '2016',
    creator: 'Brud (now Dapper Labs)',
    description: 'Lil Miquela is a Brazilian-American virtual influencer, musician, and social media personality. She was one of the first CGI influencers to gain mainstream recognition.',
    achievements: [
      "Named one of TIME's 25 Most Influential People on the Internet",
      'Collaborated with brands like Prada, Calvin Klein, and Samsung',
      'Released multiple singles on Spotify',
      'Featured in Vogue and other major publications'
    ],
    impact: 'Miquela pioneered the virtual influencer space, proving that CGI characters could build genuine emotional connections with human audiences.'
  },
  'imma': {
    name: 'imma',
    tagline: 'The Fashion Icon',
    color: 'pink',
    followers: '400K+',
    origin: 'Tokyo, Japan',
    created: '2018',
    creator: 'Aww Inc.',
    description: 'imma (pronounced "ee-ma") is a Japanese virtual model known for her pink bob haircut and high-fashion aesthetic. She represents the cutting edge of Japanese digital creativity.',
    achievements: [
      "First virtual human to appear in IKEA's global campaign",
      'Collaborated with Valentino, Dior, and Porsche',
      'Featured in Tokyo galleries as digital art',
      'Ambassador for various Japanese brands'
    ],
    impact: 'imma demonstrates how virtual humans can transcend cultural boundaries and participate in global fashion conversations.'
  },
  'lu-do-magalu': {
    name: 'Lu do Magalu',
    tagline: 'The Brand Ambassador',
    color: 'yellow',
    followers: '6M+',
    origin: 'São Paulo, Brazil',
    created: '2003',
    creator: 'Magazine Luiza',
    description: "Lu is the virtual assistant and brand ambassador for Magazine Luiza, one of Brazil's largest retail companies. She's the most followed virtual influencer in the world.",
    achievements: [
      'Most followed virtual influencer globally',
      "Integral part of Magazine Luiza's digital transformation",
      'Hosts product reviews and unboxing videos',
      'Interacts with millions of customers daily'
    ],
    impact: 'Lu proves that virtual influencers can drive real business results, serving as both customer service and brand personality.'
  }
};

function openModal(caseId) {
  const data = caseData[caseId];
  if (!data) return;
  
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.modal-overlay');
  
  // Update pop-up content
  const header = modal.querySelector('.modal-header');
  header.className = 'modal-header ' + data.color;
  
  modal.querySelector('.modal-tagline').textContent = data.tagline;
  modal.querySelector('.modal-title').textContent = data.name;
  
  // Update statistical data
  const stats = modal.querySelectorAll('.modal-stat-value');
  stats[0].textContent = data.followers;
  stats[1].textContent = data.origin;
  stats[2].textContent = data.created;
  stats[3].textContent = data.creator;
  
  // Update description
  modal.querySelector('.modal-description').textContent = data.description;
  
  // Update achievements list
  const achievementsList = modal.querySelector('.modal-achievements');
  achievementsList.innerHTML = data.achievements.map(a => 
    '<li><span class="achievement-dot"></span>' + a + '</li>'
  ).join('');
  
  // Update impact
  modal.querySelector('.modal-impact').textContent = data.impact;
  
  // Show modal
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ===== Utility Functions =====
// Smooth Scrolling
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}


// ===== myths-facts and future change=====


// ===== Scroll Animation for Timeline Items =====
window.addEventListener('scroll', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const triggerBottom = window.innerHeight / 5 * 4;

  timelineItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if(itemTop < triggerBottom) {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }
  });
});

// Initial setup for timeline item opacity and positioning (can also be handled via CSS)
document.querySelectorAll('.timeline-item').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transition = 'all 0.6s ease-out';
  item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
});

// ===== Academic References Accordion Function =====
document.addEventListener('DOMContentLoaded', function() {
    // 1. Locate the title: find h3 tags containing the text "ACADEMIC REFERENCES"
    const allH3 = document.querySelectorAll('h3.font-heading');
    let refTitle, refContent;

    allH3.forEach(h3 => {
        if (h3.textContent.trim().includes('ACADEMIC REFERENCES')) {
            refTitle = h3;
            // 2. Locate the content: the immediate next sibling element (the manga-panel div)
            refContent = h3.nextElementSibling;
        }
    });

    // Check if both elements were found
    if (refTitle && refContent) {
        // 3. Set initial state to closed
        refContent.style.display = 'none';
        refTitle.style.cursor = 'pointer';
        
        // Add a toggle indicator to the title
        const originalText = refTitle.textContent;
        refTitle.textContent = originalText + ' [+]';

        // 4. Bind the click event
        refTitle.addEventListener('click', function() {
            if (refContent.style.display === 'none') {
                refContent.style.display = 'block';
                this.textContent = originalText + ' [-]';
            } else {
                refContent.style.display = 'none';
                this.textContent = originalText + ' [+]';
            }
        });
    }

    // ===== Scroll Reveal Effect for Manga Panels and Cards =====
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    // Apply reveal effect to elements when they enter the viewport
    document.querySelectorAll('.manga-panel, .case-card, .flip-card').forEach(el => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });
});