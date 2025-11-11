document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const backToTop = document.querySelector('.back-to-top');
  const progressBar = document.querySelector('.progress-bar');
  const shareButtons = document.querySelectorAll('.share-btn');
  
  // Section reveal on scroll
  const reveal = () => {
    const trigger = window.innerHeight * 0.9;
    sections.forEach((s) => {
      const top = s.getBoundingClientRect().top;
      if (top < trigger) s.classList.add("visible");
    });
  };
  
  // Progress bar and interactive elements
  window.addEventListener("scroll", () => {
    reveal();
    
    // Progress bar
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
    
    // Back to top button + share buttons
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
      shareButtons.forEach(btn => btn.classList.add('visible'));
    } else {
      backToTop.classList.remove('visible');
      shareButtons.forEach(btn => btn.classList.remove('visible'));
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Share functionality
  document.getElementById('share-link').addEventListener('click', (e) => {
    e.preventDefault();
    const btn = e.currentTarget;
    const tooltip = btn.querySelector('.share-tooltip');
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      const originalText = tooltip.textContent;
      tooltip.textContent = 'Link copied!';
      setTimeout(() => {
        tooltip.textContent = originalText;
      }, 2000);
    });
  });
  
  // PDF download functionality (placeholder)
  document.getElementById('download-pdf').addEventListener('click', (e) => {
    e.preventDefault();
    alert('PDF export feature would be implemented here. For now, you can use your browser\'s "Print to PDF" function.');
  });
  
  // Initial reveal
  reveal();
});