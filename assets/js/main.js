// Preloader
$.holdReady(true);

$("body").imagesLoaded({ background: ".background-holder" }, function () {
  $("#preloader").removeClass("loading");
  $.holdReady(false);
  setTimeout(function () {
    $("#preloader").remove();
  }, 800);
});

// Zanimation
$(window).on("load", function () {
  $("*[data-inertia]").each(function () {
    $(this).inertia();
  });
});

// Navbar dropdown
$(document).ready(function () {
  // Make the navbar fixed position from the start
  $(".navbar-elixir").addClass("fixed-navbar");

  // Handle dropdown menu opening without pushing content
  $(".navbar-toggler").on("click", function () {
    if (!$(".navbar-elixir").hasClass("scrolled")) {
      $(".navbar-elixir").addClass("open-dropdown");
    }
  });
});

// Script para el botón de cambio de idioma
document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.getElementById("language-toggle");
  const languageOptions = document.getElementById("language-options");

  // Mostrar/ocultar opciones de idioma
  languageToggle.addEventListener("click", function () {
    languageOptions.classList.toggle("show");
  });

  // Cerrar el menú al hacer clic fuera
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".language-switcher")) {
      languageOptions.classList.remove("show");
    }
  });
});

// Script para cambiar la apariencia del header al hacer scroll
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar-elixir");
  const logoIcon1 = document.getElementById("logo-icon1");
  const logoIcon2 = document.getElementById("logo-icon2");

  // Get the base URL from a base tag if it exists, or construct a relative path
  const getBasePath = function () {
    // Check if base tag exists
    const baseTag = document.querySelector("base");
    if (baseTag && baseTag.href) {
      return baseTag.href;
    }

    // If no base tag, try to determine from script location
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (src.includes("/assets/js/")) {
        return src.split("/assets/js/")[0] + "/";
      }
    }

    // Fallback to relative path
    return "../";
  };

  const basePath = getBasePath();

  // Set initial logo state (white when at top)
  if (logoIcon1) {
    logoIcon1.setAttribute("src", basePath + "assets/images/logo/logo5.png");
  }
  if (logoIcon2) {
    logoIcon2.setAttribute("src", basePath + "assets/images/logo/logo1.png");
  }

  function checkScroll() {
    const headerHeight = navbar.offsetHeight;
    let heroSection;

    if (document.querySelector(".flexslider")) {
      heroSection = document.querySelector(".flexslider");
    } else if (document.querySelector(".background-holder.overlay")) {
      heroSection = document.querySelector("section:first-of-type");
    }

    const threshold = heroSection
      ? heroSection.offsetHeight - headerHeight
      : 100;

    if (window.scrollY > threshold) {
      navbar.classList.add("scrolled");
      // Change logo to colored version when scrolled
      if (logoIcon1) {
        logoIcon1.setAttribute(
          "src",
          basePath + "assets/images/logo/logo3.png"
        );
      }
      if (logoIcon2) {
        logoIcon2.setAttribute("src", basePath + "assets/images/logo/logo.png");
      }
    } else {
      navbar.classList.remove("scrolled");
      // Change logo to white version when at top
      if (logoIcon1) {
        logoIcon1.setAttribute(
          "src",
          basePath + "assets/images/logo/logo5.png"
        );
      }
      if (logoIcon2) {
        logoIcon2.setAttribute(
          "src",
          basePath + "assets/images/logo/logo1.png"
        );
      }
    }
  }

  // Run on page load
  checkScroll();

  // Add event listeners
  window.addEventListener("scroll", checkScroll);
  window.addEventListener("resize", checkScroll);
});
