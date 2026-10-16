/**
 * Coursera Certificate Replica Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Audience Selector Tabs
  const audienceTabs = document.querySelectorAll('.audience-tab');
  audienceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      audienceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // 2. Explore Dropdown Controller
  const exploreWrapper = document.getElementById('exploreDropdown');
  const exploreBtn = document.getElementById('exploreBtn');
  const exploreMenu = document.getElementById('exploreMenu');

  if (exploreWrapper && exploreBtn && exploreMenu) {
    let hideTimer = null;

    function openExplore() {
      if (hideTimer) clearTimeout(hideTimer);
      exploreWrapper.classList.add('open');
      exploreMenu.classList.add('show');
      exploreBtn.setAttribute('aria-expanded', 'true');
    }

    function closeExplore(delay = 0) {
      if (hideTimer) clearTimeout(hideTimer);
      if (delay > 0) {
        hideTimer = setTimeout(() => {
          exploreWrapper.classList.remove('open');
          exploreMenu.classList.remove('show');
          exploreBtn.setAttribute('aria-expanded', 'false');
        }, delay);
      } else {
        exploreWrapper.classList.remove('open');
        exploreMenu.classList.remove('show');
        exploreBtn.setAttribute('aria-expanded', 'false');
      }
    }

    // Click toggle
    exploreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = exploreMenu.classList.contains('show');
      if (isOpen) {
        closeExplore(0);
      } else {
        openExplore();
      }
    });

    // Hover on desktop
    exploreWrapper.addEventListener('mouseenter', () => {
      openExplore();
    });

    exploreWrapper.addEventListener('mouseleave', () => {
      closeExplore(160);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!exploreWrapper.contains(e.target)) {
        closeExplore(0);
      }
    });

    // Close when clicking any menu item
    exploreMenu.querySelectorAll('.explore-item').forEach(item => {
      item.addEventListener('click', () => {
        closeExplore(0);
      });
    });

    // ESC key closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeExplore(0);
      }
    });
  }

  // 3. Search Form Submit
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('.search-input');
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      if (!searchInput.value.trim()) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  // 4. Enroll Button Interactive Feedback
  const enrollBtn = document.querySelector('.btn-enroll-primary');
  if (enrollBtn) {
    enrollBtn.addEventListener('click', () => {
      enrollBtn.textContent = 'Enrolling...';
      enrollBtn.style.opacity = '0.8';
      setTimeout(() => {
        enrollBtn.textContent = 'Enrolled ✓';
        enrollBtn.style.backgroundColor = '#0e7a3b';
        enrollBtn.style.opacity = '1';
      }, 600);
    });
  }

  // 5. "View this certificate" Links
  const viewCertLinks = document.querySelectorAll('.view-cert-link');
  viewCertLinks.forEach(link => {
    link.addEventListener('click', () => {
      const certPreview = document.getElementById('certPreview');
      if (certPreview) {
        certPreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // 6. Certificate Lightbox Modal
  const certModal = document.getElementById('certModal');
  const certModalClose = document.getElementById('certModalClose');
  const btnEnlargeCert = document.getElementById('btnEnlargeCert');
  const certImage = document.getElementById('certImage');

  function openCertModal() {
    if (certModal) {
      certModal.classList.add('open');
      certModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCertModal() {
    if (certModal) {
      certModal.classList.remove('open');
      certModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (btnEnlargeCert) {
    btnEnlargeCert.addEventListener('click', openCertModal);
  }

  if (certImage) {
    certImage.addEventListener('click', openCertModal);
  }

  if (certModalClose) {
    certModalClose.addEventListener('click', closeCertModal);
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeCertModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('open')) {
      closeCertModal();
    }
  });
});
