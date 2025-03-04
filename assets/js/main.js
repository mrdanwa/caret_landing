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

// Script para cambiar la apariencia del header al hacer scroll
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar-elixir");
  const logoIcon1 = document.getElementById("logo-icon1");
  const logoIcon2 = document.getElementById("logo-icon2");

  // Set initial logo state (white when at top)
  if (logoIcon1) {
    logoIcon1.setAttribute("src", "assets/images/logo/logo5.png");
  }
  if (logoIcon2) {
    logoIcon2.setAttribute("src", "assets/images/logo/logo1.png");
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
        logoIcon1.setAttribute("src", "assets/images/logo/logo3.png");
      }
      if (logoIcon2) {
        logoIcon2.setAttribute("src", "assets/images/logo/logo.png");
      }
    } else {
      navbar.classList.remove("scrolled");
      // Change logo to white version when at top
      if (logoIcon1) {
        logoIcon1.setAttribute("src", "assets/images/logo/logo5.png");
      }
      if (logoIcon2) {
        logoIcon2.setAttribute("src", "assets/images/logo/logo1.png");
      }
    }
  }

  // Run on page load
  checkScroll();

  // Add event listeners
  window.addEventListener("scroll", checkScroll);
  window.addEventListener("resize", checkScroll);
});
