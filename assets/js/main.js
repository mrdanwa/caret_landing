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
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  checkScroll();

  window.addEventListener("scroll", checkScroll);

  window.addEventListener("resize", checkScroll);
});
