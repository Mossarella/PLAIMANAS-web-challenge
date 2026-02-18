/**
 * Main JavaScript File
 * Uses IIFE pattern to avoid global scope pollution
 */

(function () {
  "use strict";

  /**
   * Initialize the application when DOM is ready
   */
  function init() {
    console.log("Application initialized");

    // Add your initialization code here
    setupEventListeners();
  }

  /**
   * Set up event listeners
   */
  function setupEventListeners() {
    // Accordion functionality
    initAccordion();
    // Tab button functionality
    initTabButtons();
    // Infinite scroll functionality
    initInfiniteScroll();
    // Collection video play on hover
    initCollectionVideoHover();
    // Language/currency dropdown
    initLangDropdown();
    // Mobile menu (hamburger)
    initMobileMenu();
  }

  /**
   * Mobile menu: open full-screen overlay on hamburger click, close on X or link click
   */
  function initMobileMenu() {
    const trigger = document.querySelector(".mobile-menu-trigger");
    const overlay = document.getElementById("mobile-menu-overlay");
    const closeBtn = document.querySelector(".mobile-menu-close");
    if (!trigger || !overlay || !closeBtn) return;

    function open() {
      overlay.classList.remove("opacity-0", "pointer-events-none");
      overlay.classList.add("opacity-100", "pointer-events-auto");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      overlay.classList.add("opacity-0", "pointer-events-none");
      overlay.classList.remove("opacity-100", "pointer-events-auto");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    trigger.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    overlay.querySelectorAll("nav a").forEach(function (link) {
      link.addEventListener("click", close);
    });

    // Mobile EDITORIAL dropdown: toggle submenu on click, rotate chevron
    const editorialTrigger = overlay.querySelector(".mobile-editorial-trigger");
    const editorialSubmenu = overlay.querySelector(".mobile-editorial-submenu");
    const editorialChevron = overlay.querySelector(".mobile-editorial-chevron");
    if (editorialTrigger && editorialSubmenu && editorialChevron) {
      editorialTrigger.addEventListener("click", function (e) {
        e.preventDefault();
        const isOpen = !editorialSubmenu.classList.toggle("hidden");
        editorialChevron.classList.toggle("rotate-180", isOpen);
        editorialTrigger.setAttribute("aria-expanded", isOpen);
      });
    }
  }

  /**
   * Language/currency dropdown: toggle on trigger click, close on outside click
   */
  function initLangDropdown() {
    const dropdowns = document.querySelectorAll(".lang-dropdown");
    dropdowns.forEach(function (wrapper) {
      const trigger = wrapper.querySelector(".lang-dropdown-trigger");
      const menu = wrapper.querySelector(".lang-dropdown-menu");
      if (!trigger || !menu) return;

      function open() {
        menu.classList.remove("hidden");
      }
      function close() {
        menu.classList.add("hidden");
      }
      function toggle() {
        menu.classList.toggle("hidden");
      }

      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      });

      document.addEventListener("click", function (e) {
        if (!wrapper.contains(e.target)) close();
      });
    });
  }

  /**
   * Collection blocks: play video on hover, pause on mouse leave
   */
  function initCollectionVideoHover() {
    document.querySelectorAll(".collection-item").forEach(function (item) {
      const video = item.querySelector(".collection-video");
      if (!video) return;
      item.addEventListener("mouseenter", function () {
        video.play().catch(function () {});
      });
      item.addEventListener("mouseleave", function () {
        video.pause();
        video.currentTime = 0;
      });
    });
  }

  /**
   * Initialize accordion functionality
   */
  function initAccordion() {
    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach((button) => {
      const content = button.nextElementSibling;
      const icon = button.querySelector(".accordion-icon");

      // Set initial state - closed
      content.style.maxHeight = "0px";

      button.addEventListener("click", function () {
        const isOpen = content.classList.contains("open");

        if (isOpen) {
          // Close
          content.style.maxHeight = "0px";
          content.classList.remove("open");
          button.classList.remove("active");
          icon.style.transform = "rotate(0deg)";
        } else {
          // Open - set max-height to scrollHeight for smooth slide
          content.style.maxHeight = content.scrollHeight + "px";
          content.classList.add("open");
          button.classList.add("active");
          icon.style.transform = "rotate(45deg)";
        }
      });
    });
  }

  /**
   * Initialize tab button radio behavior
   * Only one button can be active at a time
   */
  function initTabButtons() {
    const tabButtons = document.querySelectorAll(".tab-button");

    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        tabButtons.forEach((btn) => {
          btn.classList.remove("tab-button-active");
          btn.classList.add("tab-button-inactive");
        });

        // Add active class to clicked button
        this.classList.remove("tab-button-inactive");
        this.classList.add("tab-button-active");
      });
    });
  }

  /**
   * Initialize infinite scroll animation
   * Creates seamless infinite scroll by calculating exact content width
   */
  function initInfiniteScroll() {
    const scrollTrack = document.querySelector(".infinite-scroll-track");
    if (!scrollTrack) return;

    const scrollSection = document.getElementById("infinite-scroll-section");
    if (!scrollSection) return;

    // Wait for fonts and layout to be ready
    function setupAnimation() {
      const firstContent = scrollTrack.querySelector(
        '.infinite-scroll-content:not([aria-hidden="true"])',
      );
      const secondContent = scrollTrack.querySelector(
        '.infinite-scroll-content[aria-hidden="true"]',
      );

      if (!firstContent || !secondContent) {
        // Retry if not ready yet
        setTimeout(setupAnimation, 50);
        return;
      }

      // Force multiple layout calculations to ensure accuracy
      void scrollTrack.offsetWidth;
      void firstContent.offsetWidth;
      void secondContent.offsetWidth;

      // Get the exact width of one content set
      const contentWidth = firstContent.offsetWidth;

      // Get the computed gap from the track element
      const trackStyles = window.getComputedStyle(scrollTrack);
      const gapValue = trackStyles.gap || trackStyles.columnGap || "60px";
      const gap = parseFloat(gapValue) || 60; // Fallback to 60px if parsing fails

      // Total distance to move = one content width + gap
      const totalDistance = contentWidth + gap;

      // Create keyframe animation that moves by exactly one content width + gap
      const styleId = "infinite-scroll-dynamic-style";
      let styleElement = document.getElementById(styleId);

      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }

      styleElement.textContent = `
                @keyframes infinite-scroll-animation {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-${totalDistance}px);
                    }
                }
                .infinite-scroll-track {
                    animation: infinite-scroll-animation 20s linear infinite;
                }
            `;
    }

    // Wait for fonts and images to fully load
    function waitForAssets() {
      const promises = [];

      // Wait for fonts
      if (document.fonts && document.fonts.ready) {
        promises.push(document.fonts.ready);
      }

      // Wait for images
      const images = scrollSection.querySelectorAll("img");
      images.forEach((img) => {
        if (!img.complete) {
          promises.push(
            new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve; // Continue even if image fails
            }),
          );
        }
      });

      // Wait for all assets, then setup animation with additional delay
      Promise.all(promises).then(() => {
        // Additional delay to ensure layout is stable
        setTimeout(() => {
          setupAnimation();
          // Recalculate after a short delay to account for any late-loading fonts
          setTimeout(setupAnimation, 500);
        }, 200);
      });
    }

    waitForAssets();

    // Hover pause functionality
    scrollSection.addEventListener("mouseenter", function () {
      scrollTrack.style.animationPlayState = "paused";
    });
    scrollSection.addEventListener("mouseleave", function () {
      scrollTrack.style.animationPlayState = "running";
    });
  }

  /**
   * Wait for DOM to be fully loaded before initializing
   */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    // DOM is already loaded
    init();
  }
})();
